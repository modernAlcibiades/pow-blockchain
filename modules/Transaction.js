const SHA256 = require("crypto-js/sha256");

class Transaction {
    constructor(data) {
        // Data : Input UTXOs, OutputUTXOs
        this.data = data;
        this.hash = this.getHash();
    }

    getHash() {
        // Hash data json object
        return SHA256(JSON.stringify(this.data)).toString();
    }

    verifyTransaction() {
        // Add code to check the data is correct
        // May be do this before creating transaction object
        return true;
    }

    verifyHash(hash) {
        return (hash === this.hash);
    }
}