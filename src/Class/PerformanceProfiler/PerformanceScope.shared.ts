import { MeasureData } from "./PerformanceMeasure.shared";
import { PerformanceProfiler } from "./PerformanceProfiler.shared";

export class PerformanceScope {

    public mesures : {
        start: MeasureData
        end : MeasureData
    }[] = []

    addMesure(start : MeasureData , end : MeasureData) {
        this.mesures.push({
            start,
            end
        })

        if (this.mesures.length > PerformanceProfiler.maxHistory){
            this.mesures.shift();
        }
    }

    // Time

    private get durationsNs(): number[] {
        return this.mesures.map( m => Number(m.end.ns - m.start.ns));
    }

    get durationsMs(): number[] {
        return this.durationsNs.map(x => x / 1_000_000);
    }

    private get sortedDurationsMs(): number[] {
        return [...this.durationsMs].sort((a, b) => a - b);
    }


    get nCall () {
        return this.mesures.length
    }

    get totalMs() {
        let total = 0;
        for (const value of this.durationsMs)
            total += value;
        return total;
    }

    get averageMs() {

        if (this.nCall === 0)
            return 0;

        return this.totalMs / this.nCall;

    }

    get minMs() {
        if (this.nCall === 0) return 0;
        return Math.min(...this.durationsMs);
    }

    get maxMs() {
        if (this.nCall === 0) return 0;
        return Math.max(...this.durationsMs);
    }

    get medianMs(): number {

        if (this.nCall === 0)
            return 0;

        const values = this.sortedDurationsMs;

        const middle = Math.floor(values.length / 2);

        if (values.length % 2 === 0)
            return (values[middle - 1] + values[middle]) / 2;

        return values[middle];
    }

    get p50Ms () : number { return this.medianMs }

    private percentile(percent: number): number {

        if (this.nCall === 0) return 0;
        const values = this.sortedDurationsMs;
        const index = Math.ceil(values.length * percent) - 1;
        return values[Math.max(0, index)];
    }

    get p90Ms(): number {
        return this.percentile(0.90);
    }
    get p95Ms(): number {
        return this.percentile(0.95);
    }
    get p99Ms(): number {
        return this.percentile(0.99);
    }

    get variance(): number {

        if (this.nCall === 0) return 0;
        const avg = this.averageMs;
        let total = 0;
        for (const value of this.durationsMs) {
            total += (value - avg) ** 2;
        }
        return total / this.nCall;
    }

    get standardDeviation(): number {
        return Math.sqrt(this.variance);
    }

    get operationsPerSecond(): number {
        if (this.totalMs === 0) return 0;
        return this.nCall / (this.totalMs / 1000);
    }


    // RAM

    get averageRam() {

        if (this.nCall === 0) return 0;
        let total = 0;

        for (const m of this.mesures) {
            total +=
                m.end.ram -
                m.start.ram;

        }

        return total / this.nCall;

    }


    get minRam(): number {

        if (this.nCall === 0) return 0;

        return Math.min(
            ...this.mesures.map(
                m => m.end.ram - m.start.ram
            )
        );

    }

    get maxRam(): number {

        if (this.nCall === 0) return 0;

        return Math.max(
            ...this.mesures.map(
                m => m.end.ram - m.start.ram
            )
        );

    }

    get totalRam(): number {

        let total = 0;

        for (const m of this.mesures) {

            total +=
                m.end.ram -
                m.start.ram;

        }

        return total;
    }


}