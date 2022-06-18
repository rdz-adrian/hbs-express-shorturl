const bcryptjs = require("bcryptjs")
const { nanoid } = require("nanoid")
const User_Model = require("../models/User_Model")

const registerForm = (req, res) => res.render('register')

const registerUser = async (req, res) => {
    const { userName, email, password } = req.body

    try {
        let user = await User_Model.findOne({ where: { email }, raw: true })
        if (user) throw new Error('There is already a user with this account')

        user = new User_Model({ userName, email, password, tokenConfirm: nanoid() })
        await user.save();

        //send email whith the account confirmation

        res.redirect('/auth/login')
        // res.json(user)
    } catch (error) {
        res.json({ message: error.message })
    }
}

const confirmAccount = async (req, res) => {
    const { token } = req.params

    try {
        const user = await User_Model.findOne({ where: { tokenConfirm: token } })
        if (!user) throw new Error('This user does not exist')

        user.cuentaConfirmada = true;
        user.tokenConfirm = null;

        await user.save();//ME quede aquiiiiii
        res.redirect('/auth/login')

    } catch (error) {
        res.json({ message: error.message })
    }
}

const loginForm = (req, res) => res.render('login')

const loginUser = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User_Model.findOne({ where: { email } })
        if (!user) throw new Error('This user does not exist')
        if (!user.cuentaConfirmada) throw new Error('You have to access your email to confirm the account before')

        if(!await bcryptjs.compare(password, user.password)) throw new Error('Incorrect password')

        res.redirect('/')

    } catch (error) {
        res.json({ message: error.message })
    }
}

module.exports = {
    loginForm,
    registerForm,
    registerUser,
    confirmAccount,
    loginUser
}