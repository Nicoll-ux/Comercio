let cart = []; // Almacenar los productos en el carrito

//añadir productos al carrito
function addToCart(productName, productPrice, productImage) {
    const existingProduct = cart.find(item => item.name === productName);
    
    if (existingProduct) {
        existingProduct.quantity += 1; 
    } else {
        cart.push({
            name: productName,
            price: productPrice,
            quantity: 1,
            image: productImage 
        });
        const cartIcon = document.querySelector('.cart-icon');
        cartIcon.classList.add('animate-cart');
        setTimeout(() => cartIcon.classList.remove('animate-cart'), 500); 
    }

    updateCartCount(); 
    updateCartView();  
}


// Actualizar contador del carrito
function updateCartCount() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').textContent = cartCount;
}

function toggleCart() {
    const cartModal = document.getElementById('cart-modal');
    const overlay = document.getElementById('overlay');
    if (cartModal.style.display === 'block') {
        cartModal.style.display = 'none';
        overlay.style.display = 'none';
    } else {
        cartModal.style.display = 'block';
        overlay.style.display = 'block';
    }
}

// Mostrar el contenido del carrito
function updateCartView() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalContainer = document.getElementById('cart-total');
    cartItemsContainer.innerHTML = '';
    
    let total = 0;
    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <img src="${item.image}" alt="${item.name}" style="width: 50px; height: auto; margin-right: 10px;"> 
            ${item.name} - $${item.price} x ${item.quantity}
            <button onclick="removeFromCart(${index})">Eliminar</button>
            <button onclick="increaseQuantity(${index})">+</button>
            <button onclick="decreaseQuantity(${index})">-</button>
        `;
        cartItemsContainer.appendChild(li);
        total += item.price * item.quantity;
    });
    cartTotalContainer.textContent = total;
}


// eliminar productos del carrito
function removeFromCart(index) {
    cart.splice(index, 1); 
    updateCartCount(); 
    updateCartView(); 
}

function increaseQuantity(index) {
    cart[index].quantity += 1;
    updateCartCount();
    updateCartView();
}

function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
    } else {
        removeFromCart(index); 
    }
    updateCartCount();
    updateCartView();
}

// vaciar el carrito
function emptyCart() {
    cart = []; 
    updateCartCount(); 
    updateCartView(); 
}
