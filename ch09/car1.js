class Car {
    constructor() {
        this.make = make;
        this.model = model;
        this._userGears = ['P', 'N', 'R', 'D'];
        this._userGear = this._userGears[0];
    }

    get userGear() {
        return this._userGear;
    }
    set userGear(value) {
        if (this._userGears.indexOf(value) < 0)
            throw new Error(`invalid gear: ${value}`);
        this._userGear = value;
    }

    shift(gear) {
        this.userGear = gear;
    }
}