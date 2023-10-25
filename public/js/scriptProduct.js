// // product

// // find this product

// function showDetail(){
//     let detail = document.querySelector('.detail');
//     let productId = new URLSearchParams(window.location.search).get('slug');
//     let thisProduct = product.filter(value =>{
//         return value.id = productId;
//     })[0];

//     // if there is no product has id = productId
//     // => return to home page
//     if (!thisProduct){
//         window.location.href = "/";
//     }

//     // and if has , add data this product in html
//     detail.querySelector('.image img').src = thisProduct.image;
//     detail.querySelector('.name').src = thisProduct.image;
//     detail.querySelector('.price').src = thisProduct.image;
//     detail.querySelector('.description').src = thisProduct.description;

//     // add data product similar

//     // show all products
//     let listProduct = document.querySelectorAll('.listProduct');
//     (product.filter(value=>value.id != productId))
//     .forEach(product=>{
//         let newProduct = document.createElement('a');
//         newProduct.href = '/detail?slug=' + product.id;
//         newProduct.innerHTML = `
//             <img src=${product.image}">
//             <h2>${product.name}<h2>
//             <div class="price">${product.price}</div>
//         `;
//         listProduct.appendChild(newProduct);
//     })
// }

// search product

function searchToggle(obj, evt){
    var container = $(obj).closest('.search-wrapper');
        if(!container.hasClass('active')){
            container.addClass('active');
            evt.preventDefault();
        }
        else if(container.hasClass('active') && $(obj).closest('.input-holder').length == 0){
            container.removeClass('active');
            // clear input
            container.find('.search-input').val('');
        }
}

// end search product

    // Show Alert
    const showAlert = document.querySelector("[show-alert]");
    if (showAlert) {
        const time = parseInt(showAlert.getAttribute("data-time")) || 3000;
        const closeAlert = showAlert.querySelector("[close-alert]");
    
      // Hàm để ẩn đi cảnh báo
        const hideAlert = () => {
            showAlert.classList.add("alert-hidden");
        };
    
      // Thiết lập timeout để ẩn đi cảnh báo sau khoảng thời gian đã cho
        const timeoutId = setTimeout(hideAlert, time);
    
      // Xử lý sự kiện khi click vào nút đóng (dấu X)
        closeAlert.addEventListener("click", () => {
            // Hủy timeout để ngăn việc ẩn đi cảnh báo
            clearTimeout(timeoutId);
            // Gọi hàm để ẩn đi cảnh báo
            hideAlert();
        });
    }
    
    // End Show Alert