document.addEventListener('DOMContentLoaded',()=>{document.querySelectorAll('.categories button').forEach(button=>{button.addEventListener('click',()=>{filterProducts(button.getAttribute('data-category'))})});document.querySelector('.cart-icon').addEventListener('click',toggleCart);document.querySelector('#empty-cart-btn').addEventListener('click',emptyCart)})