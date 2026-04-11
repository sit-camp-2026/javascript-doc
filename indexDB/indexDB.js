import IndexDB from "../lib/indexDB-helper.js";

/**
 * Link to IndexDB Class
 * See {@link IndexDB}
 */
const db = new IndexDB("test-db", ["admin", "user", "gpa", "gpax"], 1);
await db.initDB();

export default db;
