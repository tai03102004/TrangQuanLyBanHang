const mongoose = require("mongoose");
// Lấy thông tin , kiểu dữ liệu là các object;
const slug = require("mongoose-slug-updater");
mongoose.plugin(slug); // để tạo đường dẫn sau dấu / đẹp hơn trong mắt người dùng
const productSchema = new mongoose.Schema(
    {
        title: String,
        // vì khi ta create trong csdl thì cái name = product_category_id => phải thêm dữ liệu
        product_category_id:{
            type:String,
            default:""
        },
        description: String,
        price: Number,
        discountPercentage: Number,
        stock: Number,
        thumbnail: String,
        status: String,
        featured: String, // sản phẩm nổi bật ; 1 : nổi bật 
        position: Number,
        slug: {
            type: String, // xác định kiểu của slug là chuỗi
            slug: "title", // định nghĩa các slug (vd : anh hai = > anh-hai)
            unique: true  // ko thể cài 2 giá trị slug có cùng tên
        },
        deleted: {
            type: Boolean, // true : product đã bị xoá , false : ko
            default: false, // mặc định tài liệu chưa bị xoá 
        },
        // deletedAt: Date, // ghi thời điểm xoá
        createBy:{
            account_id : String, // id : Sản phẩm
            createAt: {
                type : Date,
                default : Date.now // Chỉ lấy khi tạo sản phẩm
            }
        },
        deleteBy:{
            account_id : String, // id của tài khoản = id sản phẩm
            deleteAt: Date // ngày xoá lưu vào database
        },
        // Lưu 1 mảng các sản phẩm 
        updateBy :[
            {
                account_id : String,  // id người dùng
                updateAt: Date  // ngày update
            }
        ]
    },
    // { timestamps: true } // nó sẽ tạo ra 2 trường (createdAt : time tạo product) , (updatedAt : thời gian cập nhật sản phẩm)
);
// Định nghĩa model product (tên model , schema , tên collection)
const Product = mongoose.model("Product", productSchema, "products");

module.exports = Product;