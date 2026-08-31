import { BuilderFront } from "@/Class/BuilderFront/BuilderFront.back";
import { PerformanceProfiler } from "@/Class/PerformanceProfiler/PerformanceProfiler.shared";



export async function CLI_Build(value : string | number | boolean | string[]) {
    
    await BuilderFront.start()
    PerformanceProfiler.report()
}

