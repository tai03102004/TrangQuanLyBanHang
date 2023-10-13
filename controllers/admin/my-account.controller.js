const Account = require("../../models/account.model");

const md5 = require("md5");


module.exports.index = async (req,res) =>{ 

    res.render("admin/pages/my-account/index.pug",{
        pageTitle:"Thông tin cá nhân",
    });

};

module.exports.edit = async(req,res)=>{
    res.render("admin/pages/my-account/edit.pug",{
        pageTitle: "Chỉnh sửa thông tin cá nhân",
    }); 
}

module.exports.editPatch = async(req,res)=>{
    if (req.body.password){
        req.body.password = md5(req.body.password);
    }
    else {
        delete req.body.password;
    }
    await Account.updateOne(
        {
            _id: res.locals.user.id,
        },
        req.body
    );
    
    res.redirect("back");
}