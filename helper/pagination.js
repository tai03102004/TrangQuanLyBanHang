module.exports = (objectPagination, query, countProducts) => {

    if(query.page) { // Trang mà bạn bấm vào
        objectPagination.currentPage = parseInt(query.page); // Trang đầu tiên thay đổi khi bạn nhấn vào
    }
    if (countProducts === 0){
        objectPagination.currentPage = 1;
    }
    objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItems; // Số sản phẩm bạn bỏ qua

    objectPagination.totalPage = Math.ceil(countProducts/objectPagination.limitItems); // Tổng số trang

    return objectPagination;
}