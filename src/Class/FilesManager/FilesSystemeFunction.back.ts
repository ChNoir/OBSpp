import { FilesManagerPremission, ReadFileOptions, ResultFilesSysteme } from "./type"
import path from "node:path"
import fs from "fs"


export class FilesSystemeFunction {

    static getContext<T , Options extends Record<string, any> = Record<string, any>>( 
        createInstance : 
            <Options extends Record<string, any> = Record<string, any>>
            (root: string, premission: FilesManagerPremission, options?: Options | undefined) => T , 
        root: string  ,
        path : string, 
        premission : FilesManagerPremission,
        options?: Options | undefined
    ) : ResultFilesSysteme<T> 
    {
        const resolve = FilesSystemeFunction.resolve( root ,path)
        if (resolve.status === "error") return resolve
        return { status: "success", value: createInstance(resolve.value, premission, options) }
    }

    static resolve( root : string , relativePath : string = "") : ResultFilesSysteme<string>  {

        const absolute = path.resolve(root ,relativePath)
        const relative = path.relative(root ,absolute)

        if ( relative.startsWith("..") || path.isAbsolute(relative)) {
            return { status: "error", error: "resolve" }
        }

        return { status: "success", value: absolute }
    }

    static require( premission : FilesManagerPremission , key : keyof FilesManagerPremission ) : ResultFilesSysteme<void> {
        if (!premission[key]) {
            return { status: "error", error: "require" }
        }
        return { status: "success", value: undefined }
    }

    static exists( root : string , pathFile: string) : ResultFilesSysteme<boolean> {
        const resolve = FilesSystemeFunction.resolve( root ,pathFile)
        if (resolve.status === "error") return resolve
        return { status: "success", value: fs.existsSync(resolve.value) }
    }

    static createDirectory(premission : FilesManagerPremission , root : string ,pathDir : string) : ResultFilesSysteme<void>{
        const require = this.require( premission ,"create")
        if (require.status === "error") return require
        const resolve = FilesSystemeFunction.resolve( root ,pathDir)
        if (resolve.status === "error") return resolve
        
        fs.mkdirSync(resolve.value , { recursive : true })
        return { status: "success", value: undefined }
    }

    static deleteDirectory(premission : FilesManagerPremission , root : string ,pathDir : string) : ResultFilesSysteme<void> {
        const require = this.require(premission,"delete")
        if (require.status === "error") return require
        const resolve = FilesSystemeFunction.resolve( root ,pathDir)
        if (resolve.status === "error") return resolve

        fs.rmSync(resolve.value , { recursive : true })
        return { status: "success", value: undefined }
    }

    static writeFile(
        premission : FilesManagerPremission , 
        root : string ,
        pathFile:string , 
        content : string | Buffer , 
        options?: fs.WriteFileOptions
    ) : ResultFilesSysteme<void> {
        const require = this.require(premission ,"write")
        if (require.status === "error") return require
        const resolve = FilesSystemeFunction.resolve( root ,pathFile)
        if (resolve.status === "error") return resolve

        this.createDirectory(premission , root, path.dirname(resolve.value))
        fs.writeFileSync(resolve.value,content,options)
        return { status: "success", value: undefined }
    }

    static readFile( 
        premission : FilesManagerPremission , 
        root : string ,
        pathFile:string , 
        options?: ReadFileOptions.String ) : ResultFilesSysteme<string>;
    static readFile( 
        premission : FilesManagerPremission , 
        root : string ,
        pathFile:string , 
        options?: ReadFileOptions.Buffer ) : ResultFilesSysteme<Buffer>;
    static readFile(
        premission : FilesManagerPremission , 
        root : string ,
        pathFile:string , 
        options?: ReadFileOptions.String | ReadFileOptions.Buffer,
    ) : ResultFilesSysteme<string | Buffer>  {
        const require = this.require(premission,"read")
        if (require.status === "error") return require
        const resolve = FilesSystemeFunction.resolve( root ,pathFile)
        if (resolve.status === "error") return resolve

        return { status: "success", value: fs.readFileSync(resolve.value, options)  }
    }
    static list(premission : FilesManagerPremission , root : string,pathDir:string) : ResultFilesSysteme<string[]> {
        const require = this.require(premission,"read")
        if (require.status === "error") return require
        const resolve = FilesSystemeFunction.resolve( root ,pathDir)
        if (resolve.status === "error") return resolve
        return { status: "success", value: fs.readdirSync(resolve.value) }
    }

    static defaultPremission : FilesManagerPremission = {
        read : true,
        write : false,
        delete : false,
        create : false,
    }

}

