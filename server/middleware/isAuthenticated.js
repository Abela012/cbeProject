import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  const authHeader =
    req.headers["authorization"] || req.headers["Authorization"];
  // console.log(authHeader);
  if (!authHeader) return res.sendStatus(401);

  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);
    req.user = decoded;
    req.roles = decoded?.roleType;
    next();
  });
};

export default isAuthenticated;
