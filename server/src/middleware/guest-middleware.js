const guestMiddleware = (req, res, next) => {
    try {
        if (req.isAuthenticated()) {
            return res.status(401).json({ message: 'You are already authenticated' });
        }

        return next();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export default guestMiddleware;