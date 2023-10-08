// Permissions (Phân quyền)

const tablePermissions = document.querySelector("[table-permissions]");
if (tablePermissions){
    const buttonSubmit = document.querySelector("[button-submit]");
    // Khi ấn submit thì sẽ hiện id của Admin
    buttonSubmit.addEventListener("click",()=>{
        let result = []; // Các obj chứa id ADMIN và permissions
        // Lấy thông tin từng hàng một
        const rows = document.querySelectorAll("[data-name]");
        
        // Lặp để lấy ra từng thông tin của các ô (view , create , edit,delete , ...)

        rows.forEach(row => {
            const name = row.getAttribute("data-name");
            const inputs = row.querySelectorAll("input"); // lấy ra hết ô input trong row
            if (name == "id"){
                inputs.forEach(input => {
                    const value = input.value; // Lấy ra hết id ADMIN
                    result.push({
                        id:  value, // id ADMIN,
                        permissions: [],
                    });
                })
            }
            else {
                // Cột đầu có index là 0
                inputs.forEach((input,index) => {
                    
                    const checked = input.checked; // TRUE : được tick trong ADMIN , FALSE: ngược lại

                    if (checked){
                        // Thêm các quyền mà đã tích ADMIN
                        result[index].permissions.push(name);
                    }
                });
            }
        });
        
        const formChangePermission = document.querySelector("#form-change-permissions");
        const inputPermissions = formChangePermission.querySelector("input");
        // Lấy ra id chứa các permissions là các cái mình tick vào 
        inputPermissions.value = JSON.stringify(result);
    
        formChangePermission.submit(); // Để gửi lên backend
    });

}
// End permissions

// Permissions Data Default
// Hiển thị cái mình đã tick

const dataRecords = document.querySelector("[data-records]");

if (dataRecords){
    const records = JSON.parse(dataRecords.getAttribute("data-records")); // chuyển về mảng các obj
    
    const tablePermissions = document.querySelector("[table-permissions]");

    records.forEach((record,index) =>{
        const permissions = record.permissions; // các cái mình đã tick
        // console.log(record.title);
        // console.log(permissions);
        // các giá trị mà mình tick
        permissions.forEach(permission =>{
            const row = tablePermissions.querySelector(`tr[data-name="${permission}"`);
            const input = row.querySelectorAll("input")[index];
            // giá trị của ô input mà bạn tick
            input.checked = true;
            // console.log(input);
        });
    });
}

// End Permissions Data Default

// xoa cac phan tu
const buttonsDelete = document.querySelectorAll("[button-delete]"); // lấy all bản ghi

if (buttonsDelete.length > 0) { 
    const formDeleteItem = document.querySelector("#form-delete-item"); 
    const path = formDeleteItem.getAttribute("data-path"); // lấy ra cái path mà mình muốn xoá

    buttonsDelete.forEach((button) => { 
        button.addEventListener("click", () => {
        const confirmDelete = confirm("Bạn có chắc muốn xóa bản ghi này?");

        if(confirmDelete) {
            const id = button.getAttribute("data-id");  // lấy ra id 

            const action = path + `/${id}?_method=DELETE`; // thuộc tính xoá

            formDeleteItem.action = action; // href khi xoá
            // console.log(formDeleteItem.submit());
            formDeleteItem.submit(); // đưa lên backend
        }
        });
    });
}