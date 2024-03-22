const { v4: uuidv4 } = uuid();
const validate = require("validate.js");
const constraints = require("../lib/constraints");

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
    console.log(`saved user under id: ${this.id}`);
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
        this.name.firstName = firstName;
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
        this.name.lastName = lastName;
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

  setPassword = (password) => {
    try {
      let msg = validate.single(password, constraints.password);
      if (msg) {
        return msg;
      } else {
        this.security.passwordHash = ""; // hash pass
      }
    } catch (error) {
      throw new Error(error);
    }
  };
};

module.exports = _;
