import {Router} from 'express';
import Post from '../../models/Post';

const router = new Router();

// POST api/posts/create
router.post('/create', (req, res) => {
  const {authorId, title, body} = req.body;

  const newPost = new Post({
    author: authorId,
    title,
    body,
  });

  newPost
    .save()
    .then(user => res.json(user))
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
