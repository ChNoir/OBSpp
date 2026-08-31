import { Express, Router } from "express";
import { EndPointAPI } from "./EndPointAPI";
import { EndPointAPIContext } from "./EndPointAPIContext";
import { ConsoleLogger } from "../ConsoleLogger.shared";
import { I18n } from "../I18n/I18n.back";
import { I18nColdContext } from "../I18n/I18nColdContext.shared";
import { InitsClass } from "../InitsClass.shared";

export class BuilderAPI {
    private static readonly endpoints: EndPointAPI[] = [];

    public static console: ConsoleLogger;
    public static I18n: I18nColdContext<BuilderAPI_I18nMap> 
    public static data : Record<string , () => any > = {}
    

    private static async _init() {
        BuilderAPI.console = ConsoleLogger.getInstance("BuilderAPI")
        BuilderAPI.I18n = I18n.createColdContext<BuilderAPI_I18nMap>()
    }

    static { InitsClass.register( BuilderAPI._init ) }


    public static registre(
        endpoint: EndPointAPI
    ) {
        this.endpoints.push(endpoint);
    }

    public static getUrl( endpoint: EndPointAPI) {
        return `/api/${endpoint.service}/${endpoint.endpoint}`;
    }

    public static setup() {


        const route = Router();

        for (const endpoint of this.endpoints) {
            const path = BuilderAPI.getUrl(endpoint);

            const method = (
                endpoint.method ?? "GET"
            ).toLowerCase() as Lowercase<
                NonNullable<EndPointAPI["method"]>
            >;

            route[method](
                path,
                async (req, res) => {
                    const ctx =
                        new EndPointAPIContext(
                            req,
                            res
                        );

                    try {
                        await endpoint.callback(ctx);
                    }
                    catch (error) {
                        console.error(error);

                        if (!res.headersSent) {
                            ctx.error(
                                "INTERNAL_SERVER_ERROR",
                                500
                            );
                        }
                    }
                }
            );
        }

        
    }
}


type BuilderAPI_I18nMap = {

}