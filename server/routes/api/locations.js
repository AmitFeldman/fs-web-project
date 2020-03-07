import {Router} from 'express';
import Location from '../../models/Location';

const router = new Router();

// GET api/locations
router.get('', (req, res) => {
  Location.find().then(locations => res.json(locations));
});

export default router;
