export interface PageObject {
    name: string;
    namespace : string
    html?:
        | string
        | ((document: Document) => void | Promise<void>);

    css?: string[];
    js?: string[];

    entryPoint?: string
}


export type BuilderFront_I18nMap = {
    "builderFront_error_cachePages" : never
    "builderFront_error_cacheBundles" : never
    "builderFront_error_outputBundleDir" : never
    "builderFront_error_outputHTMLDir" : never
    "builderFront_error_buildStaticPages" : never

}

export type BuilderFront_EnvConfigMap = "BuilderFront_Cache_root"