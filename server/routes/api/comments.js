import {Router} from 'express';
import Comment from '../../models/Comment';
import Post from '../../models/Post';
import {isIdValid} from '../../utils/validation';
import {isLoggedIn} from '../../middlewares/auth';
import mongoose from 'mongoose';
import User from '../../models/User';

const router = new Router();

// POST api/comments
router.post('', (req, res) => {
  const {
    postId,
    fromDateFilter,
    toDateFilter,
    authorFilter,
    commentFilter,
  } = req.body;

  if (!postId || !isIdValid(postId))
    return res.status(400).send({error: 'Not all required information sent'});

  const commentMatchers = [{post: mongoose.Types.ObjectId(postId)}];

  if (commentFilter) {
    commentMatchers.push({comment: {$regex: `.*${commentFilter}.*`}});
  }

  if (fromDateFilter || toDateFilter) {
    const dateMatch = {date: {}};

    if (fromDateFilter) {
      dateMatch.date['$gte'] = new Date(fromDateFilter);
    }

    if (toDateFilter) {
      dateMatch.date['$lt'] = new Date(toDateFilter);
    }

    commentMatchers.push(dateMatch);
  }

  const pipeline = [
    {$match: {$and: commentMatchers}},
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
  ];

  if (authorFilter) {
    pipeline.push({
      $match: {'author.username': {$regex: `.*${authorFilter}.*`}},
    });
  }

  Comment.aggregate(pipeline).exec((err, result) => {
    if (err) console.log(err);
    res.json(result);
  });
});

// POST api/comments/create
router.post('/create', isLoggedIn, (req, res) => {
  const {postId, comment} = req.body;
  const {_id} = req.user;

  if (!_id || !isIdValid(_id) || !comment)
    return res.status(400).send({error: {msg: 'Not all information sent'}});

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

// GET api/comments/stats-days
router.get('/stats-days', (req, res) => {
  Comment.aggregate([
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

export default router;
