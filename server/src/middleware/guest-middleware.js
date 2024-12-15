import passport from 'passport';

const guestMiddleware = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }

        if (user) {
            return res.status(403).json({ message: 'Forbidden: You are already logged in.' });
        }

        // User is not authenticated, proceed to the next middleware/route
        return next();
    })(req, res, next);
}

export default guestMiddleware;