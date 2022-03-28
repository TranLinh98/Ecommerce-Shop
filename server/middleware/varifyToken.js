import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err)
        res
          .status(403)
          .json({ success: false, message: 'Token is not valid!' });
      req.user = user;
      next();
    });
  } else {
    return res
      .status(401)
      .json({ success: false, message: 'You are not authenticated!' });
  }
};

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin || req.user) {
      next();
    } else {
      res
        .status(403)
        .json({ success: false, message: 'You are not alowed to do that!' });
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res
        .status(403)
        .json({ success: false, message: 'You are not alowed to do that!' });
    }
  });
};

export { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin };
