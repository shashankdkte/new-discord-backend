const User = require("../../models/user");

 const postInvite = async (req, res) => {
   const { targetMailAddress } = req.body;
   
   const { userId, mail } = req.user;

   //check fi friend that we would like to invite is not user
   if (mail.toLowerCase() === targetMailAddress.toLowerCase())
   {
     return res.status(409).send("Sorry , You cannot become friends with yourself");
   }
   const targetUser = await User.findOne({
     mail: targetMailAddress.toLowerCase()
   });

   if (!targetUser)
   {
     res.status(404).send(`Friend of ${targetMailAddress} has not been found. Please check mail address`);
   }

   //Check if email has already been sent
  return res.send("Controller is Working")
}

module.exports = postInvite