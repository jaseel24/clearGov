const checkRole = (permissions) => {
    return async (req, res, next) => {
        if (permissions.includes(req.user.role)) {
            return next();
        }
        res.status(401).json({ message: "Unauthorized" });
    };
};

module.exports = checkRole;
