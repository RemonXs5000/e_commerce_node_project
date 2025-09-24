import jwt from "jsonwebtoken";
import { promisify } from "util";

// a middleware that check user identity(registered / unregistered)
export const authentication = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res
        .status(401)
        .json({ status: "You are not Authenticated , please Login First" });
    }

    const decoded = promisify(jwt.verify)(
      authorization,
      process.env.PRIVATE_KEY
    );
    // sending back the current logged user
    console.log(decoded);
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({
      status: "Invalid or expired token, Check credentials and Login again",
    });
  }
};
