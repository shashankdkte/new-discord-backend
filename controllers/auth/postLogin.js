const User = require("../../models/user")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const postLogin = async (req, res) => {
  
  try
  {
    //get values from body
    const { mail, password } = req.body;
    //find user
    const user = await User.findOne({ mail: mail.toLowerCase() });

    //compare password
    if (user && (await bcrypt.compare(password, user.password)))
    {
      
      //generate token
    
  const token = jwt.sign({
    userId: user._id,
    mail,
  },
    process.env.TOKEN_KEY,
    {
      expiresIn:"24h"
    }
  )
      return res.status(200).send({
        userDetails: {
          mail: user.mail,
          token,
          username:user.username
        }
      })
  }
  return res.status(400).send("Invalid credentials.Please try again");
  } catch (error) {
   return  res.status(500).send("Something went wrong , Please try again.");
  }
}

module.exports = postLogin