import { PerformanceScope } from "./PerformanceScope.shared";
import { PerformanceMeasure } from "./PerformanceMeasure.shared"
import { ReportNode } from "./ReportNode.shared";
import { NullPerformanceMeasure } from "./NullPerformanceMeasure.shared";

export class PerformanceProfiler {

    static isDebug =  true  //CLIManager.getContext().hasArg("Debug")
    static #Profig : { [scopeName : string] : PerformanceScope } = {}
    static maxHistory = 10_000
    static sampleHistory = 1_000;

   
    static measure ( scopeName : string ) : PerformanceMeasure | NullPerformanceMeasure {
        if (!PerformanceProfiler.isDebug) return new NullPerformanceMeasure()
        if (!PerformanceProfiler.#Profig[scopeName]) PerformanceProfiler.#Profig[scopeName] = new PerformanceScope()
        return new PerformanceMeasure(PerformanceProfiler.#Profig[scopeName])
    }

    static report() {

        if (!this.isDebug) return;
        const root = new ReportNode();

        // Construction de l'arbre
        for (const [scopeName, scope] of Object.entries(this.#Profig)) {

            const parts = scopeName.split(".");

            let current = root;

            for (const part of parts) {

                let child = current.children.get(part);

                if (!child) {
                    child = new ReportNode();
                    current.children.set(part, child);
                }

                current = child;
            }

            current.scope = scope;
        }

        console.log("");
        console.log("════════════════════════════════════════════════════════════════════");
        console.log(" Performance Report");
        console.log("════════════════════════════════════════════════════════════════════");

        this.printNode(root, "");

        console.log("════════════════════════════════════════════════════════════════════");

    }

  
    private static printNode(node: ReportNode, indent: string) {

        const entries = [...node.children.entries()]
            .sort((a, b) => a[0].localeCompare(b[0]));

        entries.forEach(([name, child], index) => {

            const last = index === entries.length - 1;
            const branch = last ? "└── " : "├── ";

            if (child.scope) {

                const minram = child.scope.minRam
                const maxram = child.scope.maxRam
                const totalram = child.scope.totalRam

                console.log(`${indent}${branch}${name}`);
                console.log(`${indent}${last ? "    " : "│   "}   Calls  : ${child.scope.nCall}`);
                console.log(`${indent}${last ? "    " : "│   "}   Avg    : ${child.scope.averageMs.toFixed(3)} ms`);
                console.log(`${indent}${last ? "    " : "│   "}   Min    : ${child.scope.minMs.toFixed(3)} ms`);
                console.log(`${indent}${last ? "    " : "│   "}   Max    : ${child.scope.maxMs.toFixed(3)} ms`);
                console.log(`${indent}${last ? "    " : "│   "}   P95    : ${child.scope.p95Ms.toFixed(3)} ms`);
                console.log(`${indent}${last ? "    " : "│   "}   minRam : ${PerformanceProfiler.formatBytes(minram)}`);
                console.log(`${indent}${last ? "    " : "│   "}   maxRam : ${PerformanceProfiler.formatBytes(maxram)}`);
                console.log(`${indent}${last ? "    " : "│   "}   Total  : ${child.scope.totalMs.toFixed(3)} ms | ${PerformanceProfiler.formatBytes(totalram)}`);

                console.log(`${indent}${last ? "    " : "│   "}`)

            } else {
                console.log(`${indent}${branch}${name}`);
            }

            this.printNode(
                child,
                indent + (last ? "    " : "│   ")
            );

        });

    }

    
    static formatBytes(bytes: number): string {

        const units = ["B", "KB", "MB", "GB", "TB"];

        const sign = bytes < 0 ? "-" : "";

        let value = Math.abs(bytes);
        let unit = 0;

        while (value >= 1024 && unit < units.length - 1) {
            value /= 1024;
            unit++;
        }

        return `${sign}${value.toFixed(2)} ${units[unit]}`;
    }

    static save() {

        
        const metadata = {
            version: 1,
            profilerVersion: "1.0.0",
            createdAt: new Date().toISOString(),
            node: process.version,
            platform: process.platform,
        }

        const save = {
            metadata : metadata,
            scopes : {} as Record<string, any>
        }

        for (const [name, scope] of Object.entries(this.#Profig)) {
            const statistics = {
                calls: scope.nCall,
                totalMs: scope.totalMs,
                averageMs: scope.averageMs,
                medianMs: scope.medianMs,
                minMs: scope.minMs,
                maxMs: scope.maxMs,
                p90Ms: scope.p90Ms,
                p95Ms: scope.p95Ms,
                p99Ms: scope.p99Ms,
                standardDeviation: scope.standardDeviation,
                averageRam: scope.averageRam,
                minRam: scope.minRam,
                maxRam: scope.maxRam
            }

            const t = scope.durationsMs
            const samples = t.length > PerformanceProfiler.sampleHistory ? scope.durationsMs.slice(0 , PerformanceProfiler.sampleHistory) : t


            save.scopes[name] = {
                statistics,
                samples
            }
        }
    }

    static decorator(scopeName?: string) {

        return function <T extends (...args: any[]) => any>(
            originalMethod: T,
            context: ClassMethodDecoratorContext
        ) {

            return function (this: any, ...args: Parameters<T>) {

                if (!PerformanceProfiler.isDebug) return originalMethod.apply(this, args);

                // esBuild | Class => function ou class
                const className = this.name ? (this.name as string).replaceAll("_" ,"") : this.constructor.name.replaceAll("_" ,"")
                const name =
                    scopeName ??
                    `${className}.${String(context.name)}`;
                const perf = PerformanceProfiler.measure(name);

                let result: any;

                try {

                    result = originalMethod.apply(this, args);

                } catch (err) {

                    perf.end();
                    throw err;

                }

                if (result && typeof result.then === "function") {

                    return result
                        .then((v: any) => {
                            perf.end();
                            return v;
                        })
                        .catch((err: any) => {
                            perf.end();
                            throw err;
                        });
                }

                perf.end();
                return result;

            };

        };

    }

}

