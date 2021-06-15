const Web3 = require('web3');
const Tx = require('ethereumjs-tx').Transaction;

class EthereumNode {
  web3;
  
  constructor(provider) {
    this.web3 = new Web3(new Web3.providers.HttpProvider(provider));
  }

  async getTransactions() {
    const { transactions } = await this.web3.eth.getBlock('latest');
    return { transactions };
  }

  async sendMoney({ address1, address2, privateKey, amount }) {
    const privateKeyBuffer = Buffer.from(privateKey, 'hex');

    const txtCount = await this.web3.eth.getTransactionCount(address1);
    const rawTx = {
      nonce: this.web3.utils.toHex(txtCount),
      gasPrice: this.web3.utils.toHex(this.web3.utils.toWei('17', 'gwei')),
      gastLimit: this.web3.utils.toHex(21000),
      to: address2,
      value: this.web3.utils.toHex(this.web3.utils.toWei(amount, 'ether'))
    }

    const tx = new Tx(rawTx, { chain: 'ropsten' })
    tx.sign(privateKeyBuffer);
    const serializedTx = tx.serialize().toString('hex');

    return this.web3.eth.sendSignedTransaction(`0x${serializedTx}`);
  }

  async adressBalance(from) {
    const res = await this.web3.eth.getBalance(from)
    const balance = this.web3.utils.fromWei(res, 'ether');
    return { balance }
  }
}

module.exports = new EthereumNode(process.env.PROVIDER);
