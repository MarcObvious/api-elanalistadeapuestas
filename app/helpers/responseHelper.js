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
    formatConfigResponse: function(data) {
        var response = {};
        data.forEach(function(element){
            if(element['config_key']==='config_available_langs'){
                response[element['config_key']] = JSON.parse(element.config_value);
            }else{
                var tmp_value = element.config_value==0?false:isNaN(element.config_value)==false?parseInt(element.config_value):element.config_value;
                if(tmp_value === "false"){
                    tmp_value = false;
                }
                response[element['config_key']] = tmp_value;
            }
        });


        return response;
    },
    mapResults: function(result){
        var items = result.map(function (m) {
            return m.serialize();
        });
        return items;
    },
    formatCreateErrors: function(errorsIn,controller,action) {
        var response = responseTpls.newResponse();
        response.success = false;
        response.controller = controller?controller:null;
        response.action = action?action:null;
        response.data = [];
        //response.message = message?message:null;
        //response.message = errorsIn.errors[0].message;
        response.data.push(errorsIn.errors);

        return response;
    }

};
