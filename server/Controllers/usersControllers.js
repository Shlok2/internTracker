const users = require("../models/usersSchema");
const moment = require("moment");

// Register user
//frontend to backend
exports.userpost = async(req,res)=>{
    // const file = req.file.filename;
    const {name,stage,platform,notes,status,date} = req.body;

    if(!name||!stage||!platform||!status||!date){
        res.status(401).json("All Inputs is required");
    }
    try{
        const peruser = await users.findOne({name:name});
        if(peruser){
            res.status(401).json("This user already exist in database!")
        }
        else{
            const datecreated = moment(new Date()).format("YYYY-MM-DD hh:mm:ss")
            const userData = new users({
                name,stage,platform,notes,status,date,datecreated
            });
            await userData.save();
            res.status(200).json(userData);
        }
    }
    catch(error){
        res.status(401).json(error);
        console.log("catch block error");
    }
}

//usersget
// backend to frontend
exports.userget = async(req,res) => {
    try {
        // find all users from users model
        const usersdata = await users.find();
        res.status(200).json(usersdata);
    } catch (error) {
        res.status(401).json(error);
    }
}