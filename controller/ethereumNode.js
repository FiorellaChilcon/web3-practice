const Web3 = require('web3');
const Tx = require('ethereumjs-tx').Transaction;
const solc = require('solc');
const fs = require('fs');

class EthereumNode {
  constructor (provider) {
    this.web3 = new Web3(new Web3.providers.HttpProvider(provider));
  }

  async getTransactions () {
    const { transactions } = await this.web3.eth.getBlock('latest');
    return { transactions };
  }

  sendMoney ({ address1, address2, privateKey, amount }) {
    const value = this.web3.utils.toHex(this.web3.utils.toWei(amount, 'ether'));
    return this.signTransaction(address1, privateKey, address2, null, value);
  }

  async addressBalance (from) {
    const res = await this.web3.eth.getBalance(from);
    const balance = this.web3.utils.fromWei(res, 'ether');
    return { balance };
  }

  deployContract (address, privateKey, filePath, contractName, keys, values) {
    const contractContent = fs.readFileSync(filePath).toString();
    const input = {
      language: 'Solidity',
      sources: {
        myContract: { content: contractContent }
      },
      settings: {
        outputSelection: { '*': { '*': ['*'] } }
      }
    };

    const output = JSON.parse(solc.compile(JSON.stringify(input)));

    const contractBytecode = output.contracts.myContract[contractName].evm.bytecode.object;
    const encodedParameters = this.web3.eth.abi.encodeParameters(keys, values).slice(2);

    const bytecodeWithEncodedParameters = contractBytecode + encodedParameters;

    return this.signTransaction(address, privateKey, null, `0x${bytecodeWithEncodedParameters}`);
  }

  async signTransaction (address1, privateKey, address2 = null, data = null, value = null) {
    const privateKeyBuffer = Buffer.from(privateKey, 'hex');
    const nonce = await this.web3.eth.getTransactionCount(address1);
    const gasPrice = await this.web3.eth.getGasPrice();
    const gasLimit = await this.web3.eth.estimateGas({ from: address1, data });

    const rawTx = {
      nonce: this.web3.utils.toHex(nonce),
      gasPrice: this.web3.utils.toHex(gasPrice),
      gasLimit: this.web3.utils.toHex(gasLimit),
      to: address2,
      value,
      data
    };

    const tx = new Tx(rawTx, { chain: 'ropsten' });
    tx.sign(privateKeyBuffer);
    const serializedTx = tx.serialize().toString('hex');

    return this.web3.eth.sendSignedTransaction(`0x${serializedTx}`);
  }
}

module.exports = new EthereumNode(process.env.PROVIDER);
