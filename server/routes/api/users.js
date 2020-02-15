import {Router} from 'express';
import User from '../../models/User';

const router = new Router();

// GET api/users/id/:id
router.get('/id/:id', (req, res) => {
  const {id} = req.params;

  User.findById(id).then(user => {
    if (!user) {
      return res.status(404).json({error: 'User not found'});
    }

    res.json(user);
  });
});

// POST api/users/register
router.post('/register', (req, res) => {
  const {username, email, password} = req.body;

  User.findOne({email}).then(user => {
    if (user) {
      return res.status(400).json({error: 'Email already exists'});
    }

    const newUser = new User({
      username,
      email,
      password,
      isAdmin: false,
    });

    newUser
      .save()
      .then(user => res.json(user))
      .catch(err => console.log(err.message));
  });
});

// POST api/users/login
router.post('/login', (req, res) => {
  const {email, password} = req.body;

  User.findOne({email, password}).then(user => {
    if (!user) {
      return res.status(404).json({error: 'User not found'});
    }

    res.json(user);
  });
});

export default router;
