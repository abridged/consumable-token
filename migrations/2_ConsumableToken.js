const ConsumableToken = artifacts.require('ConsumableToken');

module.exports = async (deployer, network) => {
  if (network === 'test') {
    return;
  }

  const {
    TOKEN_FROM_WEI_MULTIPLIER,
    TOKEN_FROM_WEI_DIVIDER,
    TOKEN_CONSUMERS,
  } = process.env;

  const fromWeiMultiplier = parseInt(TOKEN_FROM_WEI_MULTIPLIER, 10) || 2;
  const fromWeiDivider = parseInt(TOKEN_FROM_WEI_DIVIDER, 10) || 3;
  const consumers = (TOKEN_CONSUMERS || '').split(',');

  await deployer.deploy(
    ConsumableToken,
    'ConsumableToken',
    'CTN',
    8,
    fromWeiMultiplier,
    fromWeiDivider,
    consumers,
  );
};
