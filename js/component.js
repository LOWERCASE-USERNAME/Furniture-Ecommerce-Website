import { searchProduct } from "./createItem.js";
import { ProductBox } from "./product.js";
//local storage de giu wishlist
export function wishlistToggle() {
    const toggleList = document.getElementsByClassName('wishlist');
    console.log(toggleList);
    for (let index = 0; index < toggleList.length; index++) {
        const element = toggleList[index];
        
        element.checked = false;
        element.addEventListener("click", () => {
            
            if (element.checked === false) {
                element.checked = true;
                element.style.color = "red";
            } else {
                element.checked = false;
                element.style.color = "white";
            }
        })
    }
    console.log(toggleList.length)
}

export function createProductBox(container, productBox) {
    const product = document.createElement('div');
    product.classList.add('item');
    // product.classList.add('draggable');
    // product.setAttribute('draggable', 'true');
    product.innerHTML =
        `<div class="tags ${productBox.tag}"></div>
        <img src="${productBox.image}" alt="">
        <div class="wishlist"><i class="fa-solid fa-heart icon-center"></i></div>
        <div class="item-btn detail"><i class="fa-solid fa-glasses icon-center"></i></div>
        <div class="item-btn addtocart"><i class="fa-solid fa-cart-shopping icon-center"></i></div>
        <div class="item-info">
            <div class="item-name">${productBox.name}</div>
            <div class="item-price">${productBox.price}</div>
            <div class="item-rating">${productBox.ratingString}</div>
        </div>`;
    container.appendChild(product);
}

let viewingProduct;
export function createProductCard() {
    const productArr = document.querySelectorAll('.detail');
    productArr.forEach(element => {
        element.addEventListener('click', event => {
            const card = document.querySelector('.product-card');
            card.classList.add('visible');
            const product = event.target.closest('.item');
            viewingProduct = product;
            const mainImage = document.querySelector('#main-image');
            const secImage = document.querySelectorAll('.secondary-image');
            console.log(secImage);
            mainImage.setAttribute('src', product.querySelector('img').src);
            //cai vong for nay su dung bay gio do khong co nhieu anh khac nhau
            secImage.forEach(element => {
                const image = element.querySelector('img');
                image.src = mainImage.src;
            })
            //cai vong for nay dung de chuyen anh secondary len main neu hover
            // secImage.forEach(element => {
            //     const image = element.querySelector('img');
            //     const div = element.querySelector('div');
            //     div.addEventListener('onmouseover', event => {
            //         event.target.
            //     })
            // })
            const name = document.querySelector('.card-name');
            name.innerHTML = product.querySelector('.item-name').innerText;
            const price = document.querySelector('#card-price p');
            price.innerText = product.querySelector('.item-price').innerText;
            const rating = document.querySelector('.card-rating');
            rating.innerHTML = product.querySelector('.item-rating').innerHTML;
            const tag = document.querySelector('.card-tag');
            tag.classList.add(product.querySelector('.tags').classList[1]);
            addTagsToProduct(product);
            const quantity = document.querySelector('.card-quantity input');
            const totalPrice = document.querySelector('#card-total-price p');
            totalPrice.innerText = '$' + parseInt(price.innerText.substring(1)) * parseInt(quantity.value);
        })
    })
    document.querySelectorAll('.product-card button').forEach(element => {
        element.addEventListener('click', (event) => {
            event.preventDefault();
        })
    })
}



const loginLayout = document.getElementById('login-layout');
export function displayLogin(obj) { //chon giua login hoac register
    if (obj.id === 'login') {
        login();
    }
    if (obj.id === 'signup') {
        register();
    }
}
export function hideLogin(event) { //neu bam ngoai login thi hide
    if (event.target.closest('#login-layout form') === null) {
        loginLayout.style.display = 'none';
    }
}
export function login() {
    const log = document.getElementById('login-form');
    const regi = document.getElementById('register-form');
    loginLayout.style.display = 'block';
    log.style.left = '50%';
    log.className = 'active';
    regi.style.left = '200%';
    regi.className = '';
}
export function register() {
    const log = document.getElementById('login-form');
    const regi = document.getElementById('register-form');
    loginLayout.style.display = 'block';
    log.style.left = '-100%';
    log.className = '';
    regi.style.left = '50%';
    regi.className = 'active';
}




//arrow slider
export function slider() {
    const arrowBtns = document.querySelectorAll('.arrow');
    const boxWidth = document.querySelector('.item').offsetWidth;
    arrowBtns.forEach(element => {
        element.addEventListener('click', (event) => {
            const clickedArrow = event.target;
            if (clickedArrow.closest('.left') !== null) {
                clickedArrow.closest('.content').childNodes[3].scrollLeft -= boxWidth;
            }
            if (clickedArrow.closest('.right') !== null) {
                clickedArrow.closest('.content').childNodes[3].scrollLeft += boxWidth;
            }
        })
    })
}

