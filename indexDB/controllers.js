import db from "./indexDB.js";

/**
 * 
 * @param {{name: string, age: number, create_at: number}} data 
 */
async function  postData(data) {
    await db.create(data, "user")
}

async function getAllData() {
    const data = await db.findManny("user")
    console.log("Get All user", data)
}

/**
 * 
 * @param {number} id 
 */
async function getDataById(id) {
    const response = await db.find("user", id)
    console.log("Get user by id", response)
}

/**
 * 
 * @param {number} id 
 * @param {{name: string, age: number, create_at: number}} data
 */
async function updateData(id, data) {
    await db.update(id, data, "user")
    
}

/**
 * 
 * @param {number} id 
 */
async function deleteData(id) {
   await db.delete(id, "user") 
}


// const data = {
//     name: "Jhon Doe",
//     age: 20,
//     create_at: Date.now()
// }
// const newData = {
//     name: "Jhon Doe Jr",
//     age: 20,
//     create_at: Date.now()
// }

// postData(data)
// getAllData()
// getDataById(2)
// deleteData(1)
// updateData(1, newData)