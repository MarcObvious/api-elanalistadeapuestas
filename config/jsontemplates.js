module.exports = {
    newResponse: function(type){
        switch(type){
            default:
                responseTemplate = {
                    success:false,
                    controller:null,
                    action:null,
                    data:null,
                    errors:null,
                    message:null
                };
                break;
        }


        return responseTemplate;
    }

    };


