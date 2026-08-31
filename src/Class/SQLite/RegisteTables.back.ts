export class RegisteTables {
    private static arrayInitTable : Array<() => void> = []

    public static addInitTable( call: () => void) {
        RegisteTables.arrayInitTable.push(call)
        return true
    }

    public static initTables() {
        for (const call of RegisteTables.arrayInitTable) {
            call()
        }
    }
}