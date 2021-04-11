const Driver = require('../models/driver');

module.exports={
    greeting(req,res){
        res.send({"hi":"there"});
    },

    create(req,res,next) {
        const body = req.body;
        Driver.create(body).then(driver=>{
            res.send(driver);
        }).catch(next)
    }
}