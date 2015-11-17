
var responseTpls = require('../../config/jsontemplates');

module.exports = {
    formatErrors: function(errorsIn,controller,action,message) {
        var response = responseTpls.newResponse();
        response.success = false;
        response.controller = controller?controller:null;
        response.action = action?action:null;
        response.data = null;
        response.message = message?message:null;

        var errors = {};
        var a, e;
        if(Array.isArray(errorsIn)){
            for(a = 0; a < errorsIn.length; a++) {
                e = errorsIn[a];

                errors[e.property] = errors[e.property] || [];
                errors[e.property].push(e.msg);
            }
            response.errors=errors;
        }else if(errorsIn && errorsIn.code){
            response.errors=errorsIn
        }else{
            response.errors=null;
        }
        return response;
    },
    formatResponse: function(controller,action,data,message,token){
        var response = responseTpls.newResponse();
        response.success=true;
        response.controller=controller?controller:null;
        response.action=action?action:null;
        response.data=data?data:null;
        response.message=message?message:null;
        if(token)
            response.token=token;

        return response;
    },
    mapResults: function(result){
        var items = result.map(function (m) {
            return m.serialize();
        });
        return items;
    }

};
