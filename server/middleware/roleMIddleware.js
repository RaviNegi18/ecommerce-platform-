const roleMiddleware = (requiredRole) => {
  return (req, res, next) => {
    if (req.path === "/register") {
      return next();
    }
    if (!req.user) {
      return res.status(401).json({
        error: "Unauthorized",
        message: "You must be logged in to access this resource.",
      });
    }

    if (req.user.role !== requiredRole) {
      return res.status(403).json({
        error: "Access Denied",
        message: `You do not have permission to access this resource. Required role: ${requiredRole}, but your role is: ${req.user.role}`,
      });
    }

    next();
  };
};

export default roleMiddleware;
