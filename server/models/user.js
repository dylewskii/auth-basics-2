let _ = class User {
  constructor() {
    this.created = new Date();
    this.id = "";
    this.name = {
      first: null,
      last: null,
    };
    this.email = null;
    this.security = {
      passwordHash: null,
    };
    this.banned = false;
  }
};

module.exports = _;
