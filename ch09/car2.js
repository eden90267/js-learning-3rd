const Car = (function () {
    
    const carProps = new WeakMap();

    class Car {
        constructor(make, model) {
            this.make = make;
            this.model = model;
            this._userGears = ['P', 'N', 'R', 'D'];
            carProps.set(this, { userGear: this._userGears[0] });
        }

        get userGear() {
            return carProps.get(this);
        }
        set userGear(value) {
            if (this._userGears.indexOf(value) < 0)
                throw new Error(`Invalid gear: ${value}`);
            carProps.get(this).userGear = value;
        }

        shift(gear) {
            this.userGear = gear;
        }
    }

    return Car;
})();


const car1 = new Car();
const car2 = new Car();

car1.shift === Car.prototype.shift; // true
car1.shift('D');
car1.shift('d');                    // 錯誤
car1.userGear;                      // 'D'
car1.shift = car2.shift;            // true

car1.shift = function(gear) {
    this.userGear = gear.toUpperCase();
}
car1.shift === Car.prototype.shift; // false
car1.shift === car2.shift;          // false
car1.shift('d');
car1.userGear;                      // 'D'