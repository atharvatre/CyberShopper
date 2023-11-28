import express from 'express'
import { registerController, loginController, testController, forgotPasswordController, updateProfileController } from '../controller/authController.js'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js'
//router object

const router = express.Router()

//routing
//Register || METHOD POST
router.post('/register', registerController)

//LOGIN || METHOD POST
router.post('/login', loginController)

//Forgot password || METHOD POST
router.post('/forgot-password', forgotPasswordController)



//test route
router.get('/test', requireSignIn, isAdmin, testController)

//protected User router auth

router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

//protected Admin router auth

router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//update profile

router.put('/profile', requireSignIn, updateProfileController)

export default router