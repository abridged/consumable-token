/* eslint-env mocha */

const BN = require('bn.js');
const expect = require('expect');
const { ZERO_ADDRESS, GAS_PRICE } = require('../constants');
const {
  logGasUsed,
  getCost,
  getBalance,
  getRandomAddress,
} = require('../utils');

const Token = artifacts.require('ConsumableToken');

contract('ConsumableToken', (addresses) => {
  let token;

  const CONSUMER = getRandomAddress();
  const FROM_WEI_MULTIPLIER = 2;
  const FROM_WEI_DIVIDER = 3;

  before(async () => {
    token = await Token.new(
      'ConsumableToken',
      'CTN',
      8,
      FROM_WEI_MULTIPLIER,
      FROM_WEI_DIVIDER,
      [CONSUMER],
    );
  });

  describe('views', () => {
    describe('getExchangeFromWeiRate()', () => {
      it('expect to return exchange rate', async () => {
        const {
          _multiplier: multiplier,
          _divider: divider,
        } = await token.getExchangeFromWeiRate();

        expect(multiplier)
          .toBeBN(FROM_WEI_MULTIPLIER);
        expect(divider)
          .toBeBN(FROM_WEI_DIVIDER);
      });
    });

    describe('calcExchangeFromWei()', () => {
      it('expect to calc value', async () => {
        const value = new BN(1000);
        const output = await token.calcExchangeFromWei(value);

        expect(output)
          .toBeBN(
            value
              .muln(FROM_WEI_MULTIPLIER)
              .divn(FROM_WEI_DIVIDER),
          );
      });
    });

    describe('calcExchangeToWei()', () => {
      it('expect to calc value', async () => {
        const value = new BN(1000);
        const output = await token.calcExchangeToWei(value);

        expect(output)
          .toBeBN(
            value
              .muln(FROM_WEI_DIVIDER)
              .divn(FROM_WEI_MULTIPLIER),
          );
      });
    });
  });

  describe('methods', () => {
    const DEPOSIT_VALUE = new BN(1000);
    const TRANSFER_VALUE = new BN(500);
    const CONSUME_VALUE = new BN(200);
    const WITHDRAW_VALUE = new BN(150);

    let expectedBalance = DEPOSIT_VALUE;

    describe('fallback payable', () => {
      it('expect to mint tokens', async () => {
        const from = addresses[0];
        const value = DEPOSIT_VALUE.muln(FROM_WEI_DIVIDER)
          .divn(FROM_WEI_MULTIPLIER);

        const output = await token.sendTransaction({
          from,
          value,
        });

        logGasUsed(output);

        const { logs: [log] } = output;

        expect(log.event)
          .toBe('Transfer');
        expect(log.args.from)
          .toBe(ZERO_ADDRESS);
        expect(log.args.to)
          .toBe(from);
        expect(log.args.value)
          .toBeBN(DEPOSIT_VALUE);
        expect(await token.balanceOf(from))
          .toBeBN(expectedBalance);
      });
    });

    describe('exchangeToWei()', () => {
      it('expect to withdraw wei', async () => {
        const from = addresses[0];
        const balance = await getBalance(from);
        const output = await token.exchangeToWei(
          WITHDRAW_VALUE, {
            from,
            gasPrice: GAS_PRICE,
          },
        );

        logGasUsed(output);

        const { logs: [log] } = output;

        const cost = getCost(output, GAS_PRICE);

        expectedBalance = expectedBalance.sub(WITHDRAW_VALUE);

        expect(log.event)
          .toBe('Transfer');
        expect(log.args.from)
          .toBe(from);
        expect(log.args.to)
          .toBe(ZERO_ADDRESS);
        expect(log.args.value)
          .toBeBN(WITHDRAW_VALUE);
        expect(await token.balanceOf(from))
          .toBeBN(expectedBalance);
        expect(await getBalance(from))
          .toBeBN(
            balance
              .sub(cost)
              .add(
                WITHDRAW_VALUE
                  .muln(FROM_WEI_DIVIDER)
                  .divn(FROM_WEI_MULTIPLIER),
              ),
          );
      });
    });

    describe('transfer()', () => {
      it('expect to transfer tokens to address', async () => {
        const from = addresses[0];
        const to = addresses[1];
        const output = await token.transfer(
          to,
          TRANSFER_VALUE, {
            from,
          },
        );

        logGasUsed(output);

        const { logs: [log] } = output;

        expectedBalance = expectedBalance.sub(TRANSFER_VALUE);

        expect(log.event)
          .toBe('Transfer');
        expect(log.args.from)
          .toBe(from);
        expect(log.args.to)
          .toBe(to);
        expect(TRANSFER_VALUE.eq(log.args.value))
          .toBeTruthy();
        expect(await token.balanceOf(from))
          .toBeBN(expectedBalance);
        expect(await token.balanceOf(to))
          .toBeBN(TRANSFER_VALUE);
      });

      it('expect to transfer tokens to consumer', async () => {
        const from = addresses[0];
        const output = await token.transfer(
          CONSUMER,
          CONSUME_VALUE, {
            from,
          },
        );

        logGasUsed(output);

        const { logs: [log] } = output;

        expect(log.event)
          .toBe('Transfer');
        expect(log.args.from)
          .toBe(from);
        expect(log.args.to)
          .toBe(CONSUMER);
        expect(log.args.value)
          .toBeBN(CONSUME_VALUE);

        expect(await getBalance(CONSUMER))
          .toBeBN(
            CONSUME_VALUE
              .muln(FROM_WEI_DIVIDER)
              .divn(FROM_WEI_MULTIPLIER),
          );
      });
    });
  });
});
