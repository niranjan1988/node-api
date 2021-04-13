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
    },

    edit(req,res,next) {
        const driverId = req.params.id;
        const driverProps = req.body;

        Driver.findByIdAndUpdate({_id:driverId}, driverProps)
        .then(()=> Driver.findById(driverId))
        .then(driver=>res.send(driver))
        .catch(next);
    },

    delete(req,res, next) {
        const driverId = req.params.id;
        Driver.findByIdAndDelete(driverId)
        .then(driver=>res.status(204).send(driver))
        .catch(next);
    }
}