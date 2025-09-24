import jwt from "jsonwebtoken";
import { promisify } from "util";

// a middleware that check user identity(registered / unregistered)
export const authentication = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res
        .status(401)
        .json({ status: "You are not Authenticated , please Login First" });
    }

    const decoded = await promisify(jwt.verify)(
      authorization,
      process.env.PRIVATE_KEY
    );
    // sending back the current logged user
    req.currentuser = decoded;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({
      status: "Invalid or expired token, Check credentials and Login again",
    });
  }
};

// a middleware that check user authorized actions
export const authorized = (...roles) => {
  return (req, res, next) => {
    const { role } = req.currentuser;
    // return if the user are't allowed to perform certain action
    if (!roles.includes(role)) {
      return res.status(401).json({
        status: "failed",
        message: "you are't authorized to perform this action",
      });
    }
    next();
  };
};
