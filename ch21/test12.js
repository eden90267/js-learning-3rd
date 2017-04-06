const cook = {
    name: "Walt",
    redPhosphorus: 100,  // 危險
    water: 500,          // 安全
};
const protectedCook = new Proxy(cook, {
    set(target, key, value) {
        if (key === 'redPhosphorus') {
            if (target.allowDangerousOperations)
                return target.redPhosphorus = value;
            else
                return console.log("Too dangerous!");
        }
        target[key] = value;
    }
});

protectedCook.water = 550;
protectedCook.redPhosphorus = 150; // Too dangerous!

protectedCook.allowDangerousOperations = true;
protectedCook.redPhosphorus = 150; // 150
console.log(protectedCook.redPhosphorus);