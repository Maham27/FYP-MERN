var jwt = require("jsonwebtoken");
const JWT_SECRET = "LAWYERSERVICES";

const fetchuser = (req, res, next) => {
  // Get the user from jwt tokken and add id to req object
  const token = req.header("auth-token");
  if (!token) {
    return res
      .status(401)
      .send({ error: "Please authenticate using valid token" });
  }
  try {
    const isCustomAuth = token.length < 500;

    if (token && isCustomAuth) {
      //custom and facebook tokens. fb token is also generated customly
      const data = jwt.verify(token, JWT_SECRET);
      req.userId = data.user.id;
      next();
    } else {
      // google oauth
      let decodedData = jwt.decode(token);
      console.log("decode data>", decodedData);
      req.userId = decodedData?.sub;

      next();
    }
  } catch (error) {
    return res
      .status(401)
      .send({ error: "Please authenticate using valid token" });
  }
};

module.exports = fetchuser;
