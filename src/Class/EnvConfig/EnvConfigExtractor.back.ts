import type { I18nColdContext } from "@/Class/I18n/I18nColdContext.shared";
import { I18n } from "@/Class/I18n/I18n.back";
import { EnvConfig } from "@/Class/EnvConfig/EnvConfig.back";
import ts from "typescript";
import fs from "fs"
import { ConsoleLogger } from "@/Class/ConsoleLogger.shared";
import { EnvConfigContext } from "./EnvConfigContext.shared";
import { InitsClass } from "@/Class/InitsClass.shared";


export class EnvConfigExtractor {
    public static console: ConsoleLogger;
    public static I18n: I18nColdContext<EnvConfigExtractor_I18nMap> 
    public static EnvConfig: EnvConfigContext<EnvConfigExtractor_EnvConfigMap>

    public static _init() { // Anti circular dependency
        EnvConfigExtractor.console = ConsoleLogger.getInstance("EnvConfigExtractor")
        EnvConfigExtractor.I18n = I18n.createColdContext<EnvConfigExtractor_I18nMap>()
        EnvConfigExtractor.EnvConfig = EnvConfig.createEnvConfigContext<EnvConfigExtractor_EnvConfigMap>()
    }

    static { InitsClass.register(EnvConfigExtractor._init) }

    static arr : { [ key : string] : {
         [ key : string] : boolean
    } } = {}


    static checker : ts.TypeChecker

    static start () {
        // 1) Recupere les fichier source

        const configFile = ts.readConfigFile("./tsconfig.json",ts.sys.readFile);
        const parsed = ts.parseJsonConfigFileContent( configFile.config, ts.sys, "./");
        
        const program =
            ts.createProgram({
                rootNames: parsed.fileNames,
                options: parsed.options
            });
        
        const sourceFiles = program.getSourceFiles();
        EnvConfigExtractor.checker = program.getTypeChecker();

          // 2) Traitement des fichiers 
        for (const sourceFile of sourceFiles) {
            if ( sourceFile.isDeclarationFile ) { continue; } // on ne traite pas les fichiers de déclaration
            EnvConfigExtractor.visit(sourceFile)
        }

       
        const str = 
        Object
            .keys(EnvConfigExtractor.arr)
            .map((escapedName) => {
                const prefix = 
`
########################
# ${escapedName}
########################

`
                return prefix + Object
                    .keys(EnvConfigExtractor.arr[escapedName])
                    .map((key) => {
                        return "#"+key.toLocaleUpperCase()
                        .trim()
                        .replace(" " , "_") +"="
                    })
                    .join("\r")
                })
            .join("\n\r")
        
        fs.writeFileSync(
            "./.example.env",
            str,
            "utf8"
        );

    }

    static visit ( node : ts.Node) {
        if (ts.isCallExpression(node)) { // Est-ce que ce node est un appel de fonction ?
            const type = EnvConfigExtractor.getTemplateTypeOfFunction(node ,"EnvConfig.createEnvConfigContext")
            
            if (type?.isUnion()) {
                const escapedName = type.aliasSymbol?.escapedName ?? ""
                if (!EnvConfigExtractor.arr[escapedName]) { EnvConfigExtractor.arr[escapedName] = {} }
                type.types
                    .filter(t => t.isStringLiteral())
                    .map(t => t.value)
                    .forEach(t=> EnvConfigExtractor.arr[escapedName][t] = true )
            }
        }

        ts.forEachChild(node, EnvConfigExtractor.visit );
    }


    
    static getTemplateTypeOfFunction(node : ts.CallExpression  , PropertyAccessExpressionText : string ) {
        const expr = node.expression;
        if (!ts.isPropertyAccessExpression(expr)) return null
        if (expr.getText() !== PropertyAccessExpressionText ) return null
        const typeNode = node.typeArguments?.[0];
        if (!typeNode) return null;
        return EnvConfigExtractor.checker.getTypeFromTypeNode( typeNode );
    }


}

type EnvConfigExtractor_I18nMap = {

}

type EnvConfigExtractor_EnvConfigMap = ""