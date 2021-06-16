const ethereumNode = require('../controller/ethereumNode');

const address1 = process.env.ADDRESS1;
const privateKey = process.env.ADDRESS1_KEY;

(async () => {
  try {
    const resp = await ethereumNode.deployContract(address1, privateKey, 'contracts/cars.sol', 'Cars', ['uint256'], ['3']);
    console.log(`Contract deployed: ${resp.contractAddress}`); // eslint-disable-line
  } catch (error) {
    console.log({ error }); // eslint-disable-line
  }
})();
