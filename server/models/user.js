const { v4: uuidv4 } = require("uuid");
const validate = require("validate.js");
const constraints = require("../lib/constraints");
const bcrypt = require("bcrypt");
const DB = require("../lib/db");

const _ = class User {
  constructor() {
    this.created = new Date();
    this.id = uuidv4();
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

  // save user to db
  save() {
    // console.log(`saved user under id: ${this.id}`);
    DB.write({ data: "Hello world" });
  }

  // find user with given id
  find(id) {
    return "";
  }

  setFirstName(firstName) {
    try {
      if (firstName) {
        // sanitize (match multiple spaces and replace with a single space)
        firstName = firstName.trim().replace(/  +/g, "");
      }

      let msg = validate.single(firstName, constraints.name);

      if (msg) {
        return msg;
      } else {
        this.name.first = firstName;
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  setLastName(lastName) {
    try {
      if (lastName) {
        lastName = lastName.trim().replace(/  +/g, "");
      }

      let msg = validate.single(lastName, constraints.name);

      if (msg) {
        return msg;
      } else {
        this.name.last = lastName;
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  setEmail(email) {
    try {
      let msg = validate.single(email, constraints.email);
      if (msg) {
        return msg;
      } else {
        this.email = email;
        return;
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async setPassword(password) {
    try {
      let msg = validate.single(password, constraints.password);
      if (msg) {
        return msg;
      } else {
        this.security.passwordHash = await bcrypt.hash(password, 10);
        return;
      }
    } catch (error) {
      throw new Error(error);
    }
  }
};

module.exports = _;
