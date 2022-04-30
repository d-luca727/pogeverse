const dotenv = require("dotenv");
dotenv.config();
const path = require("path");
const express = require("express");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");

connectDB();

const app = express();

app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/private", require("./routes/private"));
app.use("/api/trade", require("./routes/trade"));
app.use("/api/leaderboard", require("./routes/leaderboard"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("api running");
  });
}
//error handler; has to be the last piece of middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>
  console.log(`Server running on ${PORT} port`)
);

process.on("unhandledRejection", (err, promise) => {
  console.log("Logged Error: " + err);
  server.close(() => process.exit(1));
});
