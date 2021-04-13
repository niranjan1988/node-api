const assert = require('assert');
const request = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');
const Driver = mongoose.model('driver');

describe('Drivers Controller', (done) => {
    it('Post to /api/drivers create a new driver', (done) => {
        Driver.count().then(count => {
            request(app)
                .post('/api/drivers')
                .send({ "email": 'test@test.com' })
                .end(() => {
                    Driver.count().then(newCount => {
                        assert(count + 1 == newCount);
                        done();
                    })
                })
        })
    });

    it('Put to /api/driver to edit an existing driver', (done) => {
        const driver = new Driver({ email: 't@t.com' });
        driver.save().then(() => {
            request(app)
                .put('/api/drivers/' + driver._id)
                .send({ driving:true })
                .end(() => {
                    Driver.findById(driver._id).then(d => {
                        assert(d.driving == true);
                        done();
                    })
                })
        })
    });

    it('Delete to /api/drivers/:id should delete a driver', () => {
        const driver = new Driver({email:'test@email.com'});
        driver.save().then(()=>{
            request(app)
            .delete('/api/drivers/'+driver._id)
            .end(()=>{
                Driver.findById(driver._id)
                .then(driver =>{                   
                    assert(driver === null)
                    done();
                })
            })
        })
    });
});