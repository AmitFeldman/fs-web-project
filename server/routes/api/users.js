import {Router} from 'express';
import User from '../../models/User';

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

export default router;
