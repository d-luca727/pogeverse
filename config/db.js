const mongoose = require("mongoose");

connectDB = async () => {
  await mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log("MongoDB server connected");
};

module.exports = connectDB;
