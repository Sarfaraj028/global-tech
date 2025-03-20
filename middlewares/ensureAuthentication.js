// Ensure the user is authenticated
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    else{
      req.session.redirectUrl = req.originalUrl
      console.log(req.session.redirectUrl);
    }
    req.flash("error", "Login first")
    res.redirect("/user/login");
  }
  
  const saveRedirectUrl = (req, res, next) =>{
    if(req.session.redirectUrl){
      res.locals.redirectUrl = req.session.redirectUrl
    }
    next()
  }
  
  export default ensureAuthenticated
  export {saveRedirectUrl}