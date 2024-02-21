const User = require('../Model/UserModel');
const bcrypt = require('bcrypt'); 


module.exports.register = async (req, res) => {
    // console.log(req.body)
    const { username, email, password } = req.body;
    
    const usernameCheck = await User.findOne({ username });
    // console.log(usernameCheck)
    if (usernameCheck) {
        // console.log(req.body)
            return res.json({ 
                status: 400,
                message: "Username already exists" });
            
        }
    const emailCheck = User.findOne({ email });
    console.log(emailCheck.email)
    if (emailCheck.email) {
            // console.log(req.body)
            return res.json({
                status: 400,
                 message: "Email already exists" });
            
        }   
    try {
        
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ username, email, password: hashedPassword});
        user.password = ""
        res.json({ 
            status:200,
            user });
        
    } catch (error) {
        
        res.json({ 
            status: 400,
            error });
         
    }
   
}

module.exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // console.log(req.body)
        const user = await User.findOne({ email });

        if(user ==null) {
            return res.json({ 
                status: 400,
                message: "Invalid Credentials" });
            
        }
        
        const checkpassword = bcrypt.compare(password, user.password);
        // console.log(checkpassword)
        if (!checkpassword) {
             console.log(user.email)
            return res.json({ 
                status: 400,
                message: "Invalid Credentials" });
            
        }
        user.password = ""
        // console.log(req.body)
        res.json({ 
            status:200,
            user });

    } catch (error) {
        
        res.json({
            status:400,
             error });
        
    }
}

module.exports.setAvatar = async (req, res) => {

    console.log(req.body)
    const { secure_url, public_id } = req.body;
    const { _id } = req.params;


    try {
        const user = await User.findOneAndUpdate({ _id }, {
            $set:{
                avatar:{
                    secure_url,
                    public_id
                },
                isAvatarImageSet: true
            }
        });
        
        user.password = ""

        res.status(200).json({ user });

    } catch (error) {
        
        res.status(400).json({ error });
        
    }
}