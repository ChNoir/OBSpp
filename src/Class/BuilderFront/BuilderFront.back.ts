import * as esbuild from "esbuild";
import { JSDOM } from "jsdom";
import type { BuildOptions } from "esbuild";
import { ConsoleLogger } from "../ConsoleLogger.shared";
import { I18nColdContext } from "../I18n/I18nColdContext.shared";
import { I18n } from "../I18n/I18n.back";
import { EnvConfig } from "../EnvConfig/EnvConfig.back";
import { EnvConfigContext } from "../EnvConfig/EnvConfigContext.shared";
import { InitsClass } from "../InitsClass.shared";
import { RegisteRoutes } from "../Express/RegisteRoutes.back";
import { CLIManager } from "../CLIManager/CLIManager.back";
import path from "path";
import { PerformanceProfiler } from "../PerformanceProfiler/PerformanceProfiler.shared";
import { CacheManager } from "../CacheManager/CacheManager.back";
import { BuilderFront_EnvConfigMap, BuilderFront_I18nMap, PageObject } from "./type";


export class BuilderFront {

    private static pages = new Map<string, PageObject>();
    private static config: BuildOptions 

    private static cachePages : CacheManager // CacheManager for pages
    private static cacheBundles : CacheManager // CacheManager for bundles

    public static console: ConsoleLogger;
    public static I18n: I18nColdContext<BuilderFront_I18nMap> 
    public static EnvConfig: EnvConfigContext<BuilderFront_EnvConfigMap>
    public static isBuild = CLIManager.getContext().hasArg("build")

    static async #_init() {
        BuilderFront.console = ConsoleLogger.getInstance("BuilderFront")
        BuilderFront.I18n = I18n.createColdContext<BuilderFront_I18nMap>()
        BuilderFront.EnvConfig = EnvConfig.createEnvConfigContext<BuilderFront_EnvConfigMap>()

    
        this.cachePages = CacheManager.isSuccess(
            CacheManager.getContext( "BuilderFront/pages" , { read : true , write : true , create : true , delete : true } ) , 
            (error) => {
                BuilderFront.console.fatalError(BuilderFront.I18n.get("builderFront_error_cachePages"))
            }
        )

        this.cacheBundles = CacheManager.isSuccess(
            CacheManager.getContext( "BuilderFront/bundles" , { read : true , write : true , create : true , delete : true } ) , 
            (error) => {
                BuilderFront.console.fatalError(BuilderFront.I18n.get("builderFront_error_cacheBundles"))
            }
        )

        const OutputBundleDir = CacheManager.isSuccess(
            this.cacheBundles.getAbsolutePath() , (error) => {
                BuilderFront.console.fatalError(BuilderFront.I18n.get("builderFront_error_outputBundleDir"))
            }
        )

        const OutputHTMLDir = CacheManager.isSuccess(
            this.cachePages.getAbsolutePath() , (error) => {
                BuilderFront.console.fatalError(BuilderFront.I18n.get("builderFront_error_outputHTMLDir"))
            }
        )

       
        RegisteRoutes.addStaticRouter("/pages" , OutputHTMLDir )
        RegisteRoutes.addStaticRouter("/bundles" , OutputBundleDir )

        BuilderFront.config = {
            outdir:  OutputBundleDir, // get Real path
            bundle: true,
            splitting: true,
            format: "esm",
            platform: "browser",
            target: "es2022",
            sourcemap: true,

            chunkNames: "chunks/[name]-[hash]",

            alias: {
                "@": "./src",
                "@CSS": "./src/CSS"
            },

            external: [
                "/css/font/*" // css
            ]
        };

        

    }

    static { InitsClass.register(BuilderFront.#_init , -100)}
    
    public static register(page: PageObject) {
        if (this.pages.has(page.name)) {
            throw new Error(`Page '${page.name}' already exists`);
        }

        this.pages.set(page.name, page);
    }

    public static async start() {
        await BuilderFront.esbuild()
        await BuilderFront.buildStaticPages()
    }


    // JS/CSS
    @PerformanceProfiler.decorator()
    public static async esbuild() {

        

        const entryPoints: {
            in: string;
            out: string;
        }[] = [];

        for (const page of BuilderFront.pages.values()) {

            if (!page.entryPoint) { continue; }
            const name = path.parse(page.entryPoint).name

            entryPoints.push({
                in: page.entryPoint,
                out: `${page.namespace}/${name}`
            });
        }

        if (entryPoints.length === 0) { return; }

        await esbuild.build({
            ...BuilderFront.config,
            entryPoints
        });
    }

    // Render HTML
    @PerformanceProfiler.decorator() 
    private static async renderHTML(page: PageObject): Promise<string> {

        const dom = new JSDOM(`<!doctype html><html><head></head><body></body></html>`);
        const document = dom.window.document;

        if (typeof page.html === "string") {
            document.body.innerHTML = page.html;
        } else if (page.html) {
            await page.html(document);
        }

        const head = document.head;

        const css = [
            ...(page.css ?? [])
        ];

        for (const url of css) {
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = url;
            head.appendChild(link);
        }

        const js = [
            ...(page.js ?? [])
        ];

        for (const url of js) {
            const script = document.createElement("script");
            script.src = url;
            head.appendChild(script);
        }

        if (page.entryPoint) {

            const name = path.parse(page.entryPoint).name
            const script = document.createElement("script");
            script.type = "module";
            script.src = `/bundles/${page.namespace}/${name}.js`;

            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = `/bundles/${page.namespace}/${name}.css`;

            head.appendChild(script);
            head.appendChild(link);
        }

        return dom.serialize();
    }

    @PerformanceProfiler.decorator()
    public static async buildStaticPages() {

        for (const page of this.pages.values()) {
            const html = await this.renderHTML(page);
            const result = this.cachePages.set(`${page.namespace}/${page.name}.html` , html);
            if (!result) {
                BuilderFront.console.error(BuilderFront.I18n.get("builderFront_error_buildStaticPages"))
            }
        }
    }


}

