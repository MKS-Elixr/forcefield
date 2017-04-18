var knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: "./data/dummy-db.sqlite"
  },
  useNullAsDefault: true
});

var Bookshelf = require('bookshelf')(knex);
var bookshelf = Bookshelf;

knex.schema.createTableIfNotExists('users', function (table) {
  table.increments('ID').primary();
  table.string('name');
  table.string('email');
  table.string('password');
  table.integer('sid');
  table.integer('longitude');
  table.integer('latitude');
  table.foreign('sid').references('schools.ID');
}).then(function(){
	console.log('users schema created.');
});

knex.schema.createTableIfNotExists('events', function (table) {
  table.increments('ID').primary();
  table.timestamp('created_at').defaultTo(knex.fn.now());
  table.string('description');
  table.string('status');
  table.string('imgurl');
  table.integer('longitude');
  table.integer('latitude');
  table.integer('createdby');
}).then(function(){
  console.log('events schema created.');
});

knex.schema.createTableIfNotExists('userevents', function (table) {
  table.increments('ID').primary();
  table.integer('uid');
  table.integer('eid');
  //createdby expects a user id
  table.foreign('uid').references('users.ID');
  table.foreign('eid').references('events.id');
}).then(function(){
	console.log('userevents schema created.');
});

knex.schema.createTableIfNotExists('schools', function (table) {
  table.increments('ID').primary();
  table.string('name');
  table.string('password');
  table.string('email');
  table.integer('longitude');
  table.integer('latitude');
}).then(function(){
  console.log('school schema created.');
});

knex.schema.createTableIfNotExists('officers', function (table) {
  table.increments('ID').primary();
  table.string('name');
  table.integer('sid')
  table.string('available');
  table.string('badgenumber');
  table.timestamp('patchtime').defaultTo(knex.fn.now());
  table.timestamp('returntime').defaultTo(knex.fn.now());
  table.foreign('sid').references('schools.ID');
}).then(function(){
  console.log('officers schema created.');
});

module.exports = {
  knex: knex,
  bookshelf: bookshelf
}
