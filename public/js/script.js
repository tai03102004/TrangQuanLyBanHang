const menu=document.querySelector(".menu");
const toggle=document.querySelector(".toggle");
console.log(toggle);
toggle.addEventListener("click",()=>{
    menu.classList.toggle("active");
})
// $(document).ready(function() {
//     const $gallery = $('.gallery a').simpleLightbox();
// });
const emailInput = document.getElementById('email');
    const errorMessage = document.getElementById('error-message');

    emailInput.addEventListener('input', function() {
        const email = emailInput.value;
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

        if (emailPattern.test(email)) {
            errorMessage.textContent = ''; // Clear any previous error message
        } else {
            errorMessage.textContent = 'Email is not valid';
        }
    });

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