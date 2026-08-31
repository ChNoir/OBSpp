import { I18nExtractor } from "@/Class/I18n/I18nExtractor.shared";

export function CLI_i18n(value: string | number | boolean | string[]) : boolean | void {

    const name = typeof value === "string" ? value : "en";

    const OUTPUT_FILE = "./local/";

    I18nExtractor.start( OUTPUT_FILE , name)
    
}
