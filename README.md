# web3 and solidity experiments

## Requirements
- Node js installed
- An Infura account
- A Metamask account
- Ganache installed (optional)

## Set up

Create an env file with the following variable:
```
PROVIDER=YOUR_INFURA_ROPSTEN_ENDPONIT
```

install dependecies
```
npm install
```

start server
```
npm start
```

## Routes

### GET /
```
{ title: 'Crypto practice project' }
```

### GET /transactions/last-block
returns the transactions of the last block

### POST /transactions/perform
transfers money from an address to another <br>
body params:
```
{
  address1: FROM ADDRESS,
  address2: RECEIPT ADDRESS,
  privateKey: ADDRESS PRIVATE KEY,
  amount: AMOUNT IN ETHER CURRENCY:  
}
```

### GET /balance/:address
returns the balance of the address in ether currency. <br>
request params: address

## How to deploy cars contract
1. set up your env file with the following variables:
```
PROVIDER=YOUR_INFURA_ROPSTEN_ENDPONIT
ADDRESS1=SOME_ADDRESS
ADDRESS1_KEY=THE_ADDRESS_KEY
```
2. run the following command:
```
 node contracts/deploy_tutorial.js
```
3. expected output:
```
  Contract deployed: CONTRACT ADDRESS
```
4. search contract on https://ropsten.etherscan.io/
