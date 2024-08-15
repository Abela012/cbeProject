const verifyRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req?.roles) return res.sendStatus(401);
    console.log(req.roles);
    const rolesArray = [...allowedRoles];
    const result = req.roles
      .map((role) => rolesArray.includes(role))
      .find((val) => val == true);
    console.log(result, req.roles, allowedRoles);

    if (!result) return res.sendStatus(401);
    next();
  };
};

export default verifyRole;
