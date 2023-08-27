export interface IDatabaseConnection {
    query(statement: string, params?: any): Promise<any>;
    close(): Promise<void>;
}