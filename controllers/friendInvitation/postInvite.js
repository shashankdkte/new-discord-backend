 const postInvite = async (req, res) => {
  const { targetMailAddress } = req.body;
  return res.send("Controller is Working")
}

module.exports = postInvite