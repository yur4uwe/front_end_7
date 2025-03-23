const { myInitGameTree } = require('./src/api/bot.js');

function countNodes(node) {
    let count = 1;
    for (const child of node.children) {
        count += countNodes(child);
    }
    return count;
}

const allNodes = myInitGameTree();
console.log(countNodes(allNodes));
console.log("====================================");
console.log(allNodes);
console.log("====================================");
//console.log(allNodesGPT);