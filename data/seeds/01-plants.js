
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('plants').del()
    .then(function () {
      // Inserts seed entries
      return knex('plants').insert([
        {id: 1, name: 'Tomato', variety: 'Beefsteak'},
        {id: 2, name: 'Tomato', variety: 'Red Cherry'},
        {id: 3, name: 'Strawberry', variety: 'June-bearing'},
        {id: 4, name: 'Fig', variety: 'Brown Turkey'},
        {id: 5, name: 'Basil', variety: 'Sweet'},
        {id: 6, name: 'Aloe', variety: 'Vera'}
      ]);
    });
};
