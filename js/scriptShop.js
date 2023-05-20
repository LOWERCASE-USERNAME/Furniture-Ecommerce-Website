import * as Components from "./component.js";
import itemsList from "./createItem.js";

window.addEventListener('load', () => {
    itemsList.filter(filterShop).forEach(product => {
        createProductBox(product);
    })
    wishlistToggle();
    toggleColor();
    document.querySelector('input[type="button"]').addEventListener('click', () => {
        document.querySelector('.item-container').innerHTML = '';
        setTimeout(() => {
            itemsList.filter(filterShop).forEach(product => {
                createProductBox(product);
            })
        }, 1000)
    })
    document.querySelector('form').addEventListener('mousedown', () => {
        chooseCategory();
        chooseColor();
    })


})
function wishlistToggle() {
    let toggleList = document.getElementsByClassName('wishlist');

    // setTimeout(() => {
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
    // }, 100)
}

function createProductBox(productBox) {
    const product = document.createElement('div');
    const container = document.querySelector('.item-container');
    product.classList.add('item');
    // product.classList.add('draggable');
    // product.setAttribute('draggable', 'true');
    product.innerHTML =
        `<!--<div class="tags ${productBox.tag}"></div>-->
        <img src="${productBox.image}" alt="">
        <div class="wishlist"><i class="fa-solid fa-heart icon-center"></i></div>
        <div class="item-btn detail"><i class="fa-solid fa-glasses icon-center"></i></div>
        <div class="item-btn addtocart"><i class="fa-solid fa-cart-shopping icon-center"></i></div>
        <div class="item-info">
            <div class="item-name">${productBox.name}</div>
            <div class="item-price">${productBox.price}</div>        
        </div>`;
    container.appendChild(product);
}

const filterArray = ['', ''];
function filterShop(element) {
    const priceInput = document.querySelectorAll(".price-input input");
    const price = parseInt(element.price.substring(1));
    return element.category.includes(filterArray[0])
        && element.description.includes(filterArray[1])
        && price >= priceInput[0].value && price <= priceInput[1].value;
}

function chooseCategory() {
    document.getElementsByName('catalog').forEach(element => {
        if (element.checked === true) {
            filterArray[0] = element.id;
        }
    })
}
function toggleColor() {
    document.querySelectorAll('.colorPicker').forEach(color => {
        color.addEventListener('click', (event) => {
            document.querySelectorAll('.colorPicker').forEach(element => {
                element.classList.remove('active');
            })
            event.target.classList.add('active');
            filterArray[1] = event.target.id;
        })
    })
}

function chooseColor() {
    [...document.getElementsByClassName('colorField')].forEach(element => {
        if (element.classList.contains('active')) {
            filterArray[1] = element.id;
        }
    })
}


const rangeInput = document.querySelectorAll(".range-input input"),
priceInput = document.querySelectorAll(".price-input input"),
range = document.querySelector(".slider .progress");
let priceGap = 50;

priceInput.forEach(input =>{
    input.addEventListener("input", e =>{
        var minPrice = parseInt(priceInput[0].value),
        maxPrice = parseInt(priceInput[1].value); 
        if(minPrice < rangeInput[0].min){
            rangeInput[0].value = 0;
            range.style.left = "0%";
        }
        if(maxPrice > rangeInput[1].max){
            rangeInput[1].value = 1000;
            range.style.left = "100%";
        }
        if(maxPrice <= rangeInput[1].max){
            if(e.target.className === "input-min"){
                rangeInput[0].value = minPrice;
                range.style.left = ((minPrice / rangeInput[0].max) * 100) + "%";
            }else{
                rangeInput[1].value = maxPrice;
                range.style.right = 100 - (maxPrice / rangeInput[1].max) * 100 + "%";
            }
        }
        
    });
});
rangeInput.forEach(input =>{
    input.addEventListener("input", e =>{
        let minVal = parseInt(rangeInput[0].value),
        maxVal = parseInt(rangeInput[1].value);
        if((maxVal - minVal) < priceGap){
            if(e.target.className === "range-min"){
                rangeInput[0].value = maxVal - priceGap
            }else{
                rangeInput[1].value = minVal + priceGap;
            }
        }else{
            priceInput[0].value = minVal;
            priceInput[1].value = maxVal;
            range.style.left = ((minVal / rangeInput[0].max) * 100) + "%";
            range.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
        }
    });
});