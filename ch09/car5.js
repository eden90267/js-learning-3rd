class InsurancePolicy {}
function makeInsurable(o) {
    o.addInsurancePolicy = function(p) { this.insurancePolicy = p; }
    o.getInsurancePolicy = function() { return this.insurancePolicy }
    o.isInsured = function() { return !!this.insurancePolicy; }
}


class Car {
    constructor() {
    }
}

// 讓物件投保
const car1 = new Car();
// makeInsurable(car1);
makeInsurable(Car.prototype);
car1.addInsurancePolicy(new InsurancePolicy());

class InsurancePolicy {}
const ADD_POLICY = Symbol();
const GET_POLICY = Symbol();
const IS_INSURED = Symbol();
const _POLICY = Symbol();
function makeInsurable(o) {
    o[ADD_POLICY] = function(p) { this[_POLICY] = p; }
    o[GET_POLICY] = function() { return this[_POLICY]; }
    o[IS_INSURED] = function() { return !!this[_POLICY]; }
}