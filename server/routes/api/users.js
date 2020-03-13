import {Router} from 'express';
import User from '../../models/User';
import {isIdValid} from '../../utils/validation';
import {isAdmin} from '../../middlewares/auth';

const Errors = {
  USER_NOT_FOUND: 1,
  USERNAME_EXIST: 2,
  EMAIL_EXIST: 3,
};

const router = new Router();

// GET api/users/me
router.get('/me', (req, res) => {
  const {user} = req;

  if (!user) {
    return res.status(404).send({error: {msg: 'User not found'}});
  }

  res.json(user);
});

// GET api/users/username/:username
router.get('/username/:username', (req, res) => {
  const {username} = req.params;

  if (!username)
    return res.status(400).send({error: {msg: 'Not all information sent'}});

  User.findOne({username}).then(user => {
    if (!user) {
      return res.status(404).send({error: {msg: 'User not found'}});
    }

    res.json(user);
  });
});

// POST api/users/register
router.post('/register', async (req, res) => {
  const {username, email, password} = req.body;

  if (!username || !password || !email)
    return res.status(400).send({error: {msg: 'Not all information sent'}});

  const existingUsername = await User.findOne({username});
  if (existingUsername)
    return res.status(400).send({
      error: {code: Errors.USERNAME_EXIST, msg: 'Username already in use'},
    });

  const existingEmail = await User.findOne({email});
  if (existingEmail)
    return res
      .status(400)
      .send({error: {code: Errors.EMAIL_EXIST, msg: 'Email already in use'}});

  const newUser = new User({
    username,
    password,
    email,
    isAdmin: false,
  });

  newUser
    .save()
    .then(user => res.json(user))
    .catch(err => console.log(err.message));
});

// POST api/users/login
router.post('/login', (req, res) => {
  const {username, password} = req.body;

  if (!username || !password)
    return res.status(400).send({error: {msg: 'Not all information sent'}});

  User.findOne({username, password}).then(user => {
    if (!user) {
      return res
        .status(404)
        .send({error: {code: Errors.USER_NOT_FOUND, msg: 'User not found'}});
    }

    res.json(user);
  });
});

// POST api/users
router.post('', (req, res) => {
  const {usernameFilter, emailFilter, isAdminFilter} = req.body;

  const matchers = [];

  if (usernameFilter) {
    matchers.push({username: {$regex: `.*${usernameFilter}.*`}});
  }

  if (emailFilter) {
    matchers.push({email: {$regex: `.*${emailFilter}.*`}});
  }

  if (isAdminFilter !== undefined) {
    matchers.push({isAdmin: isAdminFilter});
  }

  const pipeline = [{$sort: {date: -1}}];
  if (matchers.length > 0) pipeline.unshift({$match: {$and: matchers}});

  User.aggregate(pipeline).exec((err, result) => {
    if (err) console.log(err);
    res.json(result);
  });
});

// PUT api/users/update
router.put('/update', isAdmin, (req, res) => {
  const {userId, username, email, isAdmin} = req.body;

  if (!userId || !isIdValid(userId))
    return res.status(400).send({error: 'Not all information sent'});

  User.findById(userId).then(user => {
    if (username && user.username !== username) {
      user.username = username;
    }

    if (email && user.email !== email) {
      user.email = email;
    }

    if (isAdmin !== undefined && user.isAdmin !== isAdmin) {
      user.isAdmin = isAdmin;
    }

    user
      .save()
      .then(user => res.json(user))
      .catch(err => console.log(err.message));
  });
});

// POST api/users/delete
router.delete('/delete', isAdmin, (req, res) => {
  const {userId} = req.body;

  if (!userId || !isIdValid(userId))
    return res.status(400).send({error: 'Not all information sent'});

  User.findByIdAndDelete(userId)
    .then(() => res.json({message: 'User successfully deleted'}))
    .catch(err => console.log(err.message));
});

export default router;
