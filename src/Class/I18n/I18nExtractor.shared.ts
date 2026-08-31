import ts from "typescript";
import fs from "fs"
import { ConsoleLogger } from "@/Class/ConsoleLogger.shared";
import type { I18nColdContext } from "@/Class/I18n/I18nColdContext.shared";
import { EnvConfigContext } from "@/Class/EnvConfig/EnvConfigContext.shared";
import { InitsClass } from "@/Class/InitsClass.shared";
import { I18n } from "@/Class/I18n/I18n.back";
import { EnvConfig } from "@/Class/EnvConfig/EnvConfig.back";


export class I18nExtractor {


    public static console: ConsoleLogger;
    public static I18n: I18nColdContext<I18nExtractor_I18nMap> 
    public static EnvConfig: EnvConfigContext<I18nExtractor_EnvConfigMap>

    public static _init() { // Anti circular dependency
        I18nExtractor.console = ConsoleLogger.getInstance("I18nExtractor")
        I18nExtractor.I18n = I18n.createColdContext<I18nExtractor_I18nMap>()
        I18nExtractor.EnvConfig = EnvConfig.createEnvConfigContext<I18nExtractor_EnvConfigMap>()
    }

    static { InitsClass.register(I18nExtractor._init) }


    static CollMap  : { 
        [tag : string] : string
    } = {}

    static HotMap : { 
        [tag : string] : string
    } = {}

    static checker : ts.TypeChecker

    static start (OUTPUT_DIR : string , LOCAL_NAME : string = "en") {
        // 1) Recupere les fichier source

        const configFile = ts.readConfigFile("./tsconfig.json",ts.sys.readFile);
        const parsed = ts.parseJsonConfigFileContent( configFile.config, ts.sys, "./");
        
        const program =
            ts.createProgram({
                rootNames: parsed.fileNames,
                options: parsed.options
            });
        
        const sourceFiles = program.getSourceFiles();
        I18nExtractor.checker = program.getTypeChecker();


        // 2) Traitement des fichiers 
        for (const sourceFile of sourceFiles) {
            if ( sourceFile.isDeclarationFile ) { continue; } // on ne traite pas les fichiers de déclaration
            this.visit(sourceFile)
        }

        // 3) Sauvegarde du résultat

        console.log (I18nExtractor.CollMap)
        console.log (I18nExtractor.HotMap)

        // Coll file
        let finalData = {}
        const OUTPUT_FILE = OUTPUT_DIR.endsWith("/") ? OUTPUT_DIR + LOCAL_NAME + ".json" : OUTPUT_DIR + "/" + LOCAL_NAME + ".json"

        if (fs.existsSync(OUTPUT_FILE)) {

            I18nExtractor.console.log(I18nExtractor.I18n.get("I18nExtractor_file_exists" , {file : OUTPUT_FILE})) // `File ${OUTPUT_FILE} already exists. Checking for dead tags...`

            const old = JSON.parse(
                fs.readFileSync(OUTPUT_FILE, "utf8")
            );

            const tagsDead = I18nExtractor.checkIfTagIsDead(old , I18nExtractor.CollMap)

            I18nExtractor.console.log(I18nExtractor.I18n.get("I18nExtractor_dead_tags" , {count : tagsDead.length})) // `${tagsDead.length} dead tags found.`

            finalData = {
                ...I18nExtractor.CollMap,
                ...I18nExtractor.removeDeadTagFromFile(tagsDead  , old ),
            };

            I18nExtractor.console.log(I18nExtractor.I18n.get("I18nExtractor_file_update" , {file : OUTPUT_FILE})) // `File ${OUTPUT_FILE} updated with new tags and dead tags removed.`

            fs.writeFileSync(
                OUTPUT_FILE,
                JSON.stringify(finalData, null, 4),
                "utf8"
            );
        }
        else  {

            I18nExtractor.console.log(I18nExtractor.I18n.get("I18nExtractor_file_created" , {file : OUTPUT_FILE})) // `File ${OUTPUT_FILE} created.`

            finalData = I18nExtractor.CollMap
            
            fs.writeFileSync(
                OUTPUT_FILE,
                JSON.stringify(finalData, null, 4),
                "utf8"
            );
        }

      

        // hot file
        
        const OUTPUT_FILE_HOT = OUTPUT_DIR.endsWith("/") ? OUTPUT_DIR + LOCAL_NAME + ".hot.json" : OUTPUT_DIR + "/" + LOCAL_NAME + ".hot.json"

        let finalDataHot = {}
        if (fs.existsSync(OUTPUT_FILE_HOT)) {

            I18nExtractor.console.log(I18nExtractor.I18n.get("I18nExtractor_file_exists" , {file : OUTPUT_FILE_HOT})) // `File ${OUTPUT_FILE_HOT} already exists. Checking for dead tags...`

            const old = JSON.parse(
                fs.readFileSync(OUTPUT_FILE_HOT, "utf8")
            );

            const tagsDead = I18nExtractor.checkIfTagIsDead(old , I18nExtractor.HotMap)
            I18nExtractor.console.log(I18nExtractor.I18n.get("I18nExtractor_dead_tags" , {count : tagsDead.length})) // `${tagsDead.length} dead tags found.`

            finalDataHot = {
                ...I18nExtractor.HotMap,
                ...I18nExtractor.removeDeadTagFromFile( tagsDead , old ),
            };

            fs.writeFileSync(
                OUTPUT_FILE_HOT,
                JSON.stringify(finalDataHot, null, 4),
                "utf8"
            );

        }
        else  {

            I18nExtractor.console.log(I18nExtractor.I18n.get("I18nExtractor_file_created" , {file : OUTPUT_FILE_HOT})) // `File ${OUTPUT_FILE_HOT} created.`

            finalDataHot = I18nExtractor.HotMap
            fs.writeFileSync(
                OUTPUT_FILE_HOT,
                JSON.stringify(finalDataHot, null, 4),
                "utf8"
            );
        }




    }   

