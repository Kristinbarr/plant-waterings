
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('plants').del()
    .then(function () {
      // Inserts seed entries
      return knex('plants').insert([
        {name: 'Tomato', variety: 'Beefsteak'},
        {name: 'Tomato', variety: 'Red Cherry'},
        {name: 'Strawberry', variety: 'June-bearing'},
        {name: 'Fig', variety: 'Brown Turkey'},
        {name: 'Basil', variety: 'Sweet'},
        {name: 'Aloe', variety: 'Vera'}
      ]);
    });
};
