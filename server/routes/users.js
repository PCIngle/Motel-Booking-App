const express=require('express');
const {updateUser,deleteUser,getUser,getUsers} = require("../controllers/user")
const {verifyAdmin, verifyUser}   = require('../utils/verifyTokens');

const router = express.Router();


 //UPDATE
 router.put("/:id",verifyUser, updateUser)

 //DELETE
 router.delete("/:id",verifyUser, deleteUser)
 //router.delete("/:id",a, deleteUser)

 //GET
 router.get("/:id",verifyUser, getUser)

 //GET ALL  
 router.get("/",verifyAdmin, getUsers)

module.exports=router;