const router = require('express').Router();
const { BlogPost } = require('../../models');

// router.post('/', async (req, res) => {
//   try {
//     const newBlogPost = await BlogPost.create({
//       ...req.body,
//       user_id: req.session.user_id,
//     });

//     res.status(200).json(newBlogPost);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

// router.delete('/:id', async (req, res) => {
//   try {
//     const blogPostData = await BlogPost.destroy({
//       where: {
//         id: req.params.id,
//         user_id: req.session.user_id,
//       },
//     });

//     if (!blogPostData) {
//       res.status(404).json({ message: 'No blogpost found with this id!' });
//       return;
//     }

//     res.status(200).json(blogPostData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// Add a new POST route to handle form submissions
//add authentication
router.post('/', async (req, res) => {
    console.log('we hit it');
    try {
      // Create a new Plant record in the database using the form data
      const blogpost = await BlogPost.create({
        title: req.body.title,
        content: req.body.content,
        user_id: req.session.user_id
      });
      // Send a success response to the client
      res.status(201).json({ success: true, blogpost: blogpost });
      console.log('success');
    } catch (err) {
      // Handle errors and send an error response to the client
      console.error(err);
      res.status(500).json({ message: 'Server error occurred while creating plant record' });
    }
  });

module.exports = router;
