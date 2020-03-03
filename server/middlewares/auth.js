import User from "../models/User";
import {isIdValid} from "../utils/validation";

// Take token from request and parse it to the user who sent the request
// This middleware is applied to all requests
const parseToken = (req, res, next) => {
  const id = req.headers.token;

  if (isIdValid(id)) {
    User.findById(id).then(user => {
      req.user = user;
    }).finally(() => {
      next();
    });
  } else {
    next();
  }
};

const isAdmin = (req, res, next) => {
  const {user} = req;
  const isUserAdmin =  user && user.isAdmin;

  if (!isUserAdmin) {
    return res.status(401).json({error: 'User is not an admin'});
  }

  next();
};

export {parseToken};
