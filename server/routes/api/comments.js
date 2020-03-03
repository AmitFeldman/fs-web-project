import {Router} from 'express';
import Comment from '../../models/Comment';
import Post from '../../models/Post';
import {isIdValid} from '../../utils/validation';

const router = new Router();

// POST api/comments/create
router.post('/create', (req, res) => {
  const {postId, comment} = req.body;
  const {_id} = req.user;

  if (!_id || !isIdValid(_id) || !comment)
    return res.status(400).send({error: 'Not all information sent'});

  const newComment = new Comment({
    author: _id,
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
