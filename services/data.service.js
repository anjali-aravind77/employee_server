
const { User } = require('./db');
const db = require('./db');

const employeeregister = (username,password,empid,name,emailid,phone,designation,address) => {
    return db.User.findOne({
      empid
    })
    .then(user => {
      // console.log(user);
      if(user) {
        return {
          status: false,
          statusCode: 422,
          message: "account already exists"
        }
      }
      const newUser = new db.User({
        username,password,empid,name,emailid,phone,designation,address
      });
      newUser.save();
      return {
        success: true,
        data: {
          "log_id" : 1,
          "emp_id" : newUser.empid,
          "emp_name" : newUser.username,
          "emp_email" : newUser.emailid,
          "emp_phone" : newUser.phone,
          "emp_designation" : newUser.designation,
          "emp_address" : newUser.address,
          "emp_status" : 1
        },
        statusCode: 200,
        message: "employee created succesfully"
      }
    });
}
let currentUser;
const login = (req, username, password) => {
    return db.User.findOne({
     username, password
    })
    .then(user => {
    //  console.log(user)
      if(user) {   
        //  console.log(user)

         req.session.currentUser = user.empid;
        //  console.log( req.session.currentUser);
        return {
          status: true,
          statusCode: 200,
          message: "logged in sucesfully"
        }
      
      }
      return {
        status: false,
        statusCode: 422,
        message: "invalid username or pasword"
      }
    });   
}

const logout = (req) => {
  return db.User.findOne({
    empid
  })
  .then (user => {
    if(user) {
    req.User.deleteToken(user.empid, (err, user) => {
      return {
        success: true,
        data: 1,
        message: "logout succesfully"
      }
    })
  }
  })
 
    
} 

module.exports = {
  employeeregister,
    login,
    logout
}