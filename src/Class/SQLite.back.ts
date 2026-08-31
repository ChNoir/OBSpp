import { EnvConfig } from '@/Class/EnvConfig/EnvConfig.back';
import { I18n } from '@/Class/I18n/I18n.back';
import { I18nColdContext } from '@/Class/I18n/I18nColdContext.shared';
import Database from 'better-sqlite3';
import fs from "fs"
import { ConsoleLogger } from './ConsoleLogger.shared';
import { EnvConfigContext } from './EnvConfig/EnvConfigContext.shared';
import { InitsClass } from './InitsClass.shared';



export class SQLite {

    private static pathDB  : string  = "./sqlite.db"
    private static dataBase : Database.Database 

    public static console: ConsoleLogger;
    public static I18n: I18nColdContext<SQLite_I18nMap> 
    public static EnvConfig: EnvConfigContext<SQLite_EnvConfigMap>

    private static _init() { // Anti circular dependency
        SQLite.console = ConsoleLogger.getInstance("SQLite")
        SQLite.I18n = I18n.createColdContext<SQLite_I18nMap>()
        SQLite.EnvConfig = EnvConfig.createEnvConfigContext<SQLite_EnvConfigMap>()
    }

    static { InitsClass.register( SQLite._init ) }

    public static setPathDB( path : string) {
        SQLite.pathDB = path
    }

    public static connection (options : Database.Options)  {
        if (SQLite.dataBase) SQLite.dataBase.close()
        if (!fs.existsSync(SQLite.pathDB) ) {
            ConsoleLogger.warn( SQLite.I18n.get("sqlite_file_not_found" , { path: SQLite.pathDB }) );
            return false ;
        }
        SQLite.dataBase = new Database(SQLite.pathDB, options);
        return true ;
    }

    public static get prepare() { return SQLite.dataBase.prepare }

    public static disconnect() {
        if (SQLite.dataBase) SQLite.dataBase.close()
    }
}


type SQLite_I18nMap = {
    "sqlite_file_not_found" : { path: string; }
}
type SQLite_EnvConfigMap = "SQLITE_PATH"
type SQLite_Event = {}