//const ConvertLib = artifacts.require("ConvertLib");
const SupplyChain = artifacts.require("SupplyChain");

module.exports = function(deployer) {
  
  deployer.deploy(SupplyChain);
};
