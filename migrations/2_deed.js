const Deed = artifacts.require("Deed");

module.exports = function (deployer, _network, accounts) {
  // const depolyerAccountDonator = accounts[0];
  const lawyer = accounts[1];
  const beneficiary = accounts[2];
  deployer.deploy(Deed, lawyer, beneficiary, 3, {value: 100});
};
