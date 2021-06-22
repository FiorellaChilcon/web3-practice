# web3 and solidity experiments

## Requirements
- Node js installed
- An Infura account
- A Metamask account
- Ganache installed

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

## How to deploy "Cars" contract with solc?
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

## How to deploy "Coin" contract with openzeppelin?
1. Open Ganache and select or create a workspace on port 8545.
2. Open Metamask with the network localhost:8545.
3. Compile:
```
npx oz compile
```
4. Deploy:
```
npx oz deploy
```

Choose regular:
```
? Choose the kind of deployment (Use arrow keys)
❯ regular       standard non-upgradeable contract 
  upgradeable   upgradeable instance using a delegating proxy (EIP1967) 
  minimal       non-upgradeable minimal proxy instance (EIP1167) 
```

Choose development:
```
? Pick a network (Use arrow keys)
❯ development
```

Choose the BananaCoin contract:
```
? Pick a contract to deploy (Use arrow keys)
   = Your contracts =
❯ BananaCoin 
  Cars
```

5. Add your custom arguments
```
? _name: string: BananaCoin
? _symbol: string: 🍌
? _totalSupply: uint256: 100000000000000000000
✓ Deployed instance of Coin
0x736189SAJKLB58Ll9D983837a6DB0a8091467cG
```
6. Add the token to a metamask account.
7. Interact with the contract with the following commands: <br>
Use the following to run functions that change the contract state:
```
npx oz send-tx
```
Use the following if you just want to access to a variable value:
```
npx oz call
```
