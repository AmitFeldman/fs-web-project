import mongoose from 'mongoose';
import {Router} from 'express';
import Post from '../../models/Post';
import User from '../../models/User';
import {isIdValid} from '../../utils/validation';
import {isLoggedIn} from '../../middlewares/auth';

const router = new Router();

// GET api/posts
router.get('', (req, res) => {
  Post.find()
    .populate('author')
    .exec((err, posts) => {
      if (err) return console.log(err);

      res.json(posts);
    });
});

// GET api/posts/ids
router.post('/ids', (req, res) => {
  const {ids = []} = req.body;

  const mappedIds = ids.map(id => mongoose.Types.ObjectId(id));

  Post.find({
    _id: {$in: mappedIds},
  })
    .populate('author')
    .exec((err, posts) => {
      if (err) return console.log(err);

      res.json(posts);
    });
});

// GET api/posts/recommended/:userId
router.get('/recommended/:userId', (req, res) => {
  const {userId} = req.params;

  Post.aggregate([
    {$match: {likes: {$elemMatch: {$eq: mongoose.Types.ObjectId(userId)}}}},
    {$group : {_id: "$author"}},
    {$lookup: {
        from: Post.collection.name,
        localField: '_id',
        foreignField: 'author',
        as: 'post'
      }},
    {$unwind: {path: '$post'}},
    {$replaceRoot:{newRoot: "$post"}},
    {$lookup: {
        from: User.collection.name,
        localField: 'author',
        foreignField: '_id',
        as: 'author'
      }},
    {$unwind: {path: '$author'}},
  ])
    .exec((err, posts) => {
      if (err) return console.log(err);

      res.json(posts);
    });
});

// GET api/posts/id/:id
router.get('/id/:id', (req, res) => {
  const {id} = req.params;

  if (!isIdValid(id)) return res.status(400).send({error: 'Id not valid'});

  const cursor = Post.findById(id);

  cursor.then(post => {
    if (!post) {
      return res.status(404).json({error: 'Post not found'});
    }

    cursor
      .populate('comments')
      .populate({
        path: 'comments',
        populate: {path: 'author'},
      })
      .populate('author')
      .exec((err, post) => {
        if (err) return console.log(err);

        res.json(post);
      });
  });
});

// POST api/posts/create
router.post('/create', isLoggedIn, (req, res) => {
  const {title, body} = req.body;
  const {_id} = req.user;

  if (!_id || !isIdValid(_id) || !title || !body)
    return res.status(400).send({error: 'Not all information sent'});

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
    return res.status(400).send({error: 'Not all information sent'});

  Post.findById(postId).then(post => {
    if (post.likes.includes(_id)) {
      return res.status(400).json({error: 'Already liked post'});
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
    return res.status(400).send({error: 'Not all information sent'});

  Post.findById(postId).then(post => {
    const index = post.likes.indexOf(_id);
    if (index === -1) {
      return res.status(400).json({error: 'User did not like post'});
    }

    post.likes.splice(index, 1);

    post
      .save()
      .then(post => res.json(post))
      .catch(err => console.log(err.message));
  });
});

// PUT api/posts/update
// router.put('/update', (req, res) => {
//   const {postId, title, body} = req.body;
//
//   Post.findById(postId).then(post => {
//     if (!post) {
//       return res.status(404).json({error: 'Post not found'});
//     }
//
//     if (title) post.title = title;
//     if (body) post.body = body;
//
//     post
//       .save()
//       .then(post => res.json(post))
//       .catch(err => console.log(err.message));
//   });
// });

// POST api/posts/delete
// router.delete('/delete', (req, res) => {
//   const {postId} = req.body;
//
//   Post.findByIdAndDelete(postId)
//     .then(() => res.json({message: 'Post successfully deleted'}))
//     .catch(err => console.log(err.message));
// });

export default router;
