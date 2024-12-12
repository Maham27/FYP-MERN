const mongoose = require("mongoose");

const mongoURI = "mongodb+srv://maham27:12345@cluster0.7libf.mongodb.net/?retryWrites=true&w=majority";
  const connectToMongo = () => {
  //mongoose.connect(mongoURI).catch((error) => console.log(error));

  mongoose
    .connect(mongoURI, () => {
      console.log("connected to mongoDB");
    })
    .catch((err) => console.log(err, "prrr"));
  // mongoose.connect("", {
  //   useNewUrlParser: true, // Boilerplate for Mongoose 5.x
  // });
  // mongoose.connection.on("connected", () => console.log("Connected"));
  // mongoose.connection.on("error", (err) =>
  //   console.log("Connection failed with - ", err)
  // );
};

module.exports = connectToMongo;
