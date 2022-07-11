const createQuery = require("../database/mybatis");
const Transaction = require("../database/transaction");

exports.getUsers = async (req, res) => {
  const transaction = new Transaction();

  try {
    const connection = await transaction.start();

    const [data] = await connection.query(createQuery("users", "getUsers", {}));

    await transaction.end();

    return res.json(data);
  } catch (error) {
    // ReadOnly
    // await transaction.error(error);
    return res.status(500).json({ message: error.message });
  } finally {
    transaction.release();
  }
};

exports.createUser = async (req, res) => {
  const { name, email, password } = req.body;

  const transaction = new Transaction();

  try {
    const connection = await transaction.start();

    const params = {
      name,
      email,
      password,
    };

    await connection.query(createQuery("users", "createUser", params));

    await transaction.end();

    return res.status(201).json({
      name,
      email,
    });
  } catch (error) {
    // Write - Rollback
    await transaction.error(error);
    return res.status(500).json({ message: error.message });
  } finally {
    transaction.release();
  }
};
