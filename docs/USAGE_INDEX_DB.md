# How to use IndexedDB
> We have created ```controllers.js``` and ```indexDB.js``` for easy access to IndexedDB

---

## `indexDB.js` (Setting Up the Database)

This file **creates and starts the database**.

```javascript
const db = new IndexDB("test-db", ["gpa", "gpax"], 1);
await db.initDB();
```

### What each part means:

| Part | Simple Meaning |
|------|---------------|
| `"test-db"` | The **name** of the database |
| `["gpa", "gpax"]` | The **table** inside the database |
| `1` | The **version number** of the database, set only version 1 |
| `initDB()` | **Starts** the database so it is ready to use |

> This file is then **exported** so other files can use the same database connection. You only need to set up the database once!

---

## `db.js` (Using the Database)

This file contains **5 functions** — one for each action you can do with your data. It imports the database from `indexDB.js` and uses it.

---

### `postData` — Add New Data

```javascript
export async function postData(data, tableName) {
  await db.create(data, tableName);
}
```

- **What it does:** Saves a new item into a folder (object store)
- **What you give it:**
  - `data` — the information to save (for example: `{ name: "John", age: 18, create_at: 1234567 }`)
  - `tableName` — which folder to save it in (for example: `"gpa"`)

---

### `getAllData` — Get All Items

```javascript
export async function getAllData(tableName) {
  const response = await db.findManny(tableName);
  return response;
}
```

- **What it does:** Gets **every item** from a folder
- **What you give it:**
  - `tableName` — which folder to read from
- **What you get back:** A list of all items in that folder

---

### `getDataById` — Find One Item

```javascript
export async function getDataById(id, tableName) {
  const response = await db.find(tableName, id);
  return response;
}
```

- **What it does:** Finds **one specific item** using its ID number
- **What you give it:**
  - `id` — the ID number of the item you want
  - `tableName` — which folder to look in
- **What you get back:** The one item that matches the ID

---

### `updateData` — Change an Item

```javascript
export async function updateData(id, data, tableName) {
  await db.update(id, data, tableName);
}
```

- **What it does:** Updates (changes) an item that already exists
- **What you give it:**
  - `id` — the ID number of the item to change
  - `data` — the new information to replace the old information
  - `tableName` — which folder the item is in

---

### `deleteData` — Remove an Item

```javascript
export async function deleteData(id, tableName) {
  await db.delete(id, tableName);
}
```

- **What it does:** Permanently deletes one item from a folder
- **What you give it:**
  - `id` — the ID number of the item to delete
  - `tableName` — which folder the item is in