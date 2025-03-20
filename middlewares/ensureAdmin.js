// Ensure the user is an admin
function ensureAdmin(req, res, next) {
    if (req.user.role === "admin") {
      console.log("ensure admin ",req.user);
      return next();
    } else {
      req.flash("error", "FORBIDDEN AREA: Access Denied!")
      res.redirect("/");
    }
  }
  

  export default ensureAdmin