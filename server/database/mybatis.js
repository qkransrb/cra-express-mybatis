const path = require("path");
const mybatisMapper = require("mybatis-mapper");

mybatisMapper.createMapper([path.resolve(__dirname, "./mapper/user.xml")]);

const createQuery = (nameSpace, sqlId, params) => {
  return mybatisMapper.getStatement(nameSpace, sqlId, params, {
    language: "sql",
    indent: "  ",
  });
};

module.exports = createQuery;
