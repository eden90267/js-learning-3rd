let lastMessage; // 可以移到回傳函式的本文，就可以有獨立的值了

module.exports = function(prefix) {
    return function(message) {
        const now = Date.now();
        const sinceLastMessage = now - (lastMessage || now);
        console.log(`${prefix} ${message} +${sinceLastMessage}ms`);
        lastMessage = now;
    }
}