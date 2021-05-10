const Trie = require('./Trie');

class Blockchain {
    constructor() {
        this.blocks = [];
        this.blockTrie = new Trie();
    }

    addBlock(block) {
        if (block.data.blockNumber == this.blocks.length) {
            if (block.verify()) {
                this.blocks.push(block);
            } else {
                this.err('BLOCKHASH');
            }
        } else {
            this.err('BLOCKNUMBER');
        }
    }

    replaceBlock(block) {
        if (block.data.blockNumber < this.blocks.length) {
            if (block.verify()) {
                this.blocks[block.data.blockNumber] = block;
            } else {
                this.err('BLOCKHASH');
            }
        } else {
            this.err('BLOCKNUMBER');
        }
    }

    err(etype) {
        switch (etype) {
            case 'BLOCKNUMBER': {
                console.log(`Something wrong with the block, number = ${block.blockNumber}, current length = ${this.blocks.length}`);
                break;
            }
            case 'BLOCKHASH': {
                console.log(`Block hash doesn't verify. ${block.hash}`);
                break;
            }
        }


    }
}