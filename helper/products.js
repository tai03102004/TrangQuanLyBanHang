// Tính ra giá mới nhiều sản phẩm
module.exports.priceNewProducts = (products) => {
  // Lấy ra từng giá sản phẩm sau tìm giá mới
  const newProducts = products.map(item => {
    item.priceNew = ((item.price * (100 - item.discountPercentage)) / 100).toFixed(0);

    return item;
  });

  return newProducts;
}

// Tính ra giá mới 1 sản phẩm

module.exports.priceNewProduct = (product) => {
  // Lấy ra giá sau khi giảm giá
  const priceNew = ((product.price * (100 - product.discountPercentage)) / 100).toFixed(0);
  return priceNew;
}