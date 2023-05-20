import * as Components from "./component.js";
import itemsList from "./createItem.js";

document.addEventListener("DOMContentLoaded", function () {   
    
    const containerList = document.querySelectorAll(".item-container");
    [...containerList].forEach(container => {
        itemsList.forEach(product => {
            const containerByTags = container.closest('.content').classList;
            if(containerByTags.contains('best-seller') && product.tag === 'hot-tag'){
                Components.createProductBox(container, product);
            }
            if(containerByTags.contains('new-arrivals') && product.tag === 'new-tag'){
                Components.createProductBox(container, product);
            }
            if(containerByTags.contains('sales') && product.tag === 'sale-tag'){
                Components.createProductBox(container, product);
            }
        })
    });
    if(localStorage.getItem('totalItem') === null) {
        localStorage.setItem('totalItem', 0);
    }
    Components.updateCounter(0);
    Components.quantityIncreaseDecrease();
    Components.createProductCard();
    Components.wishlistToggle();
    Components.slider();
    Components.closeBtn();
    Components.addTagsToProduct();
    //sua document thanh div khac
    document.addEventListener('click', Components.hideLogin, true); //neu bam ngoai login layout thi 
    document.querySelectorAll('#login-box div').forEach(element => {
        element.addEventListener('click', event => {
            Components.displayLogin(event.target);
        })
    })
    //event cua addtocart
    document.querySelectorAll('.addtocart').forEach(element => {
        element.addEventListener('click', () => {
            Components.addToCartEvent(element);
        });
    })
    document.querySelector('.card-btn').addEventListener('click', (event) => {
        Components.addToCartEvent(event.target);
    })
    const changeLayout = document.querySelectorAll('#login-layout .signup-login span');
    changeLayout[0].onclick = () => {
        Components.register();
    }
    changeLayout[1].onclick = () => {
        Components.login();
    }
    document.querySelector('.searchbar i').onclick = () => {
        Components.displaySearch();
    }
    
    // document.querySelector('.counter').innerText = localStorage.getItem('totalItem');
});
