const signInButton = document.getElementById('signIn');
const signUpButton = document.getElementById('signUp');
const container = document.getElementById('container');

signInButton.addEventListener('click', () =>
    container.classList.add('right-panel-active'));

signUpButton.addEventListener('click', () =>
    container.classList.remove('right-panel-active'));

const logIn = document.querySelector(".overlay-container");
if (logIn){
    const buttonSignIn = logIn.querySelector("button.ghost.mt-5#signIn");
    if (buttonSignIn) {
        buttonSignIn.addEventListener("click", () => {
            logIn.classList.add("fade-out");
            setTimeout(() => {
                let url = new URL(window.location.href);
                if (url.pathname === "/auth/logout") {
                    url.pathname = "/auth/login";
                }
                window.location.href = url.href;
            }, 300);  // Thời gian chờ (ms) trước khi chuyển trang
        });
    }
    
}

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

 // Lưu tài khoản trong database
const formContainer = document.querySelector(".form-container.sign-up-container");
// email khi đăng ký
if (formContainer){
    const email = formContainer.querySelector("#loginInput");
    const name = formContainer.querySelector("#name");
    const password = formContainer.querySelector("#password");
    console.log(name);
    const buttonClick = formContainer.querySelector("#buttonClick");
    buttonClick.addEventListener("click", () => {
        const emailValue = email.value;
        const passwordValue = password.value;
        const nameValue = name.value;
        // Tạo một đối tượng người dùng mới với thông tin từ form
        const newUser = {
            name : nameValue,
            email: emailValue,
            password: passwordValue
        };
        console.log(newUser);
    })
}
// an hien con amt
const input1 = document.querySelector(".input1");

const eyeOpen = document.querySelector(".eye-open");

const eyeClose = document.querySelector(".eye-close");

eyeOpen.addEventListener("click", function(){
    eyeOpen.classList.add("hidden");
    input1.setAttribute("type","password");
    eyeClose.classList.remove("hidden");
});

eyeClose.addEventListener("click", function(){
    eyeOpen.classList.remove("hidden");
    eyeClose.classList.add("hidden");
    input1.setAttribute("type","text");
})

// hiển thị hình ảnh

function previewImage(event) {
    const preview = document.getElementById('avatarPreview');
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            preview.src = e.target.result;
        };
            reader.readAsDataURL(file);
        } else {
            preview.src = '#';
        }
    }

    const inputElement = document.getElementById('imageFile');
    inputElement.addEventListener('change', previewImage);
