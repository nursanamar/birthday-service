'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db) {
  return db.createTable('user', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    firstName: 'string',
    lastName: 'string',
    date: 'date',
    country: 'string',
    sent: {
      type: "int",
      notNull: false,
      defaultValue: null
    }
  });
};

exports.down = function (db) {
  return db.dropTable('user');;
};

exports._meta = {
  "version": 1
};
