const User = require('../models/user');
module.exports = {
  profile: async (req, res) => {
    try {
      if (req.cookies.user_id) {
        const user = await User.findById(req.cookies.user_id);
        if (user) {
          return res.render('user_profile', {
            title: 'User Profile',
            user: user,
          });
        }
        return res.redirect('/users/signin');
      } else {
        return res.redirect('/users/signin');
      }
    } catch (error) {}
  },
  signin: (req, res) => {
    return res.render('user_sign_in', {
      title: 'Codial | Sign In',
    });
  },
  signup: (req, res) => {
    return res.render('user_sign_up', {
      title: 'Codial | Sign Up',
    });
  },
  create: async (req, res) => {
    try {
      if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
      }
      const { name, email, password } = req.body;
      const user = await User.findOne({ email: email });
      if (!user) {
        const user = new User({
          name,
          password,
          email,
        });
        const result = await user.save();
        return res.redirect('/users/signin');
      } else {
        return res.redirect('back');
      }
    } catch (error) {
      console.log('error in sign Up user');
    }
  },
  createSession: async (req, res) => {
    try {
      const email = req.body.email;
      const user = await User.findOne({ email: email });
      if (!user) {
        return res.redirect('back');
      } else {
        if (user.password != req.body.password) {
          return res.redirect('back');
        } else {
          await res.cookie('user_id', user.id);
          return res.redirect('/users/profile');
        }
      }
    } catch (error) {
      res.send(err);
    }
  },
};
