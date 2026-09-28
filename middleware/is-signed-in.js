const isSignedIn = (req, res, next) => {
  if (req.session.user) return next();

  res.redirect("/auth/sign-in");
};

const isAdmin = (req, res, next) => {
  if (!req.session.user || !req.session.user.isAdmin) {
    return res.redirect("/");
  }

  next();
};

module.exports = {isSignedIn, isAdmin};