const db = require('../data/db-config.js')

module.exports = {
  find,
  findById,
  insert,
  update,
  remove,
}

function find() {
  return db('plants')
}

function findById(id) {
  return db('plants').where({ id }).first()
}

function insert(plant) {
  return db('plants')
    .insert(plant)
    .then(ids => {
      return getById(ids[0])
    })
}

function update(id, changes) {
  return db('plants').where({ id }).update(changes)
}

function remove(id) {
  return db('plants').where('id', id).del()
}
