export class ConsoleLogger {

    private instanceName : string 
    private tagName : string | undefined

    constructor( instanceName :string) {
        this.instanceName = instanceName
    }


    // Création du préfixe de temps
    private static getTimeStamp() : string {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    }

    // Création du préfixe
    private static getPrefix( typeName : string , instanceName : string , tagName : string | undefined = undefined  ) : string {
        return `[${ConsoleLogger.getTimeStamp()}] [${ this.StrPadCenter(typeName , 5 , " ").toLocaleUpperCase()}] [${instanceName}] ${tagName ? "["+tagName+"]" : ""}`
    }

    private static StrPadCenter( str : string , maxLength: number, fillString?: string | undefined ) {
        const l = str.length
        const f = fillString?.[0] ?? " ";

        if (l >= maxLength) { return str; }
        if (l > maxLength) { return str.substring(0, maxLength) }


        const totalPadding = maxLength - str.length;
        const left = Math.floor(totalPadding / 2);
        const right = totalPadding - left;

        return f.repeat(left) + str + f.repeat(right);
    }



    // Méthode interne pour gérer différents types de messages
    private static Logger(functionLog : (...args: any[]) => void , typeName : string, instanceName : string  , tagName :string | undefined , ...message: any  ): void {
        for (const msg of message) {

            const prefix = ConsoleLogger.getPrefix(typeName , instanceName , tagName)

            if (msg instanceof Error) {
                // remove first line of stack
                const stack = msg.stack?.split('\n').slice(1).join('\n') || 'no stack trace available';
                functionLog( `${prefix}${msg.name} : ${msg.message} \n ${stack}`);
                continue
            }
            
            if (Array.isArray(msg)) {
                functionLog( `${prefix} Array : `, JSON.stringify(msg, null, 2));
                continue
            }
            
            switch (typeof msg) {
                case "string":
                case "bigint":
                case "number":
                case "boolean":
                case "undefined":
                    functionLog( `${prefix}${msg}`);
                    continue
                case "function":
                case "symbol":
                    functionLog( `${prefix}${msg.toString()}`);
                    continue
                case "object":
                    functionLog( `${prefix} Object : `, JSON.stringify(msg, null, 2));
                    continue
                default:
                    functionLog( `${prefix}`, msg);
                    continue
            }

        }

    }
    
    private static LevelError : 0 | 1 | 2 = 0; // 0 = Tout , 1 = Warn , 2 = Error
   
    //////////////////////////////////////////////////
    // API 

    public log(...message: any): void {
        ConsoleLogger.Logger(console.log , "log", this.instanceName , this.tagName, ...message);
    }

    public error(...message: any): void {
        if (ConsoleLogger.LevelError >= 2 || ConsoleLogger.LevelError === 0 ) ConsoleLogger.Logger( console.error , "error",this.instanceName , this.tagName, ...message)
    }

    public warn(...message: any): void {
        if (ConsoleLogger.LevelError >= 1 || ConsoleLogger.LevelError === 0 ) ConsoleLogger.Logger(console.warn , "warn", this.instanceName , this.tagName, ...message)
    }

    public fatalError (...message: any): never {
        ConsoleLogger.Logger(console.error , "fatal", this.instanceName , this.tagName, ...message);
        process.exit(1);
    }

    public tag(tag : string) : this {
        this.tagName = tag
        return this;
    }


    //////////////////////////////////////////////////
    // Static API 

    public static log(...message: any) : void {
        ConsoleLogger.Logger(console.log , "log" , "Systeme" , undefined , ...message );
    }

    public static error(...message: any): void {
        if (ConsoleLogger.LevelError >= 2 || ConsoleLogger.LevelError === 0 ) ConsoleLogger.Logger( console.error ,"error","Systeme" , undefined, ...message )
    }

    public static warn(...message: any): void {
        if (ConsoleLogger.LevelError >= 1 || ConsoleLogger.LevelError === 0 ) ConsoleLogger.Logger(console.warn ,  "warn" ,"Systeme" , undefined, ...message )
    }

    public static  fatalError (...message: any): never {
        ConsoleLogger.Logger(console.error ,"fatal","Systeme" , undefined, ...message);
        process.exit(1);
    }

    public static SetLogLevel(level : "Error" | "Warn" | "All") {
        switch (level) {
            case "All":
                ConsoleLogger.LevelError = 0;
                break;
            case "Warn":
                ConsoleLogger.LevelError = 1;
                break;
            case "Error":
                ConsoleLogger.LevelError = 2;
                break;
        }
    } 

    public static getInstance( instanceName : string , tag : string | undefined = undefined) {
        const i = new ConsoleLogger(instanceName)
        tag ? i.tag(tag) : null
        return i
    }


}
