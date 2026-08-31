import type { WriteFileOptions } from "fs"
import { FilesSystemeFunction } from "./FilesSystemeFunction.back"
import {  FilesManagerPremission, ReadFileOptions, ResultFilesSysteme } from "./type"
import { PerformanceProfiler } from "../PerformanceProfiler/PerformanceProfiler.shared"

export abstract class FilesSysteme  {
    readonly #root : string
    readonly #premission : FilesManagerPremission
    
    protected constructor (
        root : string = process.cwd() , 
        premission : FilesManagerPremission = FilesSystemeFunction.defaultPremission
    ) {
        this.#root = root
        this.#premission = premission
    }

    
    protected abstract createInstance<Options extends Record<string, any> = Record<string, any>>(root : string , premission : FilesManagerPremission , options?: Options) : this

    @PerformanceProfiler.decorator()
    protected getContext( root: string , premission : FilesManagerPremission , options?: Record<string, any> ) : ResultFilesSysteme<this> {
        return FilesSystemeFunction.getContext<this, Record<string, any>>(this.createInstance.bind(this) , this.#root, root, premission, options)
    }

    @PerformanceProfiler.decorator()
    protected resolve( relativePath : string = "") {
        return FilesSystemeFunction.resolve(this.#root,  relativePath)
    }

    @PerformanceProfiler.decorator()
    protected require(permission : keyof FilesManagerPremission ) {
        return FilesSystemeFunction.require(this.#premission , permission)
    }

    @PerformanceProfiler.decorator()
    protected exists(pathFile: string) {
        return FilesSystemeFunction.exists(this.#root , pathFile)
    }

    @PerformanceProfiler.decorator()
    protected createDirectory(pathDir : string) {
        return FilesSystemeFunction.createDirectory(
            this.#premission,
            this.#root,
            pathDir
        )
    }

    @PerformanceProfiler.decorator()
    protected deleteDirectory(pathDir : string) {
        return FilesSystemeFunction.deleteDirectory(
            this.#premission,
            this.#root,
            pathDir
        )
    }

    @PerformanceProfiler.decorator()
    protected writeFile(pathFile:string , content : string | Buffer , options?: WriteFileOptions) {
        return FilesSystemeFunction.writeFile(
            this.#premission,
            this.#root,
            pathFile,
            content,
            options
        )
    }


    protected readFile(
        pathFile: string,
        options?: ReadFileOptions.String
    ): ResultFilesSysteme<string>;
    protected readFile(
        pathFile: string,
        options?: ReadFileOptions.Buffer
    ): ResultFilesSysteme<Buffer>;
    @PerformanceProfiler.decorator()
    protected readFile(pathFile:string , options?:  ReadFileOptions.String | ReadFileOptions.Buffer) : ResultFilesSysteme<string | Buffer> {
        return FilesSystemeFunction.readFile(
            this.#premission,
            this.#root,
            pathFile,
            options as any
        )
    }

    @PerformanceProfiler.decorator()
    protected list(pathDir:string) {
        return FilesSystemeFunction.list(
            this.#premission,
            this.#root,
            pathDir
        )
    }

    protected get premission () {
        return this.#premission
    }

    public isSuccess = FilesSysteme.isSuccess
    @PerformanceProfiler.decorator()
    static isSuccess<T>(
        result: ResultFilesSysteme<T>,
        callbackError?: (error: string) => void
    ): T {
        if (result.status === "error") {
            callbackError?.(result.error)
            throw new Error(result.error)
        }
        return result.value;
    }
    
}
