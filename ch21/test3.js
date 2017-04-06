class Rectangle {
    constructor(width, height) {
        this.width = width;
    }
    get perimeter() {
        return this.width * 2 + this.height * 2;
    }
}