module.exports = (query) => {
    let objectSearch = {
        keyword: "",
        regex: ""
    }

    if (query.keyword) {
        // Loại bỏ dấu cách thừa và chuẩn hóa từ khóa
        const cleanKeyword = query.keyword.replace(/\s+/g, ' ').trim().toLowerCase();
        objectSearch.keyword = cleanKeyword;

        // Tạo regex từ từ khóa đã được làm sạch
        const regex = new RegExp(cleanKeyword, "i");
        objectSearch.regex = regex;
    }

    return objectSearch;
}
