import { quantityIncreaseDecrease, removeFromCart, updateCounter} from "./component.js";
import { searchProduct } from "./createItem.js";

var totalPrice = document.querySelector('.price');
var price = parseInt(totalPrice.innerText.substring(1));

window.addEventListener('load', () =>{
    displayCart();
    quantityIncreaseDecrease();
    updateQuantity();

    document.querySelectorAll('.remove button').forEach(element => {
        element.addEventListener('click', event => {
            const item = event.target.closest('.cart-item');
            const quantity = item.querySelector('.qty-slider input').value;
            item.remove();
            searchProduct(item.querySelector('.item-name').innerText);
            let product = localStorage.getItem('product');
            // product = JSON.parse(product);
            removeFromCart(product, quantity);
            updateTotalPrice(-(parseInt(JSON.parse(product).price.substring(1)) * quantity));
        })
    }) 
})


function updateQuantity() {
    document.querySelectorAll('.qty-slider button').forEach(element => {
        element.addEventListener('click', (event) => {
            const cartItem = event.target.closest('.cart-item');
            searchProduct(cartItem.querySelector('.item-name').innerText);
            let product = localStorage.getItem('product');
            const buttonClass = event.target.classList;
            const qty = cartItem.querySelector('input');
            
            const price = parseInt(JSON.parse(localStorage.getItem('product')).price.substring(1));

            var shoppingCart = new Map(JSON.parse(localStorage.getItem('shoppingCart')) || []);
            if (buttonClass.contains('increase')) {
                qty.value++;
                shoppingCart.set(product, shoppingCart.get(product) + 1);
                localStorage.setItem('totalItem', parseInt(localStorage.getItem('totalItem')) + 1);
                updateTotalPrice(price);
            }
            if (buttonClass.contains('decrease') && qty.value > 1) {
                qty.value--;
                shoppingCart.set(product, shoppingCart.get(product) - 1);
                // updateCounter(-1);
                localStorage.setItem('totalItem', parseInt(localStorage.getItem('totalItem')) - 1);
                updateTotalPrice(-price);
            }
            const quantity = parseInt(qty.value);
            localStorage.setItem('shoppingCart', JSON.stringify(Array.from(shoppingCart.entries())));
            searchProduct(cartItem.querySelector('.item-name').innerText);
            cartItem.querySelector('.item-totalPrice').innerText = `$${quantity * price}`;
        })
    })
}

function updateTotalPrice(offset){
    console.log(offset);
    let totalPrice = document.querySelector('.price');
    var price = parseInt(totalPrice.innerText.substring(1));
    totalPrice.innerText = `$${price + offset}`;
}

function createCartItem(product, quantity){
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.classList.add('row');
    product = JSON.parse(product);
    cartItem.innerHTML = `
        <div class='item-img col-md-3'>
            <img src="${product.image}" alt="" class='img-responsive'>
        </div>
        <div class="column col-md-3 item-info">
            <h5 class="item-name">${product.name}</h5>
            <div class="item-desc">${product.description}</div>
        </div>
        <div class="col-md-3">
            <div class="item-quantity">
                <div class="qty-slider">
                    <button class="qty-btn btn-push decrease">-</button>
                    <input readonly value="${quantity}" type="text" name="qty" pattern="\d+" min="1">
                    <button class="qty-btn btn-push increase">+</button>
                </div>
            </div>
        </div>
        <div class="col-md-2 item-totalPrice">$${parseInt(product.price.substring(1)) * parseInt(quantity)}</div>
        <div class="column col-md-1 remove">
            <button class="btn-danger btn-push"><i class="fa-solid fa-trash-can"></i></button>
        </div>
    `;
    document.querySelector('#cart-item-container').appendChild(cartItem);
}
// let itemTotal = 0;
// localStorage.setItem('totalItem', itemTotal);

function displayCart() {
    let totalPrice = document.querySelector('.price');
    let sum = 0;
    let cart = JSON.parse(localStorage.getItem('shoppingCart'));
    cart.forEach((item) => {
        let itemName = item[0];
        let itemQuantity = item[1];
        console.log(itemName)
        sum += parseInt(JSON.parse(itemName).price.substring(1)) * itemQuantity;
        // itemTotal += parseInt(itemQuantity);
        createCartItem(itemName, itemQuantity);
    })
    totalPrice.innerText = `$${sum}`;
    // localStorage.setItem('totalItem', itemTotal);


    // if (cart !== null && cart.length > 0) {
    //     let cartList = document.getElementById('cart-list');
    //     let totalItems = 0;
    //     let totalPrice = 0;
    
    //     cart.forEach((item) => {
    //       let itemName = item[0];
    //       let itemQuantity = item[1];
    
    //       totalItems += itemQuantity;
    //     //   totalPrice += itemQuantity * getItemPrice(itemName); // You will need to define a function called getItemPrice() that returns the price of an item based on its name
    
    //       let li = document.createElement('li');
    //       li.textContent = `${itemName} * ${itemQuantity}`;
    //       cartList.appendChild(li);
    //     });
    
    //     let totalItemsLabel = document.getElementById('total-items');
    //     totalItemsLabel.textContent = totalItems;
    
    //     let totalPriceLabel = document.getElementById('total-price');
    //     totalPriceLabel.textContent = `$${totalPrice.toFixed(2)}`;
    //   }
    }