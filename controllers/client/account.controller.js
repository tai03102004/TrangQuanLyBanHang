// const Auth = require("../../models/auth.model");

// module.exports.index = async(req,res) =>{
//     // const name_id = res.locals.user.name_id;
    
//     const account = await Auth.findOne(
//         { name_id : name_id },
//         {deleted  : false }
//     );

//     res.render("client/pages/account/user.pug",{
//         pageTitle:"Tài khoản",
//         account: account
//     })
// }

// module.exports.edit = async (req,res) =>{
//     const name_id = res.locals.user.name_id;
    
//     const account = await Auth.findOne(
//         { name_id : name_id },
//         {deleted  : false }
//     );
//     // console.log(res.locals.user);
//     // console.log(account);
//     res.render("client/pages/account/profile.pug",{
//         pageTitle:"Tài khoản của tôi",
//         account: account
//     })
// }

// module.exports.editPatch = async (req, res) => {
//     // const id = req.params.id;
//     // const email = req.body.email;
//     // const phone = req.body.phone;
//     // const name =req.body.name;
//     req.body = res.locals.user;
//     const name_id = req.params.name_id;

//     await Auth.updateOne(
//         {name_id: name_id},
//         req.body // Lấy ra hết phần tử req.body
        
//     );

//     req.flash("success","Cập nhật tài khoản thành công");

//     res.redirect("/account/profile");
// };

