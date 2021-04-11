const Driver = require('../models/driver');

module.exports={
    greeting(req,res){
        res.send({"hi":"there"});
    },

    create(req,res) {
        const body = req.body;
        Driver.create(body).then(driver=>{
            res.send(driver);
        }).catch(err=>{
            res
        })
    }
}