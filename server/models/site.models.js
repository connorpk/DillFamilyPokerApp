const pool = require('../configs/mysql.config');

function getPlayers(req, res){
    pool.query('SELECT * FROM user WHERE userid <> 1 AND activated = 1', (err, players)=>{
        if(err){
            return res.send({success: false, msg: "Something went wrong please try again later."});
        }
        return res.send({success: true, msg: "Successfully pulled players", players});
    })
}

module.exports.getPlayers = getPlayers;