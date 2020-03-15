import mongoose from 'mongoose';
import {Router} from 'express';
import Post from '../../models/Post';
import User from '../../models/User';
import {isIdValid} from '../../utils/validation';
import {isLoggedIn} from '../../middlewares/auth';

const router = new Router();

// GET api/posts
router.get('', (req, res) => {
  Post.aggregate([
    {
      $lookup: {
        from: User.collection.name,
        localField: 'author',
        foreignField: '_id',
        as: 'author',
      },
    },
    {$unwind: {path: '$author', preserveNullAndEmptyArrays: true}},
    {$sort: {date: -1}},
  ])
    .then(result => {
      res.json(result);
    })
    .catch(err => console.log(err));
});

// GET api/posts/stats-days
router.get('/stats-days', (req, res) => {
  Post.aggregate([
    {
      $group: {
        _id: {$dateToString: {format: '%Y-%m-%d', date: '$date'}},
        count: {$sum: 1},
      },
    },
    {
      $sort: {_id: 1},
    },
    {
      $project: {
        _id: 0,
        date: '$_id',
        count: 1,
      },
    },
  ])
    .then(result => {
      res.json(result);
    })
    .catch(err => console.log(err));
});

// GET api/posts/recommended
router.get('/recommended', isLoggedIn, (req, res) => {
  const {_id} = req.user;
  const userId = mongoose.Types.ObjectId(_id);

  Post.aggregate([
    {
      $match: {
        $and: [{likes: userId}, {author: {$ne: userId}}],
      },
    },
    {$group: {_id: '$author', count: {$sum: 1}}},
    {
      $lookup: {
        from: Post.collection.name,
        localField: '_id',
        foreignField: 'author',
        as: 'post',
      },
    },
    {$unwind: {path: '$post'}},
    {$replaceRoot: {newRoot: {$mergeObjects: [{count: '$count'}, '$post']}}},
    {
      $lookup: {
        from: User.collection.name,
        localField: 'author',
        foreignField: '_id',
        as: 'author',
      },
    },
    {$unwind: {path: '$author'}},
    {$sort: {count: -1, date: -1}},
    {$project: {count: 0}},
  ]).exec((err, posts) => {
    if (err) return console.log(err);

    res.json(posts);
  });
});

// Get post by post id
// GET api/posts/id/:id
router.get('/id/:id', (req, res) => {
  const {id} = req.params;

  if (!isIdValid(id))
    return res.status(400).send({error: {msg: 'Id not valid'}});

  Post.aggregate([
    {$match: {_id: mongoose.Types.ObjectId(id)}},
    {
      $lookup: {
        from: User.collection.name,
        localField: 'author',
        foreignField: '_id',
        as: 'author',
      },
    },
    {$unwind: {path: '$author', preserveNullAndEmptyArrays: true}},
  ])
    .then(result => {
      // Aggregate returns array, but this query can only return one document
      // because of match stage by id
      res.json(result[0]);
    })
    .catch(err => console.log(err));
});

// Get all posts by user id
// GET api/posts/userId/:userId
router.get('/user/:userId', (req, res) => {
  const {userId} = req.params;

  if (!isIdValid(userId))
    return res.status(400).send({error: {msg: 'Id not valid'}});

  Post.aggregate([
    {$match: {author: mongoose.Types.ObjectId(userId)}},
    {
      $lookup: {
        from: User.collection.name,
        localField: 'author',
        foreignField: '_id',
        as: 'author',
      },
    },
    {$unwind: {path: '$author', preserveNullAndEmptyArrays: true}},
  ])
    .then(result => {
      res.json(result);
    })
    .catch(err => console.log(err));
});

// GET /api/posts/stats-likes
router.get('/stats-users', (req, res) => {
  Post.aggregate([
    {
      $group: {
        _id: '$author',
        postCount: {$sum: 1},
        likes: {$sum: {$size: '$likes'}},
      },
    },
    {
      $addFields: {
        key: {$concat: [{$toString: '$likes'}, '-', {$toString: '$postCount'}]},
      },
    },
    {
      $group: {
        _id: '$key',
        userCount: {$sum: 1},
        likes: {$first: '$likes'},
        postCount: {$first: '$postCount'},
      },
    },
  ])
    .then(result => {
      res.json(result);
    })
    .catch(err => console.log(err));
});

// POST api/posts/create
router.post('/create', isLoggedIn, (req, res) => {
  const {title, body} = req.body;
  const {_id} = req.user;

  if (!_id || !isIdValid(_id) || !title || !body)
    return res.status(400).send({error: {msg: 'Not all information sent'}});

  const newPost = new Post({
    author: _id,
    title,
    body,
  });

  newPost
    .save()
    .then(post => res.json(post))
    .catch(err => console.log(err.message));
});

router.put('/like', isLoggedIn, (req, res) => {
  const {postId} = req.body;
  const {_id} = req.user;

  if (!postId || !isIdValid(postId))
    return res.status(400).send({error: {msg: 'Not all information sent'}});

  Post.findById(postId).then(post => {
    if (post.likes.includes(_id)) {
      return res.status(400).send({error: {msg: 'Already liked post'}});
    }

    post.likes.push(_id);
    post
      .save()
      .then(post => res.json(post))
      .catch(err => console.log(err.message));
  });
});

router.put('/unlike', isLoggedIn, (req, res) => {
  const {postId} = req.body;
  const {_id} = req.user;

  if (!postId || !isIdValid(postId))
    return res.status(400).send({error: {msg: 'Not all information sent'}});

  Post.findById(postId).then(post => {
    const index = post.likes.indexOf(_id);
    if (index === -1) {
      return res.status(400).send({error: {msg: 'User did not like post'}});
    }

    post.likes.splice(index, 1);

    post
      .save()
      .then(post => res.json(post))
      .catch(err => console.log(err.message));
  });
});

export default router;
