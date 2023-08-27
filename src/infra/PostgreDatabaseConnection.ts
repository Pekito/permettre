import pgp from "pg-promise";
import { IDatabaseConnection } from "./IDatabaseConnection";
export class PostgreDatabaseConnection implements IDatabaseConnection {
    private _db;
    constructor() {
        this._db = pgp()("postgres://development:development@localhost:5432/permettre");
    }
    async query(statement: string, params?: any): Promise<any> {
        return this._db.query(statement, params);
    }
    async close(): Promise<void> {
        return this._db.$pool.end();
    }
    
}