// @ts-ignore
import { openDB } from "https://cdn.jsdelivr.net/npm/idb@8/+esm";

class IndexDB {
  /**
   * IndexDB constructor
   * @param {string} nameDB
   * @param {string[]} nameTable
   * @param {number} version
   */
  constructor(nameDB, nameTable, version) {
    this.nameDB = nameDB;
    this.nameTable = nameTable;
    this.version = version;
    this.db = null;
  }

  async initDB() {
    const tables = this.nameTable;
    this.db = await openDB(this.nameDB, this.version, {
      /**
       * 
       * @param {any} db 
       */
      upgrade(db) {
        tables.forEach((t) => {
          if (!db.objectStoreNames.contains(t)) {
            db.createObjectStore(t, {
              autoIncrement: true,
              keyPath: "id",
            });
          }
        });
      },
    });
  }

  /**
   * 
   * @param {object} data
   * @param {string} tableName
   * @returns {Promise<void>}
   */
  async create(data, tableName) {
    const tx = this.db.transaction(tableName, "readwrite");
    const store = tx.objectStore(tableName);

    await store.add(data);
    tx.done;
  }

  /**
   * 
   *@param {number} id
   * @param {object} data
   * @param {string} tableName
   */
  async update(id, data, tableName) {
    const tx = this.db.transaction(tableName, "readwrite");
    const store = tx.objectStore(tableName);

    await store.put({
      ...data,
      id
    })
    tx.done
  }

    /**
   * 
   * @param {string} tableName
   * @param {number} id 
   * @returns {Promise<object>}
   */
  async find(tableName, id) {
    const tx = this.db.transaction(tableName)
    const store = tx.objectStore(tableName)

    return store.get(id)
  }

  /**
   * 
   * @param {string} tableName 
   * @returns {Promise<Array<Object>>}
   */
  async findManny(tableName) {
    const tx = this.db.transaction(tableName)
    const store = tx.objectStore(tableName)

    return store.getAll()
  }

  /**
   *
   * @param {number} id
   * @param {string} tableName
   */
  async delete(id, tableName) {
    const tx = this.db.transaction(tableName, "readwrite");
    const store = tx.objectStore(tableName);

    await store.delete(id);
    tx.done;
  }
}

export default IndexDB;
