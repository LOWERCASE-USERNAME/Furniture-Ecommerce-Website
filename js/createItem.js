import {ProductBox} from './product.js'
const itemsList = [
    new ProductBox('images/contempo-tv-stand.jpg', 'contempo tv stand', 'brown oak wood, black metal beam', 'furniture', '$200', '4.5', 'hot-tag'),
    new ProductBox('images/item2.webp', 'single white chair', 'larch wood, white paint', 'furniture', '$70', '3', 'sale-tag'),
    // new ProductBox('images/item3.webp', 'lucky hanging dreamcatcher ', 'handmade, 100% cotton', 'decoration', '$15', '4.8', 'hot-tag'),
    new ProductBox('images/item4.webp', 'elasto swinging chair', 'fur, white plastic, pine wood', 'furniture', '$120', '4.2', 'new-tag'),
    new ProductBox('images/item5.webp', 'ox-tongue home plant', 'green leaf, brown pot', 'decoration','$24', '4.9', 'new-tag'),
    new ProductBox('images/gion-coffee-table.jpg', 'gion coffee table L', 'grey stone table, brown solid oak', 'furniture', '$340', '4.2', 'sale-tag'),
    new ProductBox('images/eden-coffee-table.jpg', 'eden coffee table', 'gray solid marble, fumed norway spruce', 'furniture', '$170', '4.4', 'hot-tag'),
    new ProductBox('images/carbono-425-modern-table.jpg', 'carbono 425 - modern table', 'black metal, cedar pine wood', 'furniture', '$250', '4.9', 'hot-tag'),
    new ProductBox('images/tosta-ladder-shelf.jpg', 'tosta ladder shelf', 'black solid aluminium-steel alloy', 'storage', '$220', '3.2', 'new-tag'),
    new ProductBox('images/contempo-book-shelf.jpg', 'contempo - bookshelf', 'black empty steel support beam, spruce wood', 'storage', '$155', '4.6', 'sale-tag'),
    new ProductBox('images/Indina-Decorative.png', 'indian - decorative chinese souvenir', 'black & white plate, palm leaf pattern', 'decoration', '$300', '3.1', 'hot-tag'),
    new ProductBox('images/Silver-Elephant-Statue.png', 'laos silver ear elephant statue', 'polyresin, silver ancient laos pattern', 'decoration', '$560','4.5', 'sale-tag'),
    new ProductBox('images/minimal-multifunctional-shelf.jpg', 'minimal-multifunctional-shelf', 'white balsa, hazel spruce', 'storage', '$90','3.2', 'new-tag'),
    new ProductBox('images/sabornton-coffee-table-drawers.webp', 'sabornton coffee table/drawers', 'gray, beige acacia wood', 'furniture', '$450','4.2', 'sale-tag'),
    new ProductBox('images/syrette-puffer-cotton-sofa.jpg', 'syrette puffer wool sofa', 'gray wool, stuffed white cotton', 'furniture', '$600','4.8', 'new-tag'),
    new ProductBox('images/gemini-red-ruby-lamp.jpg', 'gemini red ruby lamp.jpg', 'red ruby glasses, gold plated handle', 'decoration', '$900','4.3', 'hot-tag'),
    new ProductBox('images/expo-black-white-arm-chair.jpg', 'expo black white armchair', 'black&white striped pattern, hazel ironwood', 'furniture', '$880','3.8', 'new-tag'),
    new ProductBox('images/GarzaGeometricBookcase.webp', 'Garza Geometric Bookcase', 'diamond shape, whitesmoke gray chestnut', 'storage', '$280','4.8', 'new-tag'),
]   

export function searchProduct(productName){
    // console.log(typeof productName);
    itemsList.forEach(element => {
        // console.log(typeof element.name);
        if(element.name === productName){
            localStorage.setItem('product', JSON.stringify(element));
        }
    })
}
export function filterProduct(att){
    // console.log(typeof productName);
    itemsList.forEach(element => {
        // console.log(typeof element.name);
        const product = JSON.stringify(element).toLowerCase();
        if(product.includes(att.toLowerCase())){
            localStorage.setItem('product', JSON.stringify(element));
        }
    })
}
export default itemsList