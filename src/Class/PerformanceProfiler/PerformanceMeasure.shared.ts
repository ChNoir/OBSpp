import { PerformanceScope } from "./PerformanceScope.back";

export type MeasureData = {
    ns : bigint
    ram : number
}

export class PerformanceMeasure {

    start : MeasureData
    constructor(public scope : PerformanceScope) {
        this.start = this.measure()
    }

    measure() : MeasureData {

       // Node.js
        if (typeof process !== "undefined" &&
            typeof process.hrtime?.bigint === "function") {

            return {
                ns: process.hrtime.bigint(),
                ram: process.memoryUsage().heapUsed
            };
        }

        // Browser
        if (typeof performance !== "undefined") {

            return {
                ns: BigInt(Math.round(performance.now() * 1_000_000)),
                ram: (
                    performance as Performance & {
                        memory?: { usedJSHeapSize: number };
                    }
                ).memory?.usedJSHeapSize ?? 0
            };
        }

        throw new Error("Unsupported platform.");
    }
  
    [Symbol.dispose]() {
        this.dispose();
    }

    async [Symbol.asyncDispose]() {
        this.dispose();
    }

    private dispose() {

        this.scope.addMesure(
            this.start,
            this.measure()
        );

    }

    public end() {
        this.dispose();
    }
}