var _               = require('lodash');
var helpers         = require('./../helpers/responseHelper');
var settings        = require('../../config/settings');
var async           = require('async');
var models          = require('../models');

var Sequelize   = require('sequelize');

var settingsBBDD = require(__dirname + '/../../config/settingsBBDD');
var config = settingsBBDD.getBBDDSettings('appBBDD',settings.appMode);
var sequelize = new Sequelize(config.database, config.username, config.password, config);

var controller_name = 'all';


module.exports = {
    list: function (req, res, next) {
        return res.status(200).json(helpers.formatResponse(controller_name, req.method, 'Nope'));
    },
    create: function (req, res, next) {
        return res.status(200).json(helpers.formatResponse(controller_name, req.method, 'Nope'));

    },
    get: function (req, res, next) {

        var id = req.params.id ? req.params.id : null;
        var year = (req.params.year && req.params.year != 0) ? req.params.year : null;
        var round = (req.params.round && req.params.round != 0) ? req.params.round : null;
        var competition = (req.params.competition && req.params.competition != 0) ? req.params.competition : null;


        var query = "select \
  m.id, \
  m.lliga, \
  m.temp, \
  temp.id as temp_id, \
  m.date, \
  m.hour, \
  m.round, \
  IF(m.local_goals > m.visitor_goals, 1, IF (m.local_goals < m.visitor_goals, 2, 0)) as result, \
  m.localId, \
  m.local_goals, \
 \
  (SELECT GROUP_CONCAT(ml.local_goals ORDER BY ml.id ASC SEPARATOR '-') \
	 FROM Matches ml \
    where ml.localId = m.localId and  ml.round  < m.round  and ml.temp = m.temp \
  ) as LALGS, \
 \
  (SELECT GROUP_CONCAT(ml.visitor_goals ORDER BY ml.id ASC SEPARATOR '-') \
	 FROM Matches ml \
    where ml.localId = m.localId and  ml.round  < m.round  and ml.temp = m.temp \
  ) as LALGR, \
 \
  IF(ISNULL(t_local.wins), 0, t_local.wins) as local_wins, \
  IF(ISNULL(t_local.losses), 0, t_local.losses) as local_losses, \
  IF(ISNULL(t_local.draws), 0, t_local.draws) as local_draws, \
  IF(ISNULL(t_local.ga), 0, t_local.ga) as local_ga, \
  IF(ISNULL(t_local.gf), 0, t_local.gf) as local_gf, \
  IF(ISNULL(t_local.avg), 0, t_local.avg) as local_avg, \
  IF(ISNULL(t_local.form), 0, t_local.form) as local_form, \
  IF(ISNULL(t_local.mark), 0, t_local.mark) as local_mark, \
  IF(ISNULL(t_local.points), 0, t_local.points) as local_points, \
 \
  m.visitorId, \
  m.visitor_goals, \
 \
  (SELECT GROUP_CONCAT(mv.visitor_goals ORDER BY mv.id ASC SEPARATOR '-') \
   FROM Matches mv \
    where mv.visitorId = m.visitorId and  mv.round  < m.round  and mv.temp = m.temp \
  ) as VAVGS, \
 \
  (SELECT GROUP_CONCAT(mv.local_goals ORDER BY mv.id ASC SEPARATOR '-') \
   FROM Matches mv \
    where mv.visitorId = m.visitorId and  mv.round  < m.round  and mv.temp = m.temp \
  ) as VAVGR, \
 \
  IF(ISNULL(t_visitor.wins), 0, t_visitor.wins)  as visitor_wins, \
  IF(ISNULL(t_visitor.losses), 0, t_visitor.losses) as visitor_losses, \
  IF(ISNULL(t_visitor.draws), 0, t_visitor.draws) as visitor_draws, \
  IF(ISNULL(t_visitor.ga), 0, t_visitor.ga) as visitor_ga, \
  IF(ISNULL(t_visitor.gf), 0, t_visitor.gf) as visitor_gf, \
  IF(ISNULL(t_visitor.avg), 0, t_visitor.avg) as visitor_avg, \
  IF(ISNULL(t_visitor.form), 0, t_visitor.form) as visitor_form, \
  IF(ISNULL(t_visitor.mark), 0, t_visitor.mark) as visitor_mark, \
  IF(ISNULL(t_visitor.points), 0, t_visitor.points) as visitor_points \
 \
  from Matches m \
  inner join MatchExtras me on me.MatchId=m.id \
  inner join Temps temp on temp.year= m.temp \
  left join Tables t_local on me.localId=t_local.TeamId and (m.round-1)=t_local.round and t_local.TempId=temp.id \
  left join Tables t_visitor on me.visitorId=t_visitor.TeamId and (m.round-1)=t_visitor.round and t_visitor.tempId=temp.id \
 \
  where m.id="+id;

        sequelize.query(query, {type: sequelize.QueryTypes.SELECT})
            .then(function (users) {
                // We don't need spread here, since only the results will be returned for select queries
                return res.status(200).json(helpers.formatResponse(controller_name, req.method, users));
            });


    },
    put: function(req,res,next) {
          //var params = _.pick(req.body, 'shop_name', 'value');
         return res.status(500).json(helpers.formatResponse(controller_name,req.method,null,'Empty'));
    },
    delete: function(req,res,next) {
        return res.status(500).json(helpers.formatResponse(controller_name,req.method,null,'Empty'));
    }
};
