export class ProductBox {
    image; name; description; category; price; rating; tag;
    constructor(image, name, description, category, price, rating, tag) {
        this.image = image;
        this.name = name;
        this.description = description;
        this.category = category;
        this.price = price;
        this.rating = rating;
        this.tag = tag;
    }

    get image(){
        return this.image;
    }
    set image(value){
        this.image = value; 
    }
    get name(){
        return this.name;
    }
    set name(value){
        this.name = value; 
    }
    get description(){
        return this.description;
    }
    set description(value){
        this.image = value; 
    }
    get category(){
        return this.category;
    }
    set category(value){
        this.category = value; 
    }
    get price(){
        return this.price;
    }
    set price(value){
        this.price = value; 
    }
    get rating(){
        return this.rating;
    }
    get ratingString(){
        let starString = '';
        for (let index = 0; index < Math.round(this.rating); index++) {
            starString += '<i class="fa-solid fa-star fa-beat" style="color: gold;"></i>'
        }
        for (let index = 5; index > Math.round(this.rating); index--) {
            starString += '<i class="fa-solid fa-star fa-beat" style="color: black;"></i>'
        }
        return starString;
    }
    set rating(value){
        this.rating = value; 
    }
    get tag(){
        return this.tag;
    }
    set tag(value){
        this.tag = value; 
    }
}

