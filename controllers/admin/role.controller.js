const Role = require("../../models/roles.model");

const systemConfig = require("../../config/system");

// [GET] /admin/roles
module.exports.index = async (req, res) => {
  const records = await Role.find({
    deleted: false
  });

  res.render("admin/pages/roles/index", {
    pageTitle: "Danh sách nhóm quyền",
    records: records
  });
}

// [GET] /admin/roles/create
module.exports.create = async (req, res) => {
  res.render("admin/pages/roles/create", {
    pageTitle: "Tạo mới nhóm quyền",
  });
}


// [POST] /admin/roles/createPost
module.exports.createPost = async (req, res) => {
  console.log(req.body);
  const record = new Role(req.body);
  await record.save();

  req.flash("success", "Thêm nhóm quyền thành công");

  res.redirect(`/${systemConfig.prefixAdmin}/roles`);
}

// [GET] /admin/roles/edit/:id
module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id; // id người ta gửi lên

    const data = await Role.findOne({
      _id: id,
      deleted: false
    }); // tìm ra id và deleted

    res.render("admin/pages/roles/edit", {
      pageTitle: "Chỉnh sửa nhóm quyền",
      data: data
    });
  } catch (error) {
    res.redirect(`/${systemConfig.prefixAdmin}/roles`);
  }
}

// [PATCH] /admin/roles/edit/:id
module.exports.editPatch = async (req, res) => {
  const id = req.params.id;

  await Role.updateOne({ _id: id }, req.body);

  req.flash("success", "Cập nhật nhóm quyền thành công");

  res.redirect("back");
}

// [GET] / admin/roles/permissions

module.exports.permissions =  async (req, res) => {
  const records = await Role.find({
    deleted: false,
  });
  res.render("admin/pages/roles/permission",{
    pageTitle: "Trang phân quyền",
    records : records
  });
}

module.exports.permissionsPatch =  async (req, res) => {
  // fontend sẽ chuyển về String nên BackEnd phải chuyển lại về mảng
  const permissions = JSON.parse(req.body.permissions);

  // Lặp qua từng phần tử để lưu nó vào dataBase
  for (const item of permissions){
    await Role.updateOne(
      {
      _id : item.id,
      },
      {
        permissions: item.permissions
      }
    )
  }
  req.flash("success","Cập nhật phần Phân quyền thành công")
  res.redirect("back");
}

// [POST]/admin/roles/detail/:id

module.exports.detail = async(req,res)=>{
  const id = req.params.id;
  const records = await Role.findOne({
    deleted: false
  });

  res.render ("admin/pages/roles/detail.pug",{
    _id : id,
    records : records
  })
}

// [POST]/admin/roles/delete/:id
module.exports.deleteItem = async(req, res) =>{
  const id = req.params.id;
  await Role.updateOne({_id:id},{
    deleted:true,
    deletedAt: new Date()
  })

  req.flash("success", `Xóa thành công sản phẩm!`);

  res.redirect("back");

}