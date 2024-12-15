const authMiddleware = (req, res, next) => {
    console.log("authenticated status: ", req.isAuthenticated());
    console.log("user: ", req.user);
    
    try {
        if (req.isAuthenticated()) {
            return next();
        }

        return res.status(401).json({ message: 'Unauthorized' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


export default authMiddleware;