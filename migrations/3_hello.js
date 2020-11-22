const Hello = artifacts.require("Hello");

module.exports = function (deployer, _network, accounts) {
  deployer.deploy(Hello);
};
