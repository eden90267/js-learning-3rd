const book = [
    "Twinkle, twinkle, little bat!",
    "How I wonder what you're at!",
    "Up above the world you fly,",
    "Like a tea tray in the sky.",
    "Twinkle, twinkle, little bat!",
    "How I wonder what you're at!",
];

// const it = book.values(); // chrome、node還不支援
const it = book[Symbol.iterator]();

let current = it.next();
while(!current.done) {
    console.log(current.value);
    current = it.next();
}

const it1 = book[Symbol.iterator]();
const it2 = book[Symbol.iterator]();

it1.next(); // {value: "Twinkle, twinkle, little bat!", done: false}
it1.next(); // {value: "How I wonder what you're at!", done: false}

it2.next(); // {value: "Twinkle, twinkle, little bat!", done: false}

it1.next(); // {value: "Up above the world you fly,", done: false}
