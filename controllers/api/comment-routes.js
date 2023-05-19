const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// create comment
router.post('/', withAuth, async (req, res) => {
  try {
    const comment = await Comment.create({
    comment_text: req.body.comment_text,
    user_id: req.body.user_id,
    blog_post_id: req.body.blog_post_id
  })

  console.log('Comment created', comment)
     // Send a success response to the client
     res.status(201).json({ success: true, comment: comment });
     console.log('success');
  } catch (err) {
      console.log(err);
      res.status(400).json(err);
    };
});

//add get all route ?

module.exports = router;