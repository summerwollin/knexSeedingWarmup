# Knex Seeding Warmup - Fork and clone this repo

Reference: [http://knexjs.org/#Seeds-CLI]('http://knexjs.org/#Seeds-CLI')

* Quick description of seeding:

```
Seeding is needed when you create a database and you want to fill it up with data immediately.
With knex you can generate seed files in a similar way to how you can generate migration files.

Then within those generated seed files you can create insert statements which will be used to add data to populate your tables.
```

## Setup

* Install dependencies and setup knex/pg

```
$ cd knexSeedingWarmup
$ npm install
$ npm install --save pg knex
$ knex init
$ createdb knex-seeding
```

* Change your knexfile.js configuration:

```
module.exports = {

  development: {
    client: 'postgresql',
    connection: 'postgres://localhost/knex-seeding',
    pool: {
      min: 2,
      max: 10
    }
  }

};
```

* Create a migrations file

```
$ knex migrate:make create_seeding
```

* Create a schema like so:

```
exports.up = function(knex, Promise) {
  return knex.schema.createTable('apes', function(table){
    table.increments();
    table.string('type');
  });

};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('apes');
};

```

* Run your migrations

```
$ knex migrate:latest
```

* Now you can create your seed file:

```
$ knex seed:make create_seeds
```

* Now you should have a seeds folder with a file inside of it, replace the code inside of it with this:

```
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries - Only do this if you are ok with losing current data in //the table - if not delete the del() statement
    knex('apes').del(),

    // Inserts seed entries
    knex('apes').insert({id: 1, type: 'gorilla'}),
    knex('apes').insert({id: 2, type: 'bonobo'}),
    knex('apes').insert({id: 3, type: 'orangutan'})
  );
};

```

* Now you will have to add an additional property to your knexfile.js to point to your seeds file:

```
// Update with your config settings.

module.exports = {

  development: {
    client: 'postgresql',
    connection: 'postgres://localhost/knex-seeding',
    pool: {
      min: 2,
      max: 10
    },
    seeds: {
      directory: './seeds/'
    }

  }
};

```

* You should now be able to run your seed file to populate your knex-seeding "apes" table:

```
$ knex seed:run
```

* Use psql to select * from apes; in your knex-seeding database and confirm that the 3 seeds were inserted into your table.

```
$ psql knex-seeding
  select * from apes;
```
* Congratulations you've now seeded a database!
