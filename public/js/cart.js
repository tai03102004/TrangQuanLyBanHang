// Update sản phẩm trong giỏ hàng

const inputsQuantity = document.querySelectorAll("input[name='quantity']");

if (inputsQuantity.length > 0) {
    inputsQuantity.forEach(input => {
        input.addEventListener("change", (e)=> {
            const productId = input.getAttribute("product-id");
            const quantity = input.value;
            if (parse.int(quantity) > 1 ){
                window.location.href = `/cart/update/${productId}/${quantity}`;
            } 
        });
    })
}

// hết update sản phẩm