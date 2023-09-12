const { ApiPromise, WsProvider } = require('@polkadot/api');
const fs = require('fs/promises');
async function main () {
  // Initialise the provider to connect to the local node
  const provider = new WsProvider('wss://rpc-0.gemini-3f.subspace.network/ws');

  // Create the API and wait until ready
  const api = await ApiPromise.create({ provider });
  const totalSpacePledged = api.consts.transactionFees.totalSpacePledged;
  const data = {
    total_size_network: totalSpacePledged.toString(),
    usd: 0.01
  }

  await fs.writeFile('data/netWorkInfo.json', JSON.stringify(data, null, 2));
  console.log(`You are connected to and save totalSpacePledged with value:${totalSpacePledged}`);
}
main().catch(console.error).finally(() => process.exit());
