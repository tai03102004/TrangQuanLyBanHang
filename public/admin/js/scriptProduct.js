// Lọc sản phẩm
const buttonsStatus = document.querySelectorAll("[button-status]");
// Tất cả sẽ được gán button
if(buttonsStatus.length > 0) { 
    let url = new URL(window.location.href);  // href admin/products
    buttonsStatus.forEach(button => {
        button.addEventListener("click", () => {
            const status = button.getAttribute("button-status"); // thêm button status vào
            // status : "" or active or inactive
            if(status != "") { 
                url.searchParams.set("status", status); 
                // để thêm vào trang web thuộc tính vd : ?statuc = "active"
            } else {
                url.searchParams.delete("status");
                // = rỗng thì xoá đưa về trạng thái ban đầu
            }
            window.location.href = url.href; // gán lại href về href đã thay đổi
        });
    });
}
// Kết thúc lọc

// Form Search : Tìm kiếm sản phẩm
const formSearch = document.querySelector("#form-search");
if(formSearch) {
    let url = new URL(window.location.href);
    
    formSearch.addEventListener("submit", (e) => {
        e.preventDefault(); // Loại bỏ những hành vi mặc định
        const value = e.target.elements.keyword.value; // key của value mình nhập
        if(value != "") { 
            url.searchParams.set("keyword", value); // tương tự bên filter : tìm kiểm
            // :   /products?keyword = key
        } else {
            url.searchParams.delete("keyword");
        }

        window.location.href = url.href;
    });
}
// End Form Search

// Pagination

const buttonsPagination = document.querySelectorAll("[button-pagination]");
if(buttonsPagination.length > 0) {
    let url = new URL(window.location.href); // Get URL form

    buttonsPagination.forEach(button => {
        button.addEventListener("click", () => {
        const page = button.getAttribute("button-pagination"); // get attribute in button-pagination

        url.searchParams.set("page", page); // Thêm href dạng products/?page=

        window.location.href = url.href; // href thay bằng cái mình thay đổi

        }); 
    });
}
// End Pagination

// Change Status

const buttonsChangeStatus = document.querySelectorAll("[button-change-status]");
if(buttonsChangeStatus.length > 0) {
    const formChangeStatus = document.querySelector("#form-change-status");
    const path = formChangeStatus.getAttribute("data-path");
    buttonsChangeStatus.forEach(button => {
        button.addEventListener("click", () => {
            const statusCurrent = button.getAttribute("data-status");  
            const id = button.getAttribute("data-id");
            const statusChange = statusCurrent == "active" ? "inactive" : "active";
            const action = path + `/${statusChange}/${id}?_method=PATCH`;

            formChangeStatus.action = action;
            // formChangeStatus.setAttribute("action", action);
            formChangeStatus.submit();  // gửi yêu cầu đến http và action sẽ được gán theo yêu cầu

        });
    })
}
// End Change Status

// Checkbox Multi
const checkboxMulti = document.querySelector("[checkbox-multi]");
if (checkboxMulti) {
  const inputCheckAll = checkboxMulti.querySelector("input[name='checkall']");
  const inputsId = checkboxMulti.querySelectorAll("input[name='id']"); // id 
  // phần xử lý checkBoxALl
  inputCheckAll.addEventListener("click", () => {
    if (inputCheckAll.checked) { // kiểm tra xem cái checkbox nó có được tích hay ko
      inputsId.forEach((input) => {
        input.checked = true; // tất cả checkbox đều được chọn
      });
    } else {
      inputsId.forEach((input) => {
        input.checked = false; // ko được chọn chuyển nó thành false
      });
    }
  });
  // checkboxId
  inputsId.forEach((input) => {
    input.addEventListener("click", () => {
      const countChecked = checkboxMulti.querySelectorAll("input[name='id']:checked").length;
      if(countChecked == inputsId.length) { // nếu tích hết thì cái checkBoxAll sẽ đc tích
        inputCheckAll.checked = true;
      } else {
        inputCheckAll.checked = false; // còn nếu bỏ thì gán = false
      }
    });
  });
}
// End Checkbox Multi

// form-change-multi
const formChangeMulti = document.querySelector("[form-change-multi]");
// console.log(formChangeMulti);
if(formChangeMulti) {
  formChangeMulti.addEventListener("submit", (e) => {
    e.preventDefault(); // loại bỏ mặc định

    const checkboxMulti = document.querySelector("[checkbox-multi]");
    const inputsChecked = checkboxMulti.querySelectorAll("input[name='id']:checked"); // các id đã được tick

    const typeChange = e.target.elements.type.value; // lấy ra kiểu dữ liệu trong file pug
    if(typeChange == "delete-all") {
      const isConfirm = confirm("Bạn có chắc muốn xóa những bản ghi này?");

      if(!isConfirm) { // nếu bạn ko xoá thì nó sẽ ko làm gì cả
        return ; 
      }
    }

    if(inputsChecked.length > 0) {
      let ids = []; // lưu các id khi mình tick là các String
      const inputIds = formChangeMulti.querySelector("input[name='ids']"); // lấy ra ids ở change-multi.pug
      inputsChecked.forEach(input => { // các cái mình tick vào
        const id = input.value; // id là các id Product (String)

        if(typeChange == "change-position") {
          // dùng closest để truy cập vào phần tử cha gần nhất để mình có thể lấy position từ input ngay gần kề cái trên
          const position = input.closest("tr").querySelector("input[name='position']").value; 
          ids.push(`${id}-${position}`); // nếu có sẽ lưu id và vị trí (position);
        } else {
          ids.push(id);  // ko thì lưu id
        } 
      }); // ids sẽ lấy các id của sản phẩm

      inputIds.value = ids.join(", "); // cái value trong inputIds sẽ là các string id;

      formChangeMulti.submit(); // cần có e.preventDefault
    } else {
      alert("Vui lòng chọn ít nhất một bản ghi!");
    }
  });
}
// End form-change-multi

// Change Status

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
        formDeleteItem.submit();
      }
    });
  });
}

// End Change Status

// Show Alert
const showAlert = document.querySelector("[show-alert]");
if(showAlert) {
  const time = parseInt(showAlert.getAttribute("data-time")) || 3000;
  const closeAlert = showAlert.querySelector("[close-alert]");

  setTimeout(() => {
    showAlert.classList.add("alert-hidden");
  }, time);

  closeAlert.addEventListener("click", () => {
    showAlert.classList.add("alert-hidden");
  });
}
// End Show Alert

// Upload Image
const uploadImage = document.querySelector("[upload-image]");
if(uploadImage) {
  const uploadImageInput = uploadImage.querySelector("[upload-image-input]");
  const uploadImagePreview = uploadImage.querySelector("[upload-image-preview]");

  uploadImageInput.addEventListener("change", (e) => {
    if (e.target.files.length) {
      const image = URL.createObjectURL(e.target.files[0]);

      uploadImagePreview.src = image;
    }
  });
}
// End Upload Image