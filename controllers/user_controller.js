const User = require('../models/user');
module.exports = {
  profile: (req, res) => {
    return res.render('user_profile', {
      title: 'User Profile',
    });
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
    //find the user
    await User.findOne({ email: req.body.email }, (err, user) => {
      if (err) {
        console.log('error in finding user in sign up');
        return;
      }
      //handle user found
      if (user) {
        if (user.password != req.body.password) {
          return res.redirect('back');
        }
        res.cookie('user_id', user.id);
        return res.redirect('/users/profile');
      } else {
        return res.redirect('back');
      }
    });

    //handle user found

    //handle password

    //handle user not found
  },
};