//search
export function displaySearch() {
    const input = document.querySelector(".header-searchbar input");
    const search = document.querySelector('.searchbar');
    if (input.open === undefined || input.open === false) {
        input.style.width = "100%";
        search.style.width = '100%';
        input.open = true;
    } else {
        input.style.width = "0";
        search.style.width = '27px';
        input.open = false;
    }
}

//close button
export function closeBtn() {
    const closeBtns = document.querySelectorAll('.exit');
    closeBtns.forEach(element => {
        element.addEventListener('click', (event) => {
            event.target.closest('.layout').classList.remove('visible');
            document.querySelector('#qty').value = 1;
        })
    })
}


// scroll down thi collapse nav
let originalScrollPos = 0;
export function scrollNav() {
    const navClass = document.querySelector('.header').classList;
    let currentScrollPos = window.scrollY;
    if (currentScrollPos == originalScrollPos) {

    } else if (currentScrollPos > originalScrollPos) {
        // console.log('Goodbye');
        navClass.add('collapse-scroll');
        navClass.remove('open-scroll');
    } else {
        // console.log('Hello');
        navClass.add('open-scroll');
        navClass.remove('collapse-scroll');
    }
    originalScrollPos = window.scrollY;
}
document.addEventListener('scroll', scrollNav);

//add tag
export function addTagsToProduct(product) {
    if (product === undefined) {
        const arrTags = document.getElementsByClassName("tags");
        [...arrTags].forEach(element => {
            const classTag = element.classList;
            if (classTag.contains("sale-tag")) {
                element.textContent = "Sale";
            } else if (classTag.contains("new-tag")) {
                element.textContent = "New";
            } else if (classTag.contains("hot-tag")) {
                element.textContent = "Hot";
            }
        });
    } else {
        const productTag = product.querySelector('.tags');
        const cardTag = document.querySelector('.card-tag');
        if (productTag.classList.contains("sale-tag")) {
            cardTag.textContent = "Sale";
        } else if (productTag.classList.contains("new-tag")) {
            cardTag.textContent = "New";
        } else if (productTag.classList.contains("hot-tag")) {
            cardTag.textContent = "Hot";
        }
    }
}

export function quantityIncreaseDecrease() {
    document.querySelectorAll('.qty-slider button').forEach(element => {
        element.addEventListener('click', (event) => {
            const buttonID = event.target.id;
            const qty = document.querySelector('#qty');
            if (buttonID === 'increase') qty.value++;
            if (buttonID === 'decrease' && qty.value > 1) qty.value--;
        })
    })
}
window.addEventListener('beforeunload', (event) => {
    if (document.activeElement.getAttribute('href') === 'cart.html' || document.activeElement.getAttribute('href') === 'home.html' || document.activeElement.getAttribute('href') === 'shop.html') {
        return;
    } 
    localStorage.removeItem('shoppingCart');
    localStorage.removeItem('totalItem');
});
export function updateCounter(offset){
    const counter = document.querySelector('.counter');
    // counter.innerText = parseInt(counter.innerText) + offset;
    localStorage.setItem('totalItem', parseInt(localStorage.getItem('totalItem')) + offset);
    counter.innerText = localStorage.getItem('totalItem');
}
export function addToCartEvent(cartButton) {
    const counter = document.querySelector('.counter');
    const navClass = document.querySelector('.header').classList;
    navClass.add('open-scroll');
    navClass.remove('collapse-scroll');
    if (cartButton.closest('.addtocart') !== null) {
        const productName = cartButton.closest('.item').querySelector('.item-name').innerText;
        searchProduct(productName);
        addToCart(localStorage.getItem('product'), 1);
        console.log(localStorage.getItem('product'));
        updateCounter(1);
    } else {
        const card = cartButton.closest('.product-card');
        const cardName = card.querySelector('.card-name').innerText;
        const qty = parseInt(card.querySelector('.card-quantity input').value);
        console.log(cardName);
        searchProduct(cardName);
        addToCart(localStorage.getItem('product'), qty);
        updateCounter(qty);
    }
}
var shoppingCart = new Map(JSON.parse(localStorage.getItem('shoppingCart')) || []);
function addToCart(item, quantity) {
    if (shoppingCart.has(item)) {
        shoppingCart.set(item, shoppingCart.get(item) + quantity);
    } else {
        shoppingCart.set(item, quantity);
    }
    localStorage.setItem('shoppingCart', JSON.stringify(Array.from(shoppingCart.entries())));
}

export function removeFromCart(item, quantity){
    console.log(item);
    shoppingCart.delete(item);
    localStorage.setItem('shoppingCart', JSON.stringify(Array.from(shoppingCart.entries())));
    localStorage.setItem('totalItem', parseInt(localStorage.getItem('totalItem')) - quantity);
}