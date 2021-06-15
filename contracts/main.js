const Web3 = require('web3');
const Tx = require('ethereumjs-tx').Transaction;
const solc = require('solc');
const fs = require('fs');

const web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/a79715c8dc074bb8acad97512f9fceff'));

const address1 = '0x8EBae3F93a0b1B5ff0bE377fC562486989F20767';
const privateKey = 'a500930dce912c24b4d76c6e944fed873a98a1ef21e55fe10d841e65a1a87065';

const privateKeyBuffer = Buffer.from(privateKey, 'hex');

const contractContent = fs.readFileSync('contracts/cars.sol').toString();

const input = {
  language: 'Solidity',
  sources: {
    'cars': {
      content: contractContent
    }
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*']
      }
    }
  }
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));
const bytecode = output.contracts.cars.Cars.evm.bytecode.object;

const nonce = web3.eth.getTransactionCount(address1);
const rawTx = {
  nonce: web3.utils.toHex(nonce),
  gasPrice: web3.utils.toHex(web3.utils.toWei('2', 'gwei')),
  gastLimit: web3.utils.toHex(1000000),
  to: null,
  data: `0x${bytecode}`
}

const tx = new Tx(rawTx, { chain: 'ropsten' })
tx.sign(privateKeyBuffer);
const serializedTx = tx.serialize().toString('hex');

web3.eth.sendSignedTransaction(`0x${serializedTx}`).on('receipt', (receipt) => {
  console.log(`Contract deployed: ${receipt.contractAddress}`);
});
