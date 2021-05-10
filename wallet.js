const SHA256 = require("crypto-js/sha256");
const crypto = require("crypto-js");
const EC = require('elliptic').ec;

const ec = new EC('secp256k1');

class UTXO {
    constructor(transactionHash, amount) {
        // Make sure UTXO are uniquely identifiable
        //this.transactionHash = transactionHash;
        this.owner = owner;
        this.spent = false;
        this.amount = amount;
    }

    spent() {
        this.spent = true;
    }
}

class Wallet {
    constructor(pin) {
        this.salt = crypto.cryptoSecureRandomInt();
        this.password = SHA256(pin + this.salt);
        this.address = this.createAddress();
        this.UTXO = [];
        this.balance = 0;
    }

    validate(pin) {
        return (this.password == SHA256(pin + this.password));
    }

    createAddress() {
        const key = ec.genKeyPair();
        address = {};
        address.private_key = key.getPrivate().toString(16);
        address.public_key = key.getPublic().encode('hex');
        address.name = address.public_key.substring(2, 22);
        return address;
    }

    signMessage(message) {
        const mshHash = SHA256(message).toString();
        const fullSignature = this.address.private_key.sign(mshHash);
        const signature = {
            'r': fullSignature.r.toString(16),
            's': fullSignature.s.toString(16)
        }
        return signature;
    }

    // Ideally shouldn't be needed
    verifySignature(public_key, message, signature) {
        const msgHash = SHA256(message).toString();
        return public_key.verify(message.toString(), signature);
    }

    send(to, amount) {
        if (amount > 0 && this.address.balance > amount) {
            // Pull amount from available UTXOs
            let sum = 0;
            let TXO = [];
            while (sum < amount) {
                const txn = shift(this.UTXO);
                TXO.push(txn);
                sum += txn.amount;
            }
        }
    }

    cancel(UTXO) {
        for (let i = 0; i < UTXO.length; i++) {
            this
        }
    }
}