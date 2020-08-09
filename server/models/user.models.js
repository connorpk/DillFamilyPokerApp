const pool = require('../configs/mysql.config');
const bcrypt = require('bcrypt');

function updateUserInfo(userInfoOld, userInfoNew, res){

    let updatedUser = {
        firstname: userInfoNew.firstname == userInfoOld.firstname ? userInfoOld.firstname : userInfoNew.firstname,
        lastname: userInfoNew.lastname == userInfoOld.lastname ? userInfoOld.lastname : userInfoNew.lastname,
        email: userInfoNew.email == userInfoOld.email ? userInfoOld.email : userInfoNew.email
    }

    pool.query("UPDATE user SET firstname = ?, lastname = ?, emailaddress = ? WHERE username = ?", [updatedUser.firstname, updatedUser.lastname, updatedUser.email, userInfoOld.username], (err)=>{
        console.log(userInfoOld);
        console.log(userInfoOld.id);
        if(err){
            return res.send({success: false, msg: err})
        }
        return res.send({success: true, msg:"Sucessfully updated user information."})
    })
}

function updateUserPassword(oldInfo, newInfo, res){
    bcrypt.compare(newInfo.oldPassword, oldInfo.password, (err, same)=>{
        if(err){
            return res.send({success: false, msg: "Something went wrong, please try again later."})
        }
        if(!same){
            return res.send({success: false, msg: "Old password doesn't match"})
        }
        bcrypt.hash(newInfo.newPassword, 10, (err, hash)=>{
            if(err){
                return res.send({success: false, msg: "Something went wrong, please try again later."})
            }
            pool.query('UPDATE user SET password = ? WHERE username = ?', [hash, oldInfo.username], (err)=>{
                if(err){
                    return res.send({success: false, msg: "Something went wrong, please tyr again later."});
                }
                return res.send({success: true, msg: "Sucessfully updated password"});
            })
        })
    })
}

module.exports.updateUserPassword = updateUserPassword;
module.exports.updateUserInfo = updateUserInfo;