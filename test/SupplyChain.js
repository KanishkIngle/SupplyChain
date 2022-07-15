const{expectEvent,BN} =require("@openzeppelin/test-helpers");
const { assertion } = require("@openzeppelin/test-helpers/src/expectRevert");
const HDWalletProvider =require("@truffle/hdwallet-provider");
const Web3= require("web3");

const SupplyChain = artifacts.require("SupplyChain");

contract('SupplyChain', (accounts) => {

  before(async()=>{
    
    this.owner=accounts[0];

    this.BRANDS={
      Skoda:"Skoda-Slavia",
      Volkswagen :"Volkswagen-Virtus",
      Audi:"Audi-RS5",
      Bentley: "Bentley-GT-Continental",
      RollsRoyce: "RollsRoyce-Ghost",
      BMW:"BMW-320d"

    };

    //enums
    this.ModeEnums={
      ISSUER: {val: "ISSUER",pos:0},
      VERIFIER: {val: "VERIFIER",pos:2},
      PROVER: {val: "PROVER",pos:1}
    };

    this.StatusEnums={ //MANUFACTURED,DELIVERING_INTERNATIONAL,STORED,DELIVERING_LOCAL,DELIVERED
      manufactured: {val: "MANUFACTURED",pos:0},
      delivering1: {val: "DELIVERING_INTERNATIONAL",pos:1},
      stored: {val: "STORED",pos:2},
      delivering1: {val:"DELIVERING_LOCAL",pos:3},
      delivered: {val: "DELIVERED",pos:4}
    };

    this.defaultEntitities={
      manufactureA : {id: accounts[1],mode: this.ModeEnums.PROVER.val},
      manufactureB : {id: accounts[2],mode: this.ModeEnums.PROVER.val},
      inspector : {id: accounts[3],mode: this.ModeEnums.ISSUER.val},
      distributorGlobal:{id:accounts[4],mode: this.ModeEnums.VERIFIER.val},
      distributorLocal:{id:accounts[5],mode: this.ModeEnums.VERIFIER.val},
      immunizer: {id: accounts[6],mode: this.ModeEnums.ISSUER.val},
      traveller: {id: accounts[7],mode: this.ModeEnums.PROVER.val},
      borderAgent:{id: accounts[8],mode: this.ModeEnums.VERIFIER.val}
    };

  

    this.defaultBatches ={
      0:{brand: this.BRANDS.Skoda,manufacturer: this.defaultEntitities.manufactureA.id},
      1:{brand: this.BRANDS.Volkswagen,manufacturer: this.defaultEntitities.manufactureB.id},
      2:{brand: this.BRANDS.Audi,manufacturer: this.defaultEntitities.manufactureA.id},
      3:{brand: this.BRANDS.Bentley,manufacturer: this.defaultEntitities.manufactureB.id},
      4:{brand: this.BRANDS.RollsRoyce,manufacturer: this.defaultEntitities.manufactureA.id},
      5:{brand: this.BRANDS.BMW,manufacturer: this.defaultEntitities.manufactureB.id}

    };

    this.SupplyChainInstance =await SupplyChain.deployed();
    this.providerOrUrl="http://localhost:8545";
  }); 
  
  it('should add Entities successfully', async () => {
    //const SupplyChainInstance = await SupplyChain.deployed();
    //const balance = await SupplyChainInstance.getBalance.call(accounts[0]);
    
    for(const entity in this.defaultEntitities){
      const {id,mode}=this.defaultEntitities[entity];

      const result = await this.SupplyChainInstance.addEntity(
        id,
        mode,
        {from: this.owner}
      );
      
      console.log(result);
      expectEvent(result.receipt,"AddEntity",{
        entityId:id,
        entityMode:mode
      });
      
      const retrievedEntity = await this.SupplyChainInstance.entities.call(id);
      assert.equal(id,retrievedEntity.id,"mismatched IDs");
      assert.equal(this.ModeEnums[mode].pos,retrievedEntity.mode.toString(),"Mismatched Modes");
    } 
    
    //assert.equal(actual,, errorMessage);
  });
    


});
