'use strict'

class Logger {
    constructor(name) {
        this.name = name;
        this.log = [];
    }
    add(entry) {
        this.log.push({
            log: entry,
            timestamp: Date.now()
        });
    }
}

const log = new Logger("First Mate's Log");
Object.preventExtensions(log);
Object.isExtensible(log);      // true

log.name = "First Mate's Boring Log";
log.add("Another boring day at sea...");

// log.newProp = "test";
// TypeError: Can't add property newProp, object is not extensible

delete log.name;

Object.defineProperty(log, 'log', { enumerable: false });