const mongoose = require('mongoose');

exports.connect = async() => {
  try {
    await mongoose.connect(process.env.DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('database connected successfully');
  } catch (error) {
   console.log(error); 
  }
}