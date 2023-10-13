const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
mongoose.plugin(slug);

const productCategorySchema = new mongoose.Schema(
{
    title: String,
    parent_id: { // danh mục cha
        type: String,
        default: ""
    },
    description: String,
    thumbnail: String,
    featured : String,
    status: String,
    position: Number,
    slug: {
        type: String,
        slug: "title",
        unique: true, // ko có 2 gt slug trong csdl
    },
    deleted: {
        type: Boolean,
        default: false,
    },
    deletedAt: Date,
},
    { timestamps: true }
);
// Định nghĩa model product (tên model , schema(các thuộc tính models) , tên collection)

const ProductCategory = mongoose.model(
    "ProductCategory",
    productCategorySchema,
    "products-category"
);

module.exports = ProductCategory;
