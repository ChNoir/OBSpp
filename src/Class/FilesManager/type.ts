export type FilesManagerPremission = {
    read ?: boolean
    write ?: boolean
    delete ?: boolean
    create ?: boolean
}

export type ResultFilesSysteme<T> = {
    status : "success" 
    value : T
} | {
    status : "error"
    error : string
}

export namespace ReadFileOptions {
    export type String =
        | BufferEncoding
        | {
              encoding: BufferEncoding;
              flag?: string;
          };

    export type Buffer = {
        encoding?: null;
        flag?: string;
    };

    export type Any = String | Buffer;
}
