
exports.up = function(knex, Promise) {
  return knex.schema.createTable('apes', function(table) {
    table.increments();
    table.string('type');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('apes');
};
