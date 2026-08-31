export type UniversalI18nMap = {
    [tag : string] : {
        [key : string] : any
    } | undefined
}

export type I18nArgsMap<T extends Record<string, any>> = Partial<{ [K in keyof T]: T[K] }>


export type I18n_I18nMap = {}
export type I18n_EnvConfigMap = "I18N_LOCAL" | "I18N_LOCAL_FOLDER" | "I18N_HOT_LOCAL_FOLDER" | "I18N_LOCAL_ENDPOINT"
