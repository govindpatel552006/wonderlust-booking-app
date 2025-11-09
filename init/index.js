const mongoose = require("mongoose");
const initData = require("./data");
const Listing = require("../models/listing");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

const main = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("MongoDB Connected ✅");

    await Listing.deleteMany({});
    console.log("Old listings deleted 🗑️");

    const updatedData = initData.data.map((obj) => ({
      ...obj,
      owner: "68cd641216b772d23a496217", 
    }));

    await Listing.insertMany(updatedData);
    console.log("Database initialized with new data 🚀");
  } catch (err) {
    console.error("Error initializing data:", err);
  } finally {
    mongoose.connection.close();
  }
};

main();
