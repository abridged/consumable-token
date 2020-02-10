const AddressLib = artifacts.require('AddressLib');
const MathLib = artifacts.require('MathLib');
const ConsumableToken = artifacts.require('ConsumableToken');

module.exports = async (deployer, network, addresses) => {
  if (network === 'test') {
    return;
  }

  deployer.link(AddressLib, ConsumableToken);
  deployer.link(MathLib, ConsumableToken);

  const {
    TOKEN_FROM_WEI_MULTIPLIER,
    TOKEN_FROM_WEI_DIVIDER,
  } = process.env;

  const fromWeiMultiplier = parseInt(TOKEN_FROM_WEI_MULTIPLIER, 10) || 2;
  const fromWeiDivider = parseInt(TOKEN_FROM_WEI_DIVIDER, 10) || 3;

  await deployer.deploy(
    ConsumableToken,
    'ConsumableToken',
    'CTN',
    8,
    fromWeiMultiplier,
    fromWeiDivider,
    addresses,
  );
};
