if (!process.env.DEPLOYED) {
  var dotenv = require('dotenv')
  dotenv.config()
}

var knex = require('knex')({
  client: 'mysql',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    charset: 'UTF8'
  }
})

var Bookshelf = require('bookshelf')(knex)
var bookshelf = Bookshelf

knex.schema.createTableIfNotExists('schools', function (table) {
  table.increments('ID').primary()
  table.string('name')
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
  table.integer('sid')
}).then(function () {
  knex.schema.table('events', function (table) {
    table.foreign('sid').references('schools.ID')
  })
  console.log('events schema created.')
})

knex.schema.createTableIfNotExists('students', function (table) {
  table.increments('ID').primary()
  table.string('name')
  table.string('email')
  table.string('studentid')
  table.string('password')
  table.integer('phonenum')
  table.integer('url')
  table.integer('longitude')
  table.integer('latitude')
  table.integer('sid')
  table.boolean('waitness')
}).then(function () {
  knex.schema.table('students', function (table) {
    table.foreign('sid').references('schools.ID')
  })
  console.log('students schema created.')
})

knex.schema.createTableIfNotExists('studentsevents', function (table) {
  table.increments('ID').primary()
  table.integer('created_by')
  table.integer('eid')
}).then(function () {
  knex.schema.table('studentsevents', function (table) {
    table.foreign('created_by').references('students.ID')
    table.foreign('eid').references('events.ID')
  })
  console.log('studentsevents schema created.')
})

knex.schema.createTableIfNotExists('schoolstudentevents', function (table) {
  table.increments('ID').primary()
  table.integer('studenteventsid')
  table.integer('sid')
}).then(function () {
  knex.schema.table('schoolstudentevents', function (table) {
    table.foreign('studenteventsid').references('studentsevents.ID')
    table.foreign('sid').references('schools.ID')
  })
  console.log('schoolstudentevents schema created.')
})

// knex.schema.createTableIfNotExists('officers', function (table) {
//   table.increments('ID').primary()
//   table.string('name')
//   table.string('available')
//   table.string('badgenumber')
//   table.timestamp('patchtime')
//   table.timestamp('returntime').defaultTo(knex.fn.now())
//   table.integer('sid')
// }).then(function () {
//   knex.schema.table('officers', function (table) {
//     table.foreign('sid').references('schools.ID')
//   })
//   console.log('officers schema created.')
// })

// knex.schema.createTableIfNotExists('officerevents', function (table) {
//   table.increments('ID').primary()
//   table.integer('oid')
//   table.integer('eid')
// }).then(function () {
//   knex.schema.table('officerevents', function (table) {
//     table.foreign('oid').references('officers.ID')
//     table.foreign('eid').references('events.ID')
//   })
//   console.log('officerevents schema created.')
// })

// var Schools = bookshelf.Model.extend({
//   tableName: 'schools',
//   students: function () {
//     return this.hasMany(students)
//   },
//   officers: function () {
//     return this.hasMany(officers)
//   }
// })

// var Events = bookshelf.Model.extend({
//   tableName: 'events',
//   students: function () {
//     return this.belongsToMany(students)
//   },
//   officers: function () {
//     return this.belongsToMany(officers)
//   }
// })

// var Students = bookshelf.Model.extend({
//   tableName: 'students',
//   schools: function () {
//     return this.belongsTo(schools)
//   },
//   events: function () {
//     return this.belongsToMany(events)
//   }
// })

// var Officers = bookshelf.Model.extend({
//   tableName: 'officers',
//   schools: function () {
//     return this.belongsTo(schools)
//   },
//   events: function () {
//     return this.belongsToMany(events)
//   }
// })

// Schools()
// Events()
// Students()
// Officers()

module.exports = {
  knex: knex,
  bookshelf: bookshelf
}
