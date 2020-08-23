const db = require('../data/db-config.js')

module.exports = {
  find,
  findById,
  findWateringsById,
  insert,
  update,
  remove,
}

function find() {
  return db('waterings')
}

function findById(id) {
  return db('waterings').where({ id }).first()
}

function findWateringsById(plantId) {
  return db('waterings as w')
    .join('plants as p', 'p.id', '=', 'w.plant_id')
    .select('p.name', 'p.variety', 'w.created_at')
    .where('w.plant_id', plantId)
}

function insert(newWatering) {  
  return db('waterings')
    .returning(['id', 'created_at', 'plant_id'])
    .insert(newWatering)
    .then(id => {
      return id
    })
}

function update(id, changes) {
  return db('waterings').where({ id }).update(changes)
}

function remove(id) {
  return db('waterings').where('id', id).del()
}
