import passport from 'passport';

const authMiddleware = (req,res,next) => {
    passport.authenticate('jwt', { session: false }, (error, user, info) => {
        console.log('Step 3: After authenticate the user', user);
        
        if (error || !user) {
            return res.status(401).json({
                message: 'Unauthorized'
            });
        }

        req.user = user;
        return next();
    })(req, res, next);
};

export default authMiddleware;