import jwt from "jsonwebtoken";

export default (req: any, res: any, next: any) => {
  const token = req.headers["x-auth-token"];
  if (!token || token === "") {
    req.isAuth = false;
    return next();
  }
  let decodedToken: string | jwt.JwtPayload;
  const jwt_secret = process.env.JWT_SECRET || "default_key";
  try {
    decodedToken = jwt.verify(token, jwt_secret);

    if (typeof decodedToken === "string") {
      req.isAuth = false;
      return next();
    }
  } catch (err) {
    req.isAuth = false;
    return next();
  }
  req.isAuth = true;
  req.appRoles = decodedToken.appRoles;
  req.userId = decodedToken.userId;
  next();
};
