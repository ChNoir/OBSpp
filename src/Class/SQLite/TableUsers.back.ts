import { SQLite } from "../SQLite.back";
import { v4 as uuidv4 } from "uuid";
import { RegisteTables } from "./RegisteTables.back";



export class TableUsers {

    static { RegisteTables.addInitTable(TableUsers.init)}

    private static heartbeatInterval : NodeJS.Timeout | undefined

    private static init() {
        SQLite.prepare(`
            CREATE TABLE IF NOT EXISTS users (
                uuid TEXT PRIMARY KEY NOT NULL,
                id TEXT NOT NULL,
                name TEXT NOT NULL,
                platform TEXT NOT NULL,
                UNIQUE(name, platform)
            );
        `).run();
    }

    private static getUserId(id : string, name: string , platform: string) : string {
        // Try to get user by name and platform
        const user = SQLite.prepare("SELECT uuid FROM users WHERE name = ? AND platform = ? AND id = ? ;").get(name , platform) as { uuid: string } | undefined;
        if (user) return user.uuid;

        // If user not exist create new user
        const uuid = uuidv4();
        SQLite.prepare("INSERT INTO users (name, platform , id, uuid) VALUES (?, ? ,? ,?);").run(name , platform , id ,uuid);
        return uuid;
    }

    private static getUserByUuid(uuid: string) : { id: string, name: string , platform: string } | undefined {
        const user = SQLite.prepare("SELECT id ,name, platform FROM users WHERE uuid = ? ;").get(uuid) as { id: string, name: string , platform: string } | undefined;
        return user;
    }

}