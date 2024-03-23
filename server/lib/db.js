const DB = class DB {
  constructor() {}

  static localStorage = [];

  static write(data) {
    console.log(`writing ${JSON.stringify(data)}`);
  }

  static findOne(id) {}

  static findByEmail(email) {}
};

module.exports = DB;
