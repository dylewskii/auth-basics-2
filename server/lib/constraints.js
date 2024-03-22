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
};

module.exports = constraints;
