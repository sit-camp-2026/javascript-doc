import db from "./indexDB.js";

/**
 * @param {string} tableName
 * @param {object} data
 */
export async function postData(data, tableName) {
  await db.create(data, tableName);
}

/**
 * @param {string} tableName
 */
export async function getAllData(tableName) {
  const response = await db.findManny(tableName);
  return response;
}

/**
 * @param {string} tableName
 * @param {number} id
 */
export async function getDataById(id, tableName) {
  const response = await db.find(tableName, id);
  return response;
}

/**
 * @param {string} tableName
 * @param {number} id
 * @param {object} data
 */
export async function updateData(id, data, tableName) {
  await db.update(id, data, tableName);
}

/**
 * @param {string} tableName
 * @param {number} id
 */
export async function deleteData(id, tableName) {
  await db.delete(id, tableName);
}