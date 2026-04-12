# IndexedDB — [openDB]

> **What is this about?**
> This is a simple summary of a web developer article about **IndexedDB** — a way to save data inside a web browser.

---

## What is IndexedDB?

Imagine your web browser has a **storage box** built inside it. IndexedDB is that storage box. It lets websites save large amounts of data directly on your computer or phone — without needing the internet.

- It can store many kinds of data (text, numbers, objects, etc.)
- Each website only has access to its **own** storage box — websites cannot read each other's data
- It can hold a very large amount of data

---

## Important Words to Know

| Word | Simple Meaning |
|------|---------------|
| **Database** | The main storage box. It holds everything. |
| **Object Store** | A smaller box inside the database. Like a folder. For example, one folder for "people", one for "notes". |
| **Index** | A special label that helps you find data faster. Like the index at the back of a book. |
| **Transaction** | A group of actions done together safely. If one action fails, ALL actions are cancelled — so your data stays safe. |
| **Cursor** | A tool that goes through your data one item at a time, like turning pages in a book. |

---

## How to Check if the Browser Supports IndexedDB

Before using IndexedDB, you should check if the browser can use it. Most modern browsers support it, but it's good practice to check:

```javascript
if (!('indexedDB' in window)) {
  console.log("This browser doesn't support IndexedDB");
}
```

---

## How to Open a Database

To open (or create) a database, you use a command called `openDB()`. If the database does not exist yet, it will be created automatically.

```javascript
const db = await openDB('my-database', 1);
```

- `'my-database'` — the name you choose for your database
- `1` — the version number (start with 1)

---

## How to Create Object Stores (Folders)

Object stores are like folders inside your database. You create them when you first open the database.

```javascript
const db = await openDB('my-database', 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains('people')) {
      db.createObjectStore('people', { keyPath: 'email' });
    }
  }
});
```

**What is a `keyPath`?**
A `keyPath` is the property that makes each item **unique**. For example, using `email` means every person must have a different email address.

You can also use **auto-increment** (the database gives each item a number automatically, like 1, 2, 3...):

```javascript
db.createObjectStore('notes', { autoIncrement: true });
```

---

## How to Create Indexes (Labels for Faster Search)

An index helps you find data by a specific property (not just the main key).

```javascript
peopleObjectStore.createIndex('gender', 'gender', { unique: false });
peopleObjectStore.createIndex('ssn', 'ssn', { unique: true });
```

- `unique: false` → many people can have the same value (e.g., same gender)
- `unique: true` → every item must have a different value (e.g., ID number)

---

## How to Work with Data (CRUD)

**CRUD** = Create, Read, Update, Delete. These are the four basic things you can do with data.

### Add Data (Create)

```javascript
await db.add('foods', {
  name: 'Sandwich',
  price: 4.99,
  description: 'A very tasty sandwich!'
});
```

### Read Data

```javascript
const item = await db.get('foods', 'Sandwich');
```

This gets the item whose key is `'Sandwich'`.

### Update Data

```javascript
await db.put('foods', {
  name: 'Sandwich',
  price: 5.99,
  description: 'An even tastier sandwich!'
});
```

> **Warning:** When you update an item, any old fields that you do not include will be deleted. Always include all the fields you want to keep.

### Delete Data

```javascript
await db.delete('foods', 'Sandwich');
```

---

## How to Get All Data at Once

### Simple Way — `getAll()`

```javascript
const allFoods = await db.getAll('foods');
```

This returns everything in the `'foods'` store at once.

### Flexible Way — Cursors

A cursor goes through items one by one, which is useful if you want to do something with each item:

```javascript
let cursor = await tx.store.openCursor();

while (cursor) {
  console.log(cursor.key, cursor.value); // Look at each item
  cursor = await cursor.continue();      // Move to the next item
}
```

---

## Transactions — Keeping Data Safe

Every action (add, read, update, delete) happens inside a **transaction**. A transaction makes sure that if something goes wrong, your data is not damaged.

Think of it like this: if you are moving files from one folder to another, a transaction makes sure that if the move fails halfway, the files go back to where they started.

```javascript
const tx = db.transaction('foods', 'readwrite');

await Promise.all([
  tx.store.add({ name: 'Eggs', price: 2.99 }),
  tx.done // Wait for everything to finish
]);
```

---

## Database Versions

When you want to **change the structure** of your database (for example, add a new object store), you increase the version number. The database will then upgrade itself automatically.

```javascript
const db = await openDB('my-database', 2, { // Version 2
  upgrade(db, oldVersion) {
    switch (oldVersion) {
      case 0:
        db.createObjectStore('store', { keyPath: 'name' });
      case 1:
        // Add a new index in version 2
        tx.store.createIndex('name', 'name');
    }
  }
});
```
*Refference on ["Work with IndexedDB"](https://web.dev/articles/indexeddb) from web.dev*