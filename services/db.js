const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/employee_reg', {
    useNewUrlParser:true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
});

// const AutoIncrement = require('mongoose-sequence')(mongoose);

var autoincrement = require('simple-mongoose-autoincrement');

const userSchema = mongoose.Schema({
   username: String,
   password: String,
   empid: String,
   name: String,
   emailid: String,
   phone: Number,
   designation: String,
   address: String
  }, { timestamps: true });

userSchema.plugin(autoincrement, {field: 'id'});

const User = mongoose.model('User', userSchema);

module.exports = {
   User
}
