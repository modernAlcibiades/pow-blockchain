const SHA256 = require("crypto-js/sha256");
const crypto = require("crypto-js");
const EC = require('elliptic').ec;

const ec = new EC('secp256k1');

class Wallet {
    constructor(pin) {
        this.salt = crypto.cryptoSecureRandomInt();
        this.password = SHA256(pin + this.salt);
        this.addresses = {}
        this.addWallet();
    }

    validate(pin) {
        return (this.password == SHA256(pin + this.password));
    }

    addWallet() {
        const key = ec.genKeyPair();
        address = {};
        address.private_key = key.getPrivate().toString(16);
        address.public_key = key.getPublic().encode('hex');
        address.name = address.public_key.substring(2, 22);
        this.addresses[address.name] = address;
    }

    removeWallet(name, signature) {
        if (name in this.addresses) {
            delete this.addresses[name];
        }
    }

    signMessage(name, message) {
        if (name in this.addresses) {
            const mshHash = SHA256(message).toString();
            const fullSignature = this.addresses[name].private_key.sign(mshHash);
            const signature = {
                'r': fullSignature.r.toString(16),
                's': fullSignature.s.toString(16)
            }
            return signature;
        } else {
            // Error
            return { 'error': "wrong address" };
        }
    }

    // Ideally shouldn't be needed
    verifySignature(name, message, signature) {
        if (name in this.addresses) {
            const msgHash = SHA256(message).toString();
            return this.addresses[name].public_key.verify(message.toString(), signature);
        }
        return false;
    }
}