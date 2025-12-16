let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
var modal = document.getElementById("myModal");
var cartButton = document.getElementById("view-cart");
var closeButton = document.getElementById("close");
var contactName = document.getElementById('contact-name');
var contactEmail = document.getElementById('contact-email');
var contactMessage = document.getElementById('contact-message');

// Code so that the cart modal opens
cartButton.onclick = function() {
    modal.style.display = 'block';
    modalDisplay();
};

// Code so that the cart modal can close
closeButton.onclick = function() {
    modal.style.display = 'none';
    var cartItems = document.querySelector('.cart-items');
    cartItems.innerHTML = '';
};

// Code for the modal so that it can update dynamically as items are added
function modalDisplay() {
    var cartItems = document.querySelector('.cart-items');
    cartItems.innerHTML = '';
    
    let total = 0;
    cart.forEach(item => {
        cartItems.innerHTML += `<p>${item.itemName} - $${item.itemPrice} - x ${item.quantity}</p>`;
        const cartTotal = item.itemPrice * item.quantity;
        total += cartTotal;
        document.getElementById('total-price').textContent = total.toFixed(2);

    });
    
    if(cart.length === 0) {
        cartItems.innerHTML = `<p>Cart is Empty</p>`;
        document.getElementById('total-price').textContent = 0;
    };
};

// Code that allows the user to add items to the cart, while saving item info in session storage
function addToCart(event) {
    var button = event.target;
    var id = button.getAttribute('data-id');
    var itemName = button.getAttribute('data-name');
    var itemPrice = parseFloat(button.getAttribute('data-price'));

    const itemCart = cart.find(item => item.id == id);
    

    if(itemCart) {
        itemCart.quantity++;
    } else {
        cart.push({
        id,
        itemName,
        itemPrice,
        quantity: 1
    });
    }

    sessionStorage.setItem('cart', JSON.stringify(cart));
    cartCount();
};

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener("click", addToCart);
});

// Code that updated the cart count on the Nav bar
function cartCount(){
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('count').textContent = cartCount;
};

document.addEventListener("DOMContentLoaded", function() {
    cartCount();
});

// Code that would allow the user to clear their cart and remove all items
document.getElementById('clear-button')?.addEventListener('click', function() {
    cart = [];
    sessionStorage.removeItem('cart');
    cartCount();
    var cartItems = document.querySelector('.cart-items');
    var message = document.createElement('p');
    cartItems.innerHTML = '';
    message.innerHTML = 'Cart Cleared';
    document.getElementById('total-price').textContent = 0;
    cartItems.appendChild(message);
})

// Code that allows the user to process their order while also clearing session storage
document.getElementById('process-button')?.addEventListener('click', function() {
    cart = [];
    sessionStorage.removeItem('cart');
    cartCount();
    var cartItems = document.querySelector('.cart-items');
    var message = document.createElement("p");
    cartItems.innerHTML = '';
    message.innerHTML = 'Thank You for your order!<br /> Please wait for a confirmation email.';
    document.getElementById('total-price').textContent = 0;
    cartItems.appendChild(message);
});

// Code that would allow the user to fill out the contact form, while also saving info in local storage
document.getElementById('contact-input')?.addEventListener('submit', function(event) {
    event.preventDefault();
    var name = contactName.value;
    var email = contactEmail.value;
    var message = contactMessage.value;

    var contactData = { name, email, message};
    localStorage.setItem('contact-form-data', JSON.stringify(contactData));

    alert('Thank you for your message, we will get back to you as soon as possible.')
    document.getElementById('contact-input').reset();

});

// Code that allows the user to sign up for the store's newsletter
document.getElementById('newsletter-form')?.addEventListener('submit', function(event) {
    event.preventDefault();
    
    alert('Thank you for joining our email newsletter!');

    document.getElementById('news-email').value = '';
});

// Code for the specials page that would allow the user to get a coupon code for a specific item
document.querySelectorAll('.coupon-btn').forEach(button => {
    button.addEventListener('click', function(event) {
        const button = event.target;
        const couponData = button.getAttribute('data-name');

        if (couponData == 'plant') {
            alert('PLANT15');
        } else if (couponData == 'tree') {
            alert('TREE20');
        } else {
            alert('DIRT20');
        }
    });
});
