let BlockChain = require("Blockchain.js");

let blockChain = new BlockChain();

let PROOF = 1560;

let validProof =(proof) =>{
    let guessHash =hash(proof);
    console.log("Hashing:",guessHash);
    return guessHash == hash(PROOF);
};

let proofOfWork =() =>{
    let proof =0;
    while(true){
        if(!validProof(proof)){
            proof++;
        }else{
            break;
        }
    }
    return proof;
}

if(proofOfWork()==PROOF){
    blockChain.addNewTransaction("kanishk","ingle",200);
    let prevHash = blockChain.lastBlock().hash ? blockChain.lastBlock.hash: null;
    blockChain.addNewBlock(prevHash);
}

console.log("Chain: ",blockChain.chain);