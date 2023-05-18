const router = require('express').Router();
const userRoutes = require('./user-routes');
const blogRoutes = require('./blog-routes');
const commentRoutes = require('./comment-routes')

router.use('/blogpost', blogRoutes);
router.use('/users', userRoutes);
router.use('/comments', commentRoutes)

module.exports = router;
