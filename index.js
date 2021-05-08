// Start program to interact with the blockchain

// 0. Storage
// BlockChain : Longest chain available
// BlocksTrie : Hash of blocks, value = Block
// Mempool    : Trie of transactions



// 1. Listen
// incoming block
    // Store block in block dict mapped by hash
    // Check block number
        // If highest, switch from current chain to this one
        // Update compare and update txns in the mempool
// transactions
    // Add txn to the mempool



// 2. Broadcast
// Blocks
    // Broadcast hash, blocknumber of incoming/self-mined block
// transactions
    // received transactions


// 3. Requests
// Block
    // Block(hash) : return BlocksDict[hash];




