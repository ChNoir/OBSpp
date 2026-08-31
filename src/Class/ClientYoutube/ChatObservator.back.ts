import grpc from "@grpc/grpc-js"
import protoLoader from'@grpc/proto-loader'
import { youtube_v3 } from "googleapis"
import { DOMStyleEmitter } from "@/Class/DOMStyleEmitter/DOMStyleEmitter.back";
import { I18nColdContext } from "@/Class/I18n/I18nColdContext.shared";
import type { liveChatEventTypes } from "@/Types/Class/YoutubeType";
import { ChatObservator_EventMap, ChatObservator_I18nMap } from "@/Types/Class/ChatObservator";
import { I18n } from "@/Class/I18n/I18n.back";
import { ConsoleLogger } from "@/Class/ConsoleLogger.shared";
import { InitsClass } from "@/Class/InitsClass.shared";
import { ClientYoutube } from "@/Class/ClientYoutube/ClientYoutube.back";


export class ChatObservator extends DOMStyleEmitter<ChatObservator_EventMap> {

    public static debug = false
    private pageToken ?: string
    private metadata ?: grpc.Metadata
    private grpcClient ?: any
    private static ENDPOINT = 'dns:///youtube.googleapis.com:443'
    private Running = false
    private call : any
    private setTimeout ?: NodeJS.Timeout


    public console : ConsoleLogger;
    static #I18n: I18nColdContext<ChatObservator_I18nMap> 

    public static _init() {
        ChatObservator.#I18n = I18n.createColdContext<ChatObservator_I18nMap>()
    }

    static { InitsClass.register(ChatObservator._init) }

    constructor( private IdChatLive: string) {
        super()
        this.console = ConsoleLogger.getInstance(`ChatObservator_${IdChatLive}`)
        this.start()
    }

    async start() {
        await this.Metadata()
        this.gRPCClient()
        this.listenLiveChat()

        this.Running = true
    }


    async Metadata() {
        const md = new grpc.Metadata();
        md.set('authorization', `Bearer ${await ClientYoutube.getAccessToken()}`);
        this.metadata = md;
        return this
    }


    gRPCClient() {
    
        const packageDef = protoLoader.loadSync(ClientYoutube.Config.YOUTUBE_CLIENT_PROTO_PATH(), {
            keepCase: false,
            longs: String,
            enums: String,
            defaults: true,
            oneofs: true,
        });

        const grpcObj = grpc.loadPackageDefinition(packageDef);


        const Service = (grpcObj.youtube as any).api.v3.V3DataLiveChatMessageService;
        this.grpcClient = new Service(ChatObservator.ENDPOINT, grpc.credentials.createSsl());
        return this
    }

    listenLiveChat(){

        const request = {
            liveChatId: this.IdChatLive,           // requis
            part: ['id', 'snippet', 'authorDetails'],  // requis
            hl: 'fr',                                  // optionnel (langue des messages système)
            pageToken: this.pageToken || undefined,   // pour reprendre au bon endroit après coupure
            // max_results est ignoré côté streaming selon le proto (non utilisé)
        };


        const call = this.grpcClient.streamList(request, this.metadata);

        call.on('data', (resp :any) => this.callbackOnData(call ,resp));
        call.on('error', (error :any) => this.callbackOnError( call ,error));   
        call.on('end', () => this.callbackOnEnd(call));

        this.call = call
    }

    callbackOnData(call :any,resp : youtube_v3.Schema$LiveChatMessageListResponse) {
        
        
        if (resp.nextPageToken) this.pageToken = resp.nextPageToken;
        
        if (resp.offlineAt) {
            this.console.log( ChatObservator.#I18n.get("ChatObservator_LiveEnd" , { time : resp.offlineAt }) ); // `⏹️  Live terminé à ${resp.offlineAt}. Arrêt du client.`
            this.pageToken = undefined;
            this.Running = false
            this.dispatchEvent("LiveEnd", {})
            call.cancel();
            return;
        }


        for (const item of resp.items || []) {
            if (!this.filterLastMinute(item)) { continue } 
            if (ChatObservator.debug) { this.console.log(ChatObservator.#I18n.get("ChatObservator_debug_message" , { 
                author :  item.authorDetails?.displayName ?? "" ,
                type : item.snippet?.type ?? ""
            } ))}
            
            this.dispatchEvent("message", { message : item })
            this.dispatchEvent(item.snippet?.type as liveChatEventTypes , { message : item })

        }
    }

    callbackOnError( call : any ,err: grpc.ServiceError  ) {
        this.console.error(  ChatObservator.#I18n.get("ChatObservator_callbackOnError" , { code : err.code , message : err.message }));  //  `⚠️  Erreur gRPC ${err.code}: ${err.message}`  
    }

    callbackOnEnd(call : any) {
        
        if (this.Running) { 
            clearTimeout(this.setTimeout) 
            this.setTimeout = setTimeout(() => { this.listenLiveChat() } , ClientYoutube.Config.YOUTUBE_CLIENT_CHAT_RECONNECT_TIME()) 
        }
    }

    filterLastMinute(item : youtube_v3.Schema$LiveChatMessage ) {

        const now = new Date();
        const oneMinuteAgo = new Date(now.getTime() - 60 * 1000);
        const fewSecondsAhead = new Date(now.getTime() + 10 * 1000); // +10s de marge
        if ( typeof item.snippet?.publishedAt != "string" )  return false
        const date = new Date(item.snippet.publishedAt);
        return date >= oneMinuteAgo && date <= fewSecondsAhead;
    }


    stop() {
        this.Running = false
        if (this.call) { this.call.cancel();}
    }
}

