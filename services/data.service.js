
const db = require('./db');

const register = (username,password,empid,name,emailid,phone,designation,address) => {
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
        status: true,
        statusCode: 200,
        message: "employee created succesfully"
      }
    });
}
const login = (username, password) => {
    return db.User.findOne({
     username, password
    })
    .then(user => {
    //  console.log(user)
      if(user) {
        // req.session.currentUser = accno1;
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
  req.User.deleteToken(req.empid, (err, user) => {
    return {
      message: "logged out succesfully"
    }
  })
    
}
  

module.exports = {
    register,
    login,
    logout
}