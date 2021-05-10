class TrieNode {
    constructor(key, node = null) {
        this.key = key;
        if (node != null) {
            this.children = node.children;
            this.value = node.value;
            this.hasValue = node.hasValue;
        } else {
            this.children = {};
            this.hasValue = false;
            this.value = null;
        }
    }

    print(prefix = '') {
        console.log(prefix, this.key);
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode(null);
    }

    contains(hash, node = this.root) {
        const key = node.key;
        if (key != null) {
            if (key.length <= hash.length) {
                return (hash == key) && (node.hasValue);
            } else if (hash.slice(0, key.length) == key && hash[key.length] in node.children) {
                return this.contains(hash.slice(key.length, hash.length), node.children[hash[key.length]]);
            }
        }
        return false;
    }

    getValue(hash, node = this.root) {
        const key = node.key;
        if (key != null) {
            if (key.length <= hash.length) {
                return (hash == key) && (node.hasValue) ? node.value : null;
            } else if (hash.slice(0, key.length) == key && hash[key.length] in node.children) {
                return this.getValue(hash.slice(key.length, hash.length), node.children[hash[key.length]]);
            }
        }
        return null;
    }

    insert(hash, value, node = this.root) {
        if (node.key == null) {
            node.key = hash;
        }
        if (node.key == hash) {
            node.value = value;
            node.hasValue = true;
            //console.log(node.key, node.value);
        } else {
            let i = 0;
            let key = node.key;
            while (key[i] == hash[i] && i < hash.length && i < key.length) {
                i++;
            }
            if (i == hash.length && i == key.length) {
                // Same hash, hash finished, mark work
                node.hasValue == true;
                node.value = value;
            } else if (i == key.length) {
                // Key finished, add new node
                const store = hash.slice(i, hash.length);
                //console.log(`Adding ${store}`);
                if (hash[i] in node.children) {
                    this.insert(store, value, node.children[hash[i]]);
                } else {
                    let newNode = new TrieNode(store);
                    newNode.hasValue = true;
                    newNode.value = value;
                    node.children[hash[i]] = newNode;
                }
            } else if (i == hash.length) {
                // hash finished, split the key
                // Move the children of the node to the next node with the rest of the key
                const store = key.slice(i, key.length);
                //console.log(`Adding ${store}`);

                let keyNode = new TrieNode(store, node);

                //console.log(`Adding ${hash}`);
                node.key = hash;
                node.value = value;
                node.hasValue = true;
                node.children = {};
                node.children[key[i]] = keyNode;
            } else {
                // Add remaining part of the hash
                // split the key
                const store1 = key.slice(i, key.length);
                let keyNode = new TrieNode(store1, node);
                //console.log(`Adding ${store1}`);
                node.key = hash.slice(0, i);
                //console.log(`Adding ${node.key}`);
                node.children = {};
                node.value = null;
                node.hasValue = false;
                node.children[key[i]] = keyNode;

                const store2 = hash.slice(i, hash.length);
                //console.log(`Adding ${store2}`);
                let newNode = new TrieNode(store2,);
                newNode.hasValue = true;
                newNode.value = value;
                node.children[hash[i]] = newNode;
            }
        }
    }

    print(prefix = '', node = this.root) {
        node.print(prefix);
        for (key in node.children) {
            this.print(`${prefix}\t`, node.children[key]);
        };
    }
}

function test_trie() {
    // create tree with random
    trie = new Trie();
    const test = { 'albert': 5, 'al': 0, 'alberto': 20, 'aleb': 10, 'babushka': 100, 'babu': 5, 'alba': 12 }
    for (key in test) {
        trie.insert(key, test[key]);
    };
    console.log("printing Trie");
    trie.print();
}

//test_trie();

module.exports = Trie;