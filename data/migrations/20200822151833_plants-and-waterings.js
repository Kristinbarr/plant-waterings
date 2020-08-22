exports.up = async knex => {
  await knex.schema.createTable('plants', tbl => {
    tbl.increments()
    tbl.text('name').notNullable()
    tbl.text('variety')
  })
  await knex.schema.createTable('waterings', tbl => {
    tbl.increments()
    tbl.timestamp('created_at').notNullable()
    tbl
      .integer('plant_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('plants')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
  })
}

exports.down = async knex => {
  await knex.schema.dropTableIfExists('waterings')
  await knex.schema.dropTableIfExists('plants')
}
