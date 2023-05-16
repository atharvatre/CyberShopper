import userModel from '../models/userModel.js'
import { comparePassword, hashPassword } from '../helpers/authHelper.js'
import JWT from 'jsonwebtoken'




export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address,answer } = req.body
        //validation
        if (!name) {
            return res.send({ message: 'Name is required' })
        }
        if (!email) {
            return res.send({ message: 'Email is required' })
        }
        if (!password) {
            return res.send({ message: 'Password is required' })
        }
        if (!phone) {
            return res.send({ message: 'Phone No. is required' })
        }
        if (!address) {
            return res.send({ message: 'Address is required' })
        }
        if (!answer) {
            return res.send({ message: 'Answer is required' })
        }

        //checking existing user
        const existinguser = await userModel.findOne({ email })
        if (existinguser) {
            return res.status(200).send({
                success: false,
                message: 'User already exists'
            })
        }

        //registering user
        const hashedpassword = await hashPassword(password)

        //save user

        const user = await new userModel({ name, email, password: hashedpassword, phone, address, answer }).save()

        res.status(201).send({
            success: true,
            message: 'User registered successfully',
            user
        })


    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in registration',
            error
        })

    }
}

//post method
//LOGIN
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body
        //VALIDATION
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: 'invalid email or password',

            })
        }
        //check user
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'email id is not registered'
            })
        }
        const match = await comparePassword(password, user.password)
        if (!match) {
            res.status(401).send({
                success: false,
                message: 'incorrect password'
            })
        }

        //token
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d', })
        res.status(200).send({
            success: true,
            message: 'login successfull',
            user: {
                _id:user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role,
            },
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'error in login',
            error
        })
    }
}


//forgot Password Controller
export const forgotPasswordController=async(req,res)=>{
    try {
        const {email,answer,newPassword}= req.body
        if(!email){
            res.status(400).send({message:"Email is required"})
        }
        if(!answer){
            res.status(400).send({message:"Answer is required"})
        }
        if(!newPassword){
            res.status(400).send({message:"New Password is required"})
        }
        // check
        const user=await userModel.findOne({email,answer})
        //validation
        if(!user){
            return res.status(404).send({
                success:false,
                message:"Wrong Information provided"
            })
        }
        const hashed=await hashPassword(newPassword)
        await userModel.findByIdAndUpdate(user._id,{password:hashed})
        res.status(200).send({
            success:true,
            message:"Password Reset Successfully",
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"something went wrong",
            error
        })
        
    }
}


//test controller
export const testController = (req, res) => {
    res.send('protectedroute')
    //console.log("protected route")
}




//export default { registerController };