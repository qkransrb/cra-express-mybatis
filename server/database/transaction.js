const getConnection = require("./index");

class Transaction {
  constructor() {
    this.connection = null;
    this.connected = false;
  }

  start = async () => {
    try {
      this.connection = await getConnection();
      if (this.connection != null) {
        this.connected = true;
        this.connection.beginTransaction();
        return this.connection;
      }
    } catch (error) {
      console.error(`connection - ${error}`);
      throw error;
    }
  };

  end = async () => {
    if (this.connected) {
      await this.connection.commit();
    }
  };

  error = async (error) => {
    if (this.connected) {
      await this.connection.rollback();
    }
  };

  release = async () => {
    if (this.connected) {
      this.connection.release();
      this.connected = false;
    }
  };
}

module.exports = Transaction;
