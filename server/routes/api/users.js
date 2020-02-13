import {Router} from 'express';
import User from '../../models/User';

const router = new Router();

// POST api/users/register
router.post('/register', (req, res) => {
  // TODO: Register logic
});

// POST api/users/login
router.post('/login', (req, res) => {
  // TODO: Login logic
});

export default router;
