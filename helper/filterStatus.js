module.exports = (query) =>{
    // Lọc trạng thái sản phẩm theo trạng thái(status) 
    let filterStatus = [
        {
            name: "Tất cả", 
            status: "", // Trạng thái
            class: ""
        },
        {
            name: "Hoạt động",
            status: "active",
            class: ""
        },
        {
            name: "Dừng hoạt động",
            status: "inactive",
            class: ""
        }
    ];
    if(query.status) { // trạng thái trong status : active or inactive
        const index = filterStatus.findIndex((item) => {
            return item.status == query.status;
        }); // trả về vị trí mà mình muốn thêm active

        filterStatus[index].class = "active"; // sẽ bôi đậm vào cái mình trỏ vào
    } 
    // trang thái tất cả
    else {
        const index = filterStatus.findIndex((item) => {
            return item.status == ""; // ko tìm thấy sẽ gán = "";
        });
    
        filterStatus[index].class = "active"; // sẽ bôi đậm vào cái mình trỏ vào
    }
    return filterStatus;
    // Kết thúc lọc
}