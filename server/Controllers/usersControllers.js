const users = require("../models/usersSchema");
const moment = require("moment");
const csv = require("fast-csv");
const fs = require("fs");
const { Configuration, OpenAIApi } = require("openai");
const BASE_URL = process.env.BASE_URL;

const configuration = new Configuration({
    apiKey:process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

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
            // console.log(datecreated);
            // console.log(typeof datecreated);
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

    const search = req.query.search || "";
    const platform = req.query.platform || "";
    const status = req.query.status || "";
    const sorto = req.query.sort || "";
    const page = req.query.page || 1;
    const ITEM_PER_PAGE = 5;

    const query = {
        name : {$regex:search,$options:"i"} 
    }

    if(platform !== "All"){
        query.platform = platform
    }

    if(status !== "All"){
        query.status = status
    }
    
    try {    
        // find query(company name) from users model

        const skip = (page - 1) * ITEM_PER_PAGE;
        const count = await users.countDocuments(query);

        if(sorto === "new"){
            // const usersdata = await users.find(query).sort({datecreated:-1});
            const usersdata = await users.find(query).sort({datecreated : -1})
            .limit(ITEM_PER_PAGE).skip(skip)
            const pageCount = Math.ceil(count/ITEM_PER_PAGE);
            
            res.status(200).json({
                Pagination:{
                    count,pageCount
                },
                usersdata
            });
        }
        else if(sorto === "old"){
            const usersdata = await users.find(query).sort({datecreated: 1})
            .limit(ITEM_PER_PAGE).skip(skip)
            const pageCount = Math.ceil(count/ITEM_PER_PAGE);
            
            res.status(200).json({
                Pagination:{
                    count,pageCount
                },
                usersdata
            });
        }
        else if(sorto === "edited"){
            const usersdata = await users.find(query).sort({dateUpdated: -1})
            .limit(ITEM_PER_PAGE).skip(skip)
            const pageCount = Math.ceil(count/ITEM_PER_PAGE);
            
            res.status(200).json({
                Pagination:{
                    count,pageCount
                },
                usersdata
            });
        }
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

    const dateUpdated = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");
    // console.log(dateUpdated);
    // console.log(typeof dateUpdated);
    
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

exports.userdelete = async(req,res) => {
    const {id} = req.params;
    try {
        const deleteuser = await users.findByIdAndDelete({_id:id});
        res.status(200).json(deleteuser);
    } catch (error) {
        res.status(401).json(error);
    }
}

// change status
exports.userstatus = async(req,res)=>{
    const {id} = req.params;
    const {data} = req.body;
    // console.log(data);

    try {
        const userstatusupdate = await users.findByIdAndUpdate({_id:id},{status:data},{new:true});
        res.status(200).json(userstatusupdate);
    } catch (error) {
        res.status(401).json(error);
    }
}

exports.userExport = async (req, res) => {
    try {
        const usersdata = await users.find();

        const csvStream = csv.format({ headers: true });

        if (!fs.existsSync("public/files/export/")) {
            if (!fs.existsSync("public/files")) {
                fs.mkdirSync("public/files/");
            }
            if (!fs.existsSync("public/files/export")) {
                fs.mkdirSync("./public/files/export/");
            }
        }

        const writablestream = fs.createWriteStream(
            "public/files/export/users.csv"
        );

        csvStream.pipe(writablestream);

        writablestream.on("finish", function () {
            res.json({
                downloadUrl: `${BASE_URL}/files/export/users.csv`,
            });
        });
        if (usersdata.length > 0) {
            usersdata.map((user) => {
                csvStream.write({
                    Name: user.name ? user.name : "-",
                    Platform: user.platform ? user.platform : "-",
                    Stage: user.stage ? user.stage : "-",
                    Date: user.date ? user.date : "-",
                    Status: user.status ? user.status : "-",
                    Notes: user.notes ? user.notes : "-",
                    DateCreated: user.datecreated ? user.datecreated : "-",
                    DateUpdated: user.dateUpdated ? user.dateUpdated : "-"
                })
            })
        }
        csvStream.end();
        writablestream.end();

    } catch (error) {
        res.status(401).json(error)
    }
}

// Open API
exports.openai = async(req,res) => {
    res.status(200).send({
        message: 'Hello from developer',
    })
}

exports.openaipost = async(req,res) => {
    try {
        const prompt = req.body.prompt;
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${prompt}`,
            // prompt: "Create a list of 8 questions for my interview with a science fiction author:",
            temperature: 0,
            max_tokens: 3000,
            top_p: 1.0,
            frequency_penalty: 0.5,
            presence_penalty: 0.0,
        })

        res.status(200).send({
            bot: response.data.choices[0].text
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({error});
    }
}