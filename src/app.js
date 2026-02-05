const express = require("express");
const connectDB = require("./config/database");

const app = express();
const User = require('./models/user');

app.use(express.json());

// const {adminAuth, userAuth} = require("./middlewares/auth")

// app.get("/", (req, res) => {
//   res.send("Dashboard!!");
// });

// app.get("/test", (req, res) => {
//   res.send("Hello From the Server!!!!!!!!!!!!!!!!!");
// });


// -----------1st case ---------------
// app.use("/users", (req, res) => {
//   console.log("Handling the route user!!!");
//   res.send("Response!!");
// },
//  (req, res) => {
//   console.log("Handling the route user 2!!!");
//   res.send("Response 2!!");
//  }
// )
// -----------------------------------------------------

// -------------------2nd Case -----------------------
// app.use("/users", (req, res, next) => {
//   console.log("Handling the route user!!!");
//   next();
//   res.send("Response!!");
// },
//  (req, res) => {
//   console.log("Handling the route user 2!!!");
//   res.send("Response 2!!");
//  }
// )
// ------------------------------------------------------

// ------------------------Start----------------------------------
// Handle Auth Middleware for all GET, POST, PATCH, etc ...requests
// app.use("/admin", adminAuth);
// // app.use("users", userAuth);

// app.get("/users/data", userAuth,  (req,res) => {
//   res.send("User Data Sent");
// });

// app.post("/users/login", userAuth,  (req,res) => {
//   res.send("User Data Sent");
// });

// app.get("/admin/getAllData", (req,res) => {
//     res.send("Send All Data");
// });

// app.get("/admin/deleteData", (req,res) => {
//     res.send("Delete a User");
// });
// --------------------------End----------------------------

// app.get("/getUserData", (req,res) => {
//   // Logic of DB call and get user data

//   throw new Error('dvnhgd');
//   res.send("User Data Send");
// });

// ---------------------Start---------------------------

// app.get("/getUserData", (req,res) => {
//   try{
// // Logic of DB call and get user data

//   throw new Error('dvnhgd');
//   res.send("User Data Send");
//   }catch(err){
//    res.status(500).send("something went wrong contact to supporting team");
//   }
// });

// app.use("/", (err, req, res, next) => {
//   if(err){
//     res.status(500).send("something went wrong");
//   }
// });

// ------------------End-------------------------------


app.post("/signup", async(req,res) => {

    // console.log(req.body);
    // Creating a new instance of a User Model
    const user = new User(req.body);
    try{
      await user.save();
    res.send("User Added Successfully");
    } catch (err) {
      res.status(400).send("Error saving user:" + err.message);
    } 
});

// GET User by Email
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;

  try{
   const user = await User.findOne({emailId: userEmail});
   if(!user){
    res.status(404).send("User not found");
   } else{
    res.send(user);
   }

  //  const users = await User.find({emailId: userEmail});
  //  if(users.length === 0){
  //   res.status(404).send("User not found");
  //  } else{
  //   res.send(users);
  //  }
  } catch(err){
    res.status(400).send("Something Went Wrong");
  }
})

// Feed API GET: /feed
app.get("/feed", async (req, res) => {
  try{
     const users = await User.find({});
     res.send(users);
  } catch(err){
    res.status(400).send("Something Went Wrong");
  }
});

connectDB().then(() => {
console.log("Database Connection Established");
app.listen(7777, () => {
    console.log("Server is running on port 7777");
});
}).catch(err => {
console.error(" Database connection FAILED");
console.error(err);
})

app.listen(7777, () => {
    console.log("Server is running on port 7777");
});