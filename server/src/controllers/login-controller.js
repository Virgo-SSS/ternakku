import passport from 'passport';

// TODO: ADD VALIDATION
const login = async (req, res, next) => {
    try {
        console.log("Step 1: We call passport.authenticate('local') to authenticate the user");

        // Auth logic will handled by the passport using the strategy we defined
        // for example we defined 'local' at first parameter of passport.authenticate() function
        // so passport will search for the 'local' strategy we defined.
        passport.authenticate('local', (err, user, info) => {
            console.log("Step 3: After the authentication processed by passport, we handle the response here");

            if (err) {
                return res.status(500)
                .json({
                    status: "error",
                    message: err.message
                });
            }

            if(!user) {
                return res.status(401)
                .json({
                    message: "Email or password is incorrect"
                });
            }

            // call req.logIn() to establish a login session
            // this will trigger the passport.serializeUser() function we defined in the passport.js
            req.logIn(user, (err) => {
                console.log("Step 5: after passport.serializeUser() is called, we handle the response here");

                if (err) {
                    throw new Error(err);
                }

                res.status(200)
                .json({
                    message: "Login successful",
                });
            });
        })(req, res, next);
    } catch (error) {
        res.status(500)
        .json({
            status: "error",
            message: error.message
        });
    }
}

const logout = async (req, res) => {
    res.status(200)
    .json({
        message: "Logout successful"
    });
}

export default {
    login,
    logout
}