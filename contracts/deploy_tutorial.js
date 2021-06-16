const Web3 = require('web3');
const Tx = require('ethereumjs-tx').Transaction;
const solc = require('solc');
const fs = require('fs');

const web3 = new Web3(new Web3.providers.HttpProvider(process.env.PROVIDER));

const address1 = process.env.ADDRESS1;
const privateKey = process.env.ADDRESS1_KEY;
const privateKeyBuffer = Buffer.from(privateKey, 'hex');
const contractContent = fs.readFileSync('contracts/cars.sol').toString();

const input = {
  language: 'Solidity',
  sources: {
    'cars': { content: contractContent }
  },
  settings: {
    outputSelection: { '*': { '*': ['*'] } }
  }
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));
const contractBytecode = output.contracts.cars.Cars.evm.bytecode.object;

const encodedParameters = web3.eth.abi.encodeParameters(['uint256'], ['3']).slice(2);
const bytecodeWithEncodedParameters = contractBytecode + encodedParameters;

web3.eth.getTransactionCount(address1, (err, nonce) => {
  const rawTx = {
    nonce: web3.utils.toHex(nonce),
    gasPrice: web3.utils.toHex(web3.utils.toWei('2', 'gwei')),
    gasLimit: web3.utils.toHex(1000000),
    to: null,
    data: `0x${bytecodeWithEncodedParameters}`
  };

  const tx = new Tx(rawTx, { chain: 'ropsten' });
  tx.sign(privateKeyBuffer);
  const serializedTx = tx.serialize().toString('hex');

  web3.eth.sendSignedTransaction(`0x${serializedTx}`).on('receipt', (receipt) => {
    console.log(`Contract deployed: ${receipt.contractAddress}`); // eslint-disable-line
  });
});
