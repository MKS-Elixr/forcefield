var knex = require('knex')({
  client: 'mysql',
  connection: {
    host: 'mysqlcluster13.registeredsite.com',
    user: 'whitedeer',
    password: '!QAZ2wsx',
    database: 'jubilant_umbrella',
    charset: 'UTF8'
  }
})

var Bookshelf = require('bookshelf')(knex)
var bookshelf = Bookshelf

knex.schema.createTableIfNotExists('schools', function (table) {
  table.increments('ID').primary()
  table.string('name')
  table.string('password')
  table.string('email')
  table.integer('longitude')
  table.integer('latitude')
}).then(function () {
  console.log('school schema created.')
})

knex.schema.createTableIfNotExists('events', function (table) {
  table.increments('ID').primary()
  table.timestamp('created_at').defaultTo(knex.fn.now())
  table.string('description')
  table.string('status')
  table.string('imgurl')
  table.integer('longitude')
  table.integer('latitude')
  table.integer('createdby')
// createdby expects a user id
}).then(function () {
  console.log('events schema created.')
})

knex.schema.createTableIfNotExists('students', function (table) {
  table.increments('ID').primary()
  table.string('name')
  table.string('email')
  table.string('studentid')
  table.string('password')
  table.integer('longitude')
  table.integer('latitude')
  table.integer('sid')
  table.foreign('sid').references('schools.ID')
}).then(function () {
  console.log('students schema created.')
// table.integer('sid')
// table.foreign('sid').references('schools.ID')
})

knex.schema.createTableIfNotExists('studentsevents', function (table) {
  table.increments('ID').primary()
  table.integer('sdid')
  table.integer('eid')
  table.foreign('uid').references('students.ID')
  table.foreign('eid').references('events.ID')
}).then(function () {
  console.log('studentsevents schema created.')
// table.integer('uid')
// table.integer('eid')
// table.foreign('uid').references('users.ID')
// table.foreign('eid').references('events.ID')
})

knex.schema.createTableIfNotExists('officers', function (table) {
  table.increments('ID').primary()
  table.string('name')
  table.string('available')
  table.string('badgenumber')
  table.timestamp('patchtime')
  table.timestamp('returntime').defaultTo(knex.fn.now())
  table.integer('sid')
  table.foreign('sid').references('schools.ID')
}).then(function () {
  console.log('officers schema created.')
// table.integer('sid')
// table.foreign('sid').references('schools.ID')
})

knex.schema.createTableIfNotExists('officerevents', function (table) {
  table.increments('ID').primary()
  table.integer('oid')
  table.integer('eid')
  table.foreign('oid').references('officers.ID')
  table.foreign('eid').references('events.ID')
}).then(function () {
  console.log('officerevents table created.')
// table.integer('oid')
// table.integer('eid')
// table.foreign('oid').references('officers.ID')
// table.foreign('eid').references('events.ID')
})

var Schools = bookshelf.Model.extend({
  tableName: 'schools',
  Students: function () {
    return this.hasMany(Students)
  },
  Officers: function () {
    return this.hasMany(Officers)
  }
})

var Events = bookshelf.Model.extend({
  tableName: 'events',
  Students: function () {
    return this.belongsToMany(Students)
  },
  Officers: function () {
    return this.belongsToMany(Officers)
  }
})

var Students = bookshelf.Model.extend({
  tableName: 'students',
  Schools: function () {
    return this.belongsTo(Schools)
  },
  Events: function () {
    return this.belongsToMany(Events)
  }
})

var Officers = bookshelf.Model.extend({
  tableName: 'officers',
  Schools: function () {
    return this.belongsTo(Schools)
  },
  Events: function () {
    return this.belongsToMany(Events)
  }
})

Schools()
Events()
Students()
Officers()

module.exports = {
  knex: knex,
  bookshelf: bookshelf
}
