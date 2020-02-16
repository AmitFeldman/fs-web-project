import {Router} from 'express';
import Comment from '../../models/Comment';
import Post from '../../models/Post';

const router = new Router();

// POST api/comments/create
router.post('/create', (req, res) => {
  const {authorId, postId, comment} = req.body;

  const newComment = new Comment({
    author: authorId,
    post: postId,
    comment,
  });

  newComment
    .save()
    .then(comment => {
      Post.updateOne(
        {_id: postId},
        {$push: {comments: [comment._id]}}
      ).then(() => res.json(comment));
    })
    .catch(err => console.log(err.message));
});

export default router;
