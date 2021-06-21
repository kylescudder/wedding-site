const jwt = require('jsonwebtoken')

const createAccessToken = (user) => {
	return jwt.sign(
		{ userId: user._id },
		process.env.ACCESS_TOKEN_SECRET,
		{
		  expiresIn: "15m",
		}
	  );
}
const createRefreshToken = (user) => {
	return jwt.sign(
		{ userId: user._id, tokenVersion: user.tokenVersion },
		process.env.REFRESH_TOKEN_SECRET,
		{
		  expiresIn: "7d",
		}
	  );
}
module.exports = {
	createAccessToken,
	createRefreshToken
  };