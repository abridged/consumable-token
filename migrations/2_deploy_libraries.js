const AddressLib = artifacts.require('AddressLib');
const MathLib = artifacts.require('MathLib');

module.exports = async (deployer) => {
  await deployer.deploy(AddressLib);
  await deployer.deploy(MathLib);
};
