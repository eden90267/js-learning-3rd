class Person {
    constructor(name) {
        this.name = name;
        this.id = Person.nextId++;
    }
}

Person.nextId = 0;
const jamie = new Person("Jamie"),
    juliet = new Person("Juliet"),
    peter = new Person("Peter"),
    jay = new Person("Jay");
const arr = [jamie, juliet, peter, jay];

console.log(arr.find(p => p.id === juliet.id));

console.log(arr.find(function (p) { return p.id === this.id; }, juliet));


const cart = [{name: "Widget", price: 9.95}, {name:"Gadget", price: 22.95}];
const names = cart.map(x => x.name);           // ["Widget", "Gadget"]
const prices = cart.map(x => x.price);         // [9.95, 22.95]
const discountPrices = prices.map(x => x*0.8); // [7.96, 18.36]
const lcNames = names.map(String.toLowerCase); // ["widget", "gadget"];