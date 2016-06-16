/**
 * Created by Marc
 */
"use strict";

module.exports = function(sequelize, DataTypes) {
    var Prediction = sequelize.define("Prediction", {
        title:      {type:DataTypes.STRING,allowNull:false,defaultValue:""},
        value:      {type:DataTypes.STRING,allowNull:false,defaultValue:""},
        prob:       {type:DataTypes.FLOAT,allowNull:false,defaultValue:0},
        deleted:    {type:DataTypes.BOOLEAN,allowNull:false,defaultValue:false}
    },{
        classMethods : {
            associate : function(models){
                Prediction.belongsTo(models.Match);
            }
        }
    });

    return Prediction;
};