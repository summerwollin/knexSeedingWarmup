
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('apes').del(),

    // Inserts seed entries
    knex('apes').insert({id: 1, type: 'gorilla'}),
    knex('apes').insert({id: 2, type: 'bonobo'}),
    knex('apes').insert({id: 3, type: 'orangutan'})
  );
};
