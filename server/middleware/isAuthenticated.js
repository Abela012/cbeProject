import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  const authHeader =
    req.headers["authorization"] || req.headers["Authorization"];
  // console.log(authHeader);
  if (!authHeader) return res.sendStatus(401);

  const token = authHeader.split(" ")[1];
  const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  if (!verified) return res.sendStatus(403);

  req.user = verified;
  req.roles = verified?.roleType;
  next();
};

export default isAuthenticated;
