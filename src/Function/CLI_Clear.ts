import { CacheManager } from "@/Class/CacheManager/CacheManager.back";

export function CLI_Clear(value : string | number | boolean | string[]) {
    CacheManager.clear()
}