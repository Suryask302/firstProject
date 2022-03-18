


const AuthorModel= require("../models/AuthorModel")
const jwt = require("jsonwebtoken")
const validate = require("validator")

const createAuthor = async function (req,res) {
try{
    
    let user = req.body
    if(Object.keys(user).length !== 0){

        let userCreated = await AuthorModel.create(user)
        res.send({data: userCreated})

    }else { res.status(400).send( { msg : "Please Add Some Content " } )}
    
    
}catch(err){res.status(500).send( { msg : err.message } )}
}



////   login_Part   ////

const loginAuthor = async function (req, res) {


try {

    let userName = req.body.email;
    let password = req.body.password;

    if( !userName || !password ){

      return res.status(400).send( {status : false , msg : "Please Enter Email And Password" } )
    }

    if(!validate.isEmail(userName)){
      return res.status(400).send( { status : false , msg : "Invalid Email" } )
    }
  
    let Author = await AuthorModel.findOne( {$and :[{ email: userName, password: password }] });
  
    if (!Author)
      return res.status(404).send( { status: false, msg: "Author Not Found , plz check Credintials",} );
  
  
      let token = jwt.sign(
      {
        authorId: Author._id.toString(),
        groupno: "42"
      },
      "this-is-aSecretTokenForLogin"
    );
    res.setHeader("x-api-key", token);
    res.status(201).send({ status: true, data: token });


  
} catch (error) {
  return res.status(500).send( { Err : error.message } )
}
    
};


module.exports.createAuthor = createAuthor
module.exports.loginAuthor = loginAuthor
