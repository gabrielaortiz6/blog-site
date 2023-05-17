const router = require('express').Router();
const { User } = require('../../models');
const bcrypt = require('bcrypt');

// router.post('/', async (req, res) => {
//   try {
//     const userData = await User.create(req.body);

//     req.session.save(() => {
//       req.session.user_id = userData.id;
//       req.session.logged_in = true;

//       res.status(200).json(userData);
//     });
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

// router.post('/login', async (req, res) => {
//   try {
//     const userData = await User.findOne({ where: { email: req.body.email } });

//     if (!userData) {
//       res
//         .status(400)
//         .json({ message: 'Incorrect email or password, please try again' });
//       return;
//     }

//     const validPassword = await userData.checkPassword(req.body.password);

//     if (!validPassword) {
//       res
//         .status(400)
//         .json({ message: 'Incorrect email or password, please try again' });
//       return;
//     }

//     req.session.save(() => {
//       req.session.user_id = userData.id;
//       req.session.logged_in = true;
      
//       res.json({ user: userData, message: 'You are now logged in!' });
//     });

//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

// router.post('/logout', (req, res) => {
//   if (req.session.logged_in) {
//     req.session.destroy(() => {
//       res.status(204).end();
//     });
//   } else {
//     res.status(404).end();
//   }
// });

//POST /api/users/login
// router.post('/login', async (req, res) => {
//   console.log('req.body:');
//   console.log(req.body);
//   try {
//       //lookup a user based on the email we send from the login page form
//       const userData = await User.findOne({
//           where: {
//               email: req.body.email
//           }
//       });
//       //if that user exists, check their password (otherwise say "user not found")
//       if (userData) {
//           //check password
//           //TODO: use bcrypt in my user model and bcrypt.compare()
//           const validPassword = await bcrypt.compare(req.body.password, userData.password);
//           if (validPassword) {
//               req.session.save(() => {
//                   req.session.user_id = userData.id;
//                   req.session.logged_in = true;

//                   res.json({
//                       success: true,
//                       user: userData,
//                       message: 'You are now logged in!'
//                   });
//               });
//           } else {
//               return res.status(400).json({
//                   success: false,
//                   message: 'Wrong password :('
//               });
//           }
//       } else {
//           return res.status(404).json({
//               success: false,
//               message: 'User not found :('
//           });
//       }
//       console.log(userData);

//   } catch (e) {
//       res.status(500).json(e);
//   }

// });

// router.post('/', async (req, res) => {
//     try {
//       const hashedPassword = await bcrypt.hash(req.body.password, 10);
//       const userData = await User.create({
//         name: req.body.name,
//         email: req.body.email,
//         password: hashedPassword
//       });
//       req.session.save(() => {
//         req.session.user_id = userData.id;
//         req.session.logged_in = true;
//         req.session.name = userData.name;
  
//         res.status(200).json(userData);
//       });
//     } catch (err) {
//       res.status(400).json(err);
//     }
//   });
  
  router.post('/login', async (req, res) => {
    try {
      const userData = await User.findOne({ where: { email: req.body.email } });
  
      if (!userData) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
  
      const validPassword = await userData.checkPassword(req.body.password);
  
      if (!validPassword) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
  
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
        req.session.name = userData.name;
  
        res.json({ user: userData, message: 'You are now logged in!' });
      });
  
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
  router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });
  
  router.get('/:id', async (req, res) => {
    try {
      // find the user by id
      const userData = await User.findByPk(req.params.id);
  
      const user = userData.get({ plain: true });
  
      res.status(200).json(user);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  });
  
module.exports = router;
