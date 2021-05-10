// This only listens for transactions, adds to/removes from mempool, and mines
const Transaction = require('./Transaction');
const Block = require('./Block');
const Trie = require('./Trie');


class Miner {
    constructor(config) {
        this.mempool = [];
        this.txnTrie = new Trie();
        this.max_txns = config.MAX_TRANSACTIONS_PER_BLOCK;

    }

    createBlock() {
        txns = [];
        // Loop over mempool
        // Take lock over mempool when processing txn
        block = new Block(txns);



    }

}