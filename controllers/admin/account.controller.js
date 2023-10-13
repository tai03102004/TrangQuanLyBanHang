const Account = require("../../models/account.model");

const systemConfig = require("../../config/system");

const Role = require("../../models/roles.model");
// chuẩn hoá mật khẩu random 30 ký tự 
const md5 = require("md5");

// [GET] /admin/account
module.exports.index = async (req, res) => {
  const records = await Account.find({
    deleted: false
  });

  for (const record of records){
    const role = await Role.findOne({_id: record.role_id});
    record.role = role;
  }

  res.render("admin/pages/accounts/index", {
    pageTitle: "Danh sách tài khoản",
    records: records
  });
}

// [GET] /admin/account/create

module.exports.create = async (req, res) => {
  const roles = await Role.find({
    deleted: false,
  });

  res.render("admin/pages/accounts/create", {
    pageTitle: "Tạo mới tài khoản",
    roles: roles,
  });
};

// [GET] /admin/account/createPost

module.exports.createPost = async (req, res) => {
  // password mình nhập vào sẽ random 31 ký tự (dù mình nhập có 5-6 từ)

  req.body.password = md5(req.body.password);

  console.log(req.body);

  const record = new Account(req.body);

  await record.save();

  res.redirect(`/${systemConfig.prefixAdmin}/accounts`);

}

// [GET] /admin/account/edit

module.exports.edit = async (req, res) => {
  let find = {
    _id: req.params.id,
    deleted: false,
  };

  try {
    const data = await Account.findOne(find);

    const roles = await Role.find({
      deleted: false,
    });

    res.render("admin/pages/accounts/edit", {
      pageTitle: "Chỉnh sửa tài khoản",
      data: data,
      roles: roles,
    });
  } catch (error) {
    res.redirect(`/${systemConfig.prefixAdmin}/accounts`);
  }
};

// [GET] /admin/account/editPatch 

module.exports.editPatch = async (req, res) => {
  
  if (req.body.password){
    req.body.password = md5(req.body.password);
  }
  else {
    delete req.body.password;
  }

  await Account.updateOne({_id:req.params.id}, req.body);

  res.redirect("back");
}