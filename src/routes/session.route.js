const {Router} = require('express')
const sessionController= require('../controller/session.controller')
const passport = require('passport')
const { REGISTER_STRATEGY, LOGIN_STRATEGY, JWT_STRATEGY} = require('../utils/constants')
const handlePolicies = require('../middleware/handle-policies')
const router = Router()

// login
router.post('/login',passport.authenticate(LOGIN_STRATEGY,{session:false}), sessionController.sessionLogin)

// Register
router.post('/register', passport.authenticate(REGISTER_STRATEGY,{session:false}) , sessionController.loginRegister)

// Current

router.get('/current', handlePolicies(["PUBLIC"]) , async ( req, res) => {
    return res.json({ message:" jwt en las cookie siendo PUBLIC"})
})

router.get('/current/user', handlePolicies(["USER" , "ADMIN"]) , async ( req, res) => {
    return res.json({ message:" jwt en las cookie siendo USER"})
})

router.get('/current/admin', handlePolicies(["ADMIN"]) , async ( req, res) => {
    return res.json({ message:" jwt en las cookie siendo ADMIN"})
})

//Github
router.get('/github', passport.authenticate("github" , {scope: ["user:email"]}), async (req , res ) => {});
router.get('/github/callback' , passport.authenticate("github" , {failureRedirect: "/login"}), sessionController.github);

module.exports = router;