    static visit(node : ts.Node) {
    
        if (ts.isCallExpression(node)) { // Est-ce que ce node est un appel de fonction ?
    
            // récupère les Tag das appels directs
            const typeHot  = I18nExtractor.getTypeOfI18nContext(node , "I18n.createHotContext");
            const typeCold = I18nExtractor.getTypeOfI18nContext(node , "I18n.createColdContext");

            if (typeHot) I18nExtractor.getTagEndArg("Hot" , typeHot)
            if (typeCold) I18nExtractor.getTagEndArg("Cold" , typeCold)
          
        }
    
        ts.forEachChild(node, I18nExtractor.visit );
    }

    static getTypeOfI18nContext(node : ts.CallExpression  , PropertyAccessExpressionText : string ) {
        const expr = node.expression;
        if (!ts.isPropertyAccessExpression(expr)) return null
        if (expr.getText() !== PropertyAccessExpressionText ) return null
        const typeNode = node.typeArguments?.[0];
        if (!typeNode) return null;
        return I18nExtractor.checker.getTypeFromTypeNode( typeNode );
    }

    static getTagEndArg( type : "Cold" | "Hot" , TStype : ts.Type) {

        for (const tag of TStype.getProperties() ) {
            
            if (!tag.valueDeclaration) continue
         
            const tagType = I18nExtractor.checker.getTypeOfSymbolAtLocation(tag,tag.valueDeclaration)
            
            const args = []

            for (const arg of tagType.getProperties()) {
                args.push(`{{${arg.getName()}}}`)
            }

            const map = type == "Cold" ? I18nExtractor.CollMap : I18nExtractor.HotMap

            map[tag.getName()] = args.join(" ")
        }
        

    }

    static checkIfTagIsDead( oldMap : { [tag : string] : string } , newMap : { [tag : string] : string } ) {
        const deadTags = []
        for (const tag in oldMap) {
            if (!newMap[tag]) {
                deadTags.push(tag)
            }
        }

        return deadTags
    }

    static removeDeadTagFromFile( deadTags : string[] , map : { [tag : string] : string } )  {
        for (const tag of deadTags) {
            delete map[tag]
        }

        return map

    }

}

type I18nExtractor_I18nMap = {
    "I18nExtractor_file_exists" : { file : string }
    "I18nExtractor_dead_tags" : { count : number }
    "I18nExtractor_file_update" : { file : string }
    "I18nExtractor_file_created" : { file : string }
}

type I18nExtractor_EnvConfigMap = ""