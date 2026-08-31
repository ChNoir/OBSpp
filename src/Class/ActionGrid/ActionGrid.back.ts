// import { BuilderAPI } from "../BuilderAPI/BuilderAPI";
// import { CacheManager } from "../CacheManager/CacheManager.back";
// import { ConsoleLogger } from "../ConsoleLogger.shared";
// import { RegisteRoutes } from "../Express/RegisteRoutes.back";
// import { I18n } from "../I18n/I18n.back";
// import { InitsClass } from "../InitsClass.shared";
// import { ActionGridShard } from "./ActionGrid.shard";
// import { ActionGridJSON } from "./type";

// export class ActionGrid extends ActionGridShard {
    

//     private static cache : CacheManager

//     static setJSON(ActionGridId: string, data: any): boolean {
//         if (!ActionGrid.cache.setJson(`${ActionGridId}.json`, data)) {
//             ActionGridShard.console.error(`Failed to set JSON for ActionGrid with id "${ActionGridId}".`);
//             return false;
//         }
//         return true;
//     }
   
//     private static async _init() {
//         ActionGridShard.console = ConsoleLogger.getInstance("ActionGrid")
//         ActionGridShard.I18n = I18n.createColdContext<ActionGrid_I18nMap>()

//         ActionGrid.cache = CacheManager.isSuccess(
//             CacheManager.getContext(ActionGridShard.cachePath, { read: true, write: true, create: true, delete: true }),
//             (error) => {
//                 ActionGridShard.console.fatalError(ActionGridShard.I18n.get("actionGrid_error_cache"))
//             }
//         )

//         const cachePath = CacheManager.isSuccess(
//             ActionGrid.cache.getAbsolutePath(),
//             (error) => {
//                 ActionGridShard.console.fatalError(ActionGridShard.I18n.get("actionGrid_error_cachePath"))
//             }
//         )

//         RegisteRoutes.addStaticRouter(cachePath, ActionGridShard.URL)


//         BuilderAPI.registre({
//             service: "ActionGrid",
//             endpoint: ActionGridShard.URL,
//             method: "POST",
//             callback: async (ctx) => {
//                 const id = ctx.req.query.id as string;
//                 const json = ctx.req.body as ActionGridJSON;
//                 if (!ActionGrid.setJSON(id, json)) {
//                     ctx.res.api.error({
//                         code: "actionGrid_error_setJSON",
//                         message: ActionGridShard.I18n.get("actionGrid_error_setJSON")
//                     })
//                     return;
//                 }
//                 ctx.res.json({ success: true });
//             }
//         })
//     }

//     static { InitsClass.register( ActionGrid._init ) }
    
// }


