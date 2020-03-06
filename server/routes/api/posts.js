import mongoose from 'mongoose';
import {Router} from 'express';
import Post from '../../models/Post';
import {isIdValid} from '../../utils/validation';
import {isLoggedIn} from '../../middlewares/auth';
import {onNewPost} from '../../utils/changes-listener';

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
    .then(post => {
      onNewPost(post);
      return res.json(post);
    })
    .catch(err => console.log(err.message));
});

// PUT api/posts/update
router.put('/update', (req, res) => {
  const {postId, title, body} = req.body;

  Post.findById(postId).then(post => {
    if (!post) {
      return res.status(404).json({error: 'Post not found'});
    }

    if (title) post.title = title;
    if (body) post.body = body;

    post
      .save()
      .then(post => res.json(post))
      .catch(err => console.log(err.message));
  });
});

// POST api/posts/delete
router.delete('/delete', (req, res) => {
  const {postId} = req.body;

  Post.findByIdAndDelete(postId)
    .then(() => res.json({message: 'Post successfully deleted'}))
    .catch(err => console.log(err.message));
});

export default router;
