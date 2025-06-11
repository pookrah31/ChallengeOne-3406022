class TrieNode {
    constructor() {
        this.children = {};  // Changed from 'child' to 'children' for clarity
        this.isEndOfWord = false;
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    insert(word) {
        let node = this.root;

        for (let char of word) {
            if (!node.children[char]) {
                node.children[char] = new TrieNode();
            }
            node = node.children[char];
        }
        node.isEndOfWord = true;
    }

    search(word) {
        let node = this._searchNode(word);
        return node !== null && node.isEndOfWord;
    }

    startsWith(prefix) {
        return this._searchNode(prefix) !== null;
    }

    _searchNode(str) {
        let node = this.root;

        for (let char of str) {  // Fixed: changed 'word' to 'str'
            if (!node.children[char]) {
                return null;
            }
            node = node.children[char];
        }
        return node;
    }
}

// Testing the Trie
const trie = new Trie();
console.log(trie.insert("")); // Insert an empty string
console.log(trie.insert("apple"));
console.log(trie.search("apple"));   // true
console.log(trie.search("app"));     // false
console.log(trie.startsWith("app")); // true
console.log(trie.insert("app"));
console.log(trie.search("app"));     // true