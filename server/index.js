const express = require("express");
const { config } = require("dotenv");
const createQuery = require("./database/mybatis");
const Transaction = require("./database/transaction");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

const app = express();

config();

app.use(express.json());

app.use("/users", require("./routes/user"));

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
