import { PerformanceProfiler } from "./PerformanceProfiler/PerformanceProfiler.shared"

export type InitFunctionOptions = {
    [key : string] : any
}

type ClassOjectInfo = {
    init : ( option ?: any ) => Promise<void> | void
    priorite : number
}


export class InitsClass {

    static i = 0

    static #map : ClassOjectInfo[] = []
    static isInit : 0 | 1 = 0
    static #tamp : ClassOjectInfo[] = []
   
    public static register<T extends InitFunctionOptions>( func : ( option ?: T  ) => Promise<void> | void  ,priorite : number = 0) {
        
        const COI = { 
            init : func,
            priorite : priorite
        }
        
        if (InitsClass.isInit) {this.#tamp.push(COI);}
        else {this.#map.push(COI)}
    }

    @PerformanceProfiler.decorator()    
    public static async start( option ?: InitFunctionOptions) {
        InitsClass.isInit = 1
        await InitsClass.init( InitsClass.#map , option)
    }

    @PerformanceProfiler.decorator()    
    private static async init(map : ClassOjectInfo[] , option ?: InitFunctionOptions  ) {
    
        for (const coi of map.sort(((a, b) => b.priorite - a.priorite))) {
            await coi.init(option)
            InitsClass.i++
        }
        if (this.#tamp.length > 0 ) {
            const tamp = this.#tamp
            this.#tamp = []
            await InitsClass.init(tamp , option )
        }
    }
}
