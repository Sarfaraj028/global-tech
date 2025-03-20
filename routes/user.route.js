import express from 'express'
const router = express.Router()
import passport from 'passport';
import User from '../models/user.model.js';
import { saveRedirectUrl } from '../middlewares/ensureAuthentication.js';

router.get('/signup', (req, res) => {
  res.render('signup.ejs');
});

//post register
router.post("/signup", async (req, res) => {
  const { email, password, role } = req.body;
  
  // If not an admin, default to user role
  const userRole = role === 'admin' ? 'admin' : 'user';
  try {
    // Create new user
    const newUser = new User({ email, password, role: role || userRole });
    await newUser.save();
    console.log("account created successfully!");
    req.login(newUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success",`Welcome ${email}`)
      console.log(`welcome ${email}`);
      
      res.redirect("/");  // Success redirect
    });
  } catch (err) {
    req.flash("error", "User allready Exist Please login!");
    res.redirect("/user/login");
  }
});

// user get login
router.get('/login', (req, res) => {
  res.render('login.ejs');
});


//login post route 
// router.post(
//   "/login", passport.authenticate("local", {
//     successRedirect: "/",
//     failureRedirect: "/user/login", // Corrected failure redirect path
//     failureFlash: true,
//   }), 
// ) ;
// Custom login route handling
router.post("/login", saveRedirectUrl, (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      req.flash("error", info.message || "Authentication failed");
      return res.redirect("/user/login"); // Failure redirect
    }
    
    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      if(res.locals.redirectUrl){
        req.flash("success",`Welcome Admin ${req.user.email}`)
        res.redirect(res.locals.redirectUrl);  // Success redirect
      }
      else{
        req.flash("success",`Welcome ${req.user.email} to global-tech`)
        res.redirect("/");  // Success redirect
      }
    });
  })(req, res, next);
});

// logout 
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err); 
    req.flash("success", "Logged out!")
    res.redirect("/");  // Redirect to homepage or any page after logout
  });
});



export default router