let count = 0; // đếm tổng thành phần (STT sản phẩm)

function createTree(arr, parentId = "") {
    // thằng cha có parentId là rỗng
    // đầu tiên parentId đang là rỗng nên sẽ in ""
    // parentId của cha cũng là rỗng
    // parentId in ra hết id của cha và con
    const tree = [];
    arr.forEach((item) => {
        if (item.parent_id === parentId) { // lúc đầu parentId của cha là rỗng
            count++;
            const newItem = item;  // tất cả thông tin trong product-category
            newItem.index = count; // thêm index trong neItem
            const children = createTree(arr, item.id); // gọi lại
            if (children.length > 0) {
                newItem.children = children; // các thằng con
            }
            tree.push(newItem);
        }
    });
    return tree;
}

module.exports = (arr, parentId = "") => {
    count = 0;
    const tree = createTree(arr, parentId = "");
    return tree;
}