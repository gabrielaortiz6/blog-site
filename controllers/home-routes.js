const router = require('express').Router();
const { BlogPost, User, Comment} = require('../models');
const withAuth = require('../utils/auth');
const bcrypt = require('bcrypt');

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const blogPostData = await BlogPost.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    // Serialize data so the template can read it
    const blogposts = blogPostData.map((blogpost) => blogpost.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      blogposts, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const userId = req.session.user_id;

    // Fetch blog posts created by the logged-in user
    const blogPosts = await BlogPost.findAll({
      where: { user_id: userId },
      include: [User],
    });

    res.render('dashboard', {
      logged_in: req.session.logged_in,
      username: req.session.username,
      blogPosts: blogPosts.map((blogPost) => blogPost.get({ plain: true })),
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

router.get('/blogpost/:id', withAuth, async (req, res) => {
  try {
    const blogPostData = await BlogPost.findByPk(req.params.id, {
      include: [
        User,
        {
          model: Comment,
          include: [User],
        },
      ],
    });

    const blogpost = blogPostData.get({ plain: true });

    res.render('blogpost', {
      ...blogpost,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

module.exports = router;