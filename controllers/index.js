const User = require('../models/User');


exports.signupView = (req, res) => {
    res.render('passport/signup')
}

exports.signup = async (req, res) => {
  
    const {name, email, nativeLanguage, wantToPractice, interestOne, interestTwo, interestThree, password} = req.body;
    console.log(req.body)
    console.log('user', req.body);

    if (email === "" || password === "") {
        res.render('passport/signup', {
            message: 'Campos incompletos'
        })
    }
    const userOnDB = await User.findOne({ email });
  if (userOnDB !== null) {
    res.render("passport/signup", { message: "El correo ya fue registrado" });
  }
  await User.register({ name, email, nativeLanguage, wantToPractice, interestOne, interestTwo, interestThree }, password);
  res.redirect("/login");
};

exports.loginView = (req, res) => {
  res.render("passport/login", { message: req.flash("error") });
};

exports.logout = (req, res) => {
  req.logout();
  res.redirect("/login");
};

exports.isMatching = async (req, res) => {
  const userLogged = req.user.wantToPractice
  const userNativeLanguage = await User.findOne({ nativeLanguage: userLogged })
  console.log(userLogged)
  console.log(userNativeLanguage)
  res.render("/passport/profile", userNativeLanguage)  
}
//  const userNativeLanguage = await User.findOne({ nativeLanguage: userLogged })

/*
const userLogged = await User.findOneById({ _id })
  const userPractice = await User.findOne({ wantToPractice });
  if(userLogged == userPractice) {
    
  }
  */