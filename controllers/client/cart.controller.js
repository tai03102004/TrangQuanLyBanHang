
const Cart = require("../../models/cart.model");
const Product =require("../../models/product.model");

const productsHelper = require("../../helper/products.js");

// [GET]/cart
module.exports.index = async (req,res) => {
    const cartId = req.cookies.cartId ;
    const cart = await Cart.findOne({
        _id: cartId,
    });
    if (cart.products.length > 0) {
        for (const item of cart.products) {
            const productID = item.product_id;
            const productInfo = await Product.findOne({
                _id : productID
            });
            // gía sau khi giảm giá trong giỏ hàng
            productInfo.priceNew = await productsHelper.priceNewProduct(productInfo);

            item.productInfo = productInfo;
            item.totalPrice = item.quantity * productInfo.priceNew ;
            
        } 
    }

    cart.totalPrice = cart.products.reduce((sum,item)=> sum + item.totalPrice ,0 )

    res.render ("client/pages/cart/index",{
        pageTitle: "Giỏ hàng ",
        cartDetail : cart
    })
}

// [POST]/cart.add/:productId

module.exports.addPost = async (req,res) => {

    const cartId = req.cookies.cartId; // id giỏ hàng cookies
    const productId = req.params.productId; // id sản phẩm
    const quantity =parseInt(req.body.quantity); // số lượng sp
    const userId = req.cookies.token;
    console.log(userId);
    const cart = await Cart.findOne({
        _id : cartId,
    })
    // Tìm kiếm sản phẩm đã tồn tại hay chưa
    const existProductInCart = cart.products.find(item => item.product_id == productId);

    if(existProductInCart) {
        const newQuantity = quantity + existProductInCart.quantity;
        await Cart.updateOne (
            {
                _id : cartId,
                'products.product_id' : productId
            },
            {
                'products.$.quantity' : newQuantity
            }
        )
    }
    else {
        const objectCart = {
        product_id : productId,
        quantity : quantity,
        }

        await Cart.updateOne(
            {
                _id: cartId,
            },
            {
                $push: {products : objectCart }
            },
        )
        req.flash("success","Thêm sản phẩm vào giỏ hàng thành công! ");
    }
    res.redirect("back");
}

// [GET] / cart/delete/:productId
module.exports.delete = async(req,res) => {
    const productId = req.params.productId;

    const cardId =  req.cookies.cartId ;

    await Cart.updateOne(
        {
            _id : cardId
        },
        {
            "$pull" : {products :{"product_id": productId}}
        }
    )

    req.flash("success","Đã xoá sản phẩm khỏi giỏ hàng!");

    res.redirect("back");
}

// [GET] / cart/update/:productId/:quantity
module.exports.update = async(req,res) => {
    const productId = req.params.productId;

    const cardId =  req.cookies.cartId ;

    const quantity = req.params.quantity;

    await Cart.updateOne(
        {
            _id : cardId,
            'products.product_id' : productId
        },
        {
            'products.$.quantity' : quantity,
        }
    )

    req.flash("success","Cập nhật sản phẩm của giỏ hàng thành công!");

    res.redirect("back");
}