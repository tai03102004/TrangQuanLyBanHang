const menu=document.querySelector(".menu");
const toggle=document.querySelector(".toggle");
console.log(toggle);
toggle.addEventListener("click",()=>{
    menu.classList.toggle("active");
})
// $(document).ready(function() {
//     const $gallery = $('.gallery a').simpleLightbox();
// });
