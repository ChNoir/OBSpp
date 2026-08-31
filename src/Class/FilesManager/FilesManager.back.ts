
import type fs from "fs"
import { FilesManagerPremission, ReadFileOptions, ResultFilesSysteme } from "./type"
import { FilesSysteme } from "./FilesSysteme.back"
import { FilesSystemeFunction } from "./FilesSystemeFunction.back"


export class FilesManager extends FilesSysteme {

    protected createInstance<Options extends Record<string, undefined> = Record<string, undefined>>(root: string, premission: FilesManagerPremission, options?: Options | undefined): this {
        return new FilesManager(root, premission) as this
    }
    
    static readonly #S_root : string = process.cwd()
    public static Abstract = FilesSysteme

    constructor (
        root : string = process.cwd() , 
        premission : FilesManagerPremission = FilesSystemeFunction.defaultPremission
    ) {
        super(root , premission)
    }

    getContext( root: string , premission : FilesManagerPremission )  {
        return super.getContext(root,premission)
    }

    resolve( relativePath : string = "")  {
        return super.resolve(relativePath)
    }

    require(permission : keyof FilesManagerPremission ) {
        return super.require(permission)
    }

    exists(pathFile: string) {
        return super.exists(pathFile)
    }

    createDirectory(pathDir : string) {
        return super.createDirectory(pathDir)
    }

    deleteDirectory(pathDir : string) {
        return super.deleteDirectory(pathDir)
    }

    writeFile(pathFile:string , content : string | Buffer) {
        return super.writeFile(pathFile,content)
    }

    readFile(pathFile: string, options?: ReadFileOptions.String  ) : ResultFilesSysteme<string>
    readFile(pathFile: string, options?: ReadFileOptions.Buffer  ) : ResultFilesSysteme<Buffer>
    readFile(pathFile: string, options?: ReadFileOptions.String | ReadFileOptions.Buffer ) : ResultFilesSysteme<string | Buffer> {
        return super.readFile(pathFile, options as any)
    }

    list(pathDir:string) {
        return super.list(pathDir)
    }


    // Static API 

    static getContext( root: string , premission : FilesManagerPremission )  {
        const Permission = { ...FilesSystemeFunction.defaultPremission , ...premission }
        const createInstance = <Options extends Record<string, any> = Record<string, any>>(root: string, premission: FilesManagerPremission, options?: Options | undefined) => {
            return new FilesManager(root, premission) as any
        }
        return FilesSystemeFunction.getContext<FilesManager>(createInstance , FilesManager.#S_root , root , Permission)
    }

    static resolve( relativePath : string = "") {
        return FilesSystemeFunction.resolve(  FilesManager.#S_root , relativePath)
    }

    static exists(Pathfile: string) {
        return FilesSystemeFunction.exists(FilesManager.#S_root,Pathfile)
    }

    static createDirectory(pathDir : string) {
        return FilesSystemeFunction.createDirectory(FilesSystemeFunction.defaultPremission, FilesManager.#S_root ,pathDir  )
    }

    static deleteDirectory(pathDir : string) {
        return FilesSystemeFunction.deleteDirectory(FilesSystemeFunction.defaultPremission,FilesManager.#S_root ,pathDir)
    }

    static writeFile(pathFile:string , content : string | Buffer,  options?: fs.WriteFileOptions) {
        return FilesSystemeFunction.writeFile(FilesSystemeFunction.defaultPremission,FilesManager.#S_root ,pathFile,content ,options)
    }
    static readFile(pathFile:string ,options?: {
        encoding?: null | undefined;
        flag?: string | undefined;
    }) {
        return FilesSystemeFunction.readFile(FilesSystemeFunction.defaultPremission,FilesManager.#S_root,pathFile,options)
    }
    static list(pathDir:string) {
        return FilesSystemeFunction.list(FilesSystemeFunction.defaultPremission,FilesManager.#S_root,pathDir)
    }

}
