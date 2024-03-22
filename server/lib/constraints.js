let constraints = {};

constraints.name = () => {
  const regex = "[-'A-Za-z0-9 ]+";
  const constraints = {
    presence: {
      allowEmpty: false,
    },
    type: "string",
    format: {
      pattern: regex,
      flags: "i",
      message: `name must match following pattern ${regex}`,
    },
  };
  return constraints;
};

constraints.email = () => {
  const constraints = {
    presence: {
      allowEmpty: false,
    },
    type: "string",
    email: "true",
  };

  return constraints;
};

constraints.password = () => {
  const constraints = {
    presence: {
      allowEmpty: false,
    },
    length: {
      minimum: 6,
    },
  };

  return constraints;
};

module.exports = constraints;
