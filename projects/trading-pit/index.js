const { sumTokensExport } = require('../helper/unwrapLPs')
const ADDRESSES = require('../helper/coreAssets.json')

const PIT_GAME = '0xd7dfb50d8f3cd06641fb5b7b33a169562ba5ce77'
const PIT_STAKING = '0x018c25c4a34198dad2605e22b2d47fccfdd34778'

async function staking(api) {
  const token = await api.call({ target: PIT_STAKING, abi: 'address:token' })
  if (!token || token === '0x0000000000000000000000000000000000000000') return {}
  const staked = await api.call({ target: PIT_STAKING, abi: 'uint256:totalStaked' })
  api.add(token, staked)
  return api.getBalances()
}

module.exports = {
  methodology:
    'TVL is native ETH held in PitGame (active booth bets, internal player balances, and unclaimed winnings). Staking is $PIT deposited in PitStaking once the token is wired.',
  start: '2026-07-21',
  robinhood: {
    tvl: sumTokensExport({ owner: PIT_GAME, tokens: [ADDRESSES.null] }),
    staking,
  },
}
