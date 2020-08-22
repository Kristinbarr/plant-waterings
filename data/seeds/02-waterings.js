
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('waterings').del()
    .then(function () {
      // Inserts seed entries
      return knex('waterings').insert([
        {id: 1, created_at: '2020-08-19T19:01:47.937Z', plant_id: 1},
        {id: 2, created_at: '2020-08-20T19:02:02.976Z', plant_id: 2},
        {id: 3, created_at: '2020-08-21T19:03:44.472Z', plant_id: 3},
        {id: 4, created_at: '2020-08-22T19:03:54.623Z', plant_id: 4},
        {id: 5, created_at: '2020-08-23T19:04:03.738Z', plant_id: 5}
      ]);
    });
};
