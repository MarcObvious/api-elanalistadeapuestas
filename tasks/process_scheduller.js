/**
 * Created by ramon on 22/09/15.
 */
var models      = require('../app/models/');
var async       = require('async');
var colors      = require('colors');
var crypto      = require('crypto');
var orm         = require('orm');

models(function (err, db) {

    var devicetokens_send=[];

    if (err) throw err;

    async.waterfall([
        function(next){
            var _this = this;
            console.log('Processing scheduller ...'.blue);
            db.models.scheduller.find({date_to_send:orm.lte(new Date()),processed:0,date_sent:null}).order('-id').all(function (err, sched) {
                if (err) throw err;

                sched.forEach(function(element,index,array){
                    console.log('Element');
                    console.log(element);
                });


                var items = sched.map(function (m) {
                    return m.serialize();
                });
                items.forEach(function(element,index,array){
                    console.log('Sending campaign::: '+element.name);
                });
                console.log('DONE...'.green);
                next();
            });
        },
        function(next){
            db.close();
        }
    ],function(err,result){
        if(err) return err;
        else return result;
    });

});
