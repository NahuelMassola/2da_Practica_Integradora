const {Router} = require('express');
const passport = require('passport');
const sessionController = require('../controller/session.Controller');
const handlePolicies = require('../middleware/handle-policies')

const router = Router();

//login
router.post('/login', sessionController.sessionLogin);


//register
router.post('/register', passport.authenticate('register', {failureRedirect:'/failregister'}), sessionController.register);
router.get('/failregister' , sessionController.failregister);

//Logout
router.get("/logout", sessionController.logout)

//Github
router.get('/github', passport.authenticate("github" , {scope: ["user:email"]}), async (req , res ) => {});
router.get('/github/callback' , passport.authenticate("github" , {failureRedirect: "/login"}), sessionController.github);

router.get('/current' , handlePolicies(['USUARIO']) , async (req , res) => {
    console.log('VALIDANDO REQ' , req.user)
    return res.json({message:"jwt en las cookies"})
})

router.get('/current' , handlePolicies(['ADMIN']) , async (req , res) => {
    console.log('VALIDANDO REQ' , req.user)
    return res.json({message:"jwt en las cookies"})
})

module.exports = router;