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