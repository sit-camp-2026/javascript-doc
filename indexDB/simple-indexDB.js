// // @ts-ignore
// import { openDB } from "https://cdn.jsdelivr.net/npm/idb@8/+esm";

// async function init() {
//   const db = await openDB("simple-database", 1, {
//     /**
//      *
//      * @param {any} db
//      */
//     upgrade(db) {
//       if (!db.objectStoreNames.contains("test")) {
//         db.createObjectStore("test", { keyPath: "id", autoIncrement: true });
//       }
//     },
//   });
//   return db
// }

// /** Add a record */
// async function addRecord(data) {
//   const db = await init();
//   const id = await db.add("test", data);
//   console.log("Added record with id:", id);
//   return id;
// }

// /** Get a record by ID */
// async function getRecord(id) {
//   const db = await init();
//   return await db.get("test", id);
// }

// /** Get all records */
// async function getAllRecords() {
//   const db = await init();
//   return await db.getAll("test");
// }

// /** Update a record */
// async function updateRecord(data) {
//   const db = await init();
//   await db.put("test", data); // data must include the `id` key
//   console.log("Updated record:", data.id);
// }

// /** Delete a record by ID */
// async function deleteRecord(id) {
//   const db = await init();
//   await db.delete("test", id);
//   console.log("Deleted record:", id);
// }

// // --- Usage ---
// const user = { name: "John Doe", age: 20 };

// // await addRecord(user);
// // console.log(await getRecord(1))   
// // console.log(await getAllRecords())   

// // await updateRecord({name: "Jane Doe", age: 25 , id: 1});
// // console.log(await getRecord(1))   

// // await deleteRecord(1);
// // console.log(await getAllRecords()); 
