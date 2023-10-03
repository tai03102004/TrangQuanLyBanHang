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