const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const connectDB = require("./config/db");

connectDB();

const app = express();

app.use(express.json());

app.use("/api/auth", require("./routes/auth"));

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>
  console.log(`Server running on ${PORT} port`)
);

process.on("unhandledRejection", (err, promise) => {
  console.log("Logged Error: " + err);
  server.close(() => process.exit(1));
});
