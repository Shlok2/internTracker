const users = require("../models/usersSchema");
const moment = require("moment");

// Register user
//frontend to backend
exports.userpost = async(req,res)=>{

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

// get single user
exports.singleuserget = async(req,res) => {

    const {id} = req.params;
    try {
        const userdata = await users.findOne({_id : id});
        res.status(200).json(userdata);
    } catch (error) {
        res.status(401).json(error);
    }
}

// Edit user
exports.useredit = async(req,res) => {
    const {id} = req.params;
    const {name,stage,platform,notes,status,date} = req.body;

    const dateUpdated = moment(new Date()).format("DD-MM-YYYY hh:mm:ss");

    try {
        const updateuser = await users.findByIdAndUpdate({_id:id},{
            name,stage,platform,notes,status,date,dateUpdated
        },{new:true});

        await updateuser.save();
        res.status(200).json(updateuser);
    } catch (error) {
        res.status(401).json(error);
    }
}