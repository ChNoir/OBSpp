import { PerformanceMeasure } from "./PerformanceMeasure.back";

export class NullPerformanceMeasure {

    [Symbol.dispose]() {}

    async [Symbol.asyncDispose]() {}

    public end(): void {}

}