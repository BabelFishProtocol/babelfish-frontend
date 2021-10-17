import Web3 from 'web3';
import BN from 'bn.js';
import GovernorAdminABI from './abi/GovernorAdmin.json';
import BasketManagerABI from './abi/BasketManager.json';
import BasketManagerV3ABI from './abi/BasketManagerV3.json';
import MassetV3ABI from './abi/MassetV3.json';
// import BasketManagerV3ABI from './abi/BasketManagerV3.json';
// import MassetProxyABI from './abi/MassetProxy.json';
import ERC20ABI from './abi/ERC20.json';
import {destinationTokenEnum, destinationTokensCatalog, offlineTokenList, tokenType} from "../config/Tokens";
// import {chainEnum} from "../config/Chains";

// const IS_TESTNET = process.env.REACT_APP_CHAIN_ID === '31';
const IS_LOCALNET = process.env.REACT_APP_CHAIN_ID !== '31';

const BRIDGED_ADDRESSES = {
  [destinationTokenEnum.ETHs]: {
    BasketManager: {
      address: IS_LOCALNET ? '0xe982E462b094850F12AF94d21D470e21bE9D0E9C' : '0xaC148e5D164Ce1164e14913b329feA8e4dA0b699',
      abi: BasketManagerABI as any,
    },
    BasketManagerNew: {
      address: IS_LOCALNET ? '0x7C728214be9A0049e6a86f2137ec61030D0AA964' : '',
      abi: BasketManagerV3ABI as any,
    },
    MassetV3: {
      address: IS_LOCALNET ? '0x254dffcd3277C0b1660F6d42EFbB754edaBAbC2B' : '0x04D92DaA8f3Ef7bD222195e8D1DbE8D89A8CebD3',
      abi: MassetV3ABI as any,
    },
  },
  [destinationTokenEnum.XUSD]: {
    BasketManager: {
      address: IS_LOCALNET ? '0x26b4AFb60d6C903165150C6F0AA14F8016bE4aec' : '0x68e3F7b68DA8d565452063e2180D9b31853E8587',
      abi: BasketManagerABI as any,
    },
    BasketManagerNew: {
      address: IS_LOCALNET ? '0xf19A2A01B70519f67ADb309a994Ec8c69A967E8b' : '',
      abi: BasketManagerV3ABI as any,
    },
    MassetV3: {
      address: IS_LOCALNET ? '0x67B5656d60a809915323Bf2C40A8bEF15A152e3e' : '0xca8b437d9d586b938CE000e765476A0594856b51',
      abi: MassetV3ABI as any,
    },
  },
  [destinationTokenEnum.BNBs]: {
    BasketManager: {
      address: IS_LOCALNET ? '0xFC628dd79137395F3C9744e33b1c5DE554D94882' : '0xEF70a2ddB784D561574192926B0A5C8a85902FAF',
      abi: BasketManagerABI as any,
    },
    BasketManagerNew: {
      address: IS_LOCALNET ? '0x9e90054F4B6730cffAf1E6f6ea10e1bF9dD26dbb' : '',
      abi: BasketManagerV3ABI as any,
    },
    MassetV3: {
      address: IS_LOCALNET ? '0xA94B7f0465E98609391C623d0560C5720a3f2D33' : '0x790C4451c2e8e4cDC50cEdEC22756DaC993e93eb',
      abi: MassetV3ABI as any,
    },
  },
} as const;

export async function listBassets(web3: Web3, bridgedTo: destinationTokenEnum, start = 0, end = 10) : Promise<tokenType[]> {
  const basketManager = new web3.eth.Contract(BRIDGED_ADDRESSES[bridgedTo].BasketManagerNew.abi, BRIDGED_ADDRESSES[bridgedTo].BasketManagerNew.address);
  const tokenAddresses = await basketManager.methods.getBassets().call() as string[];
  console.log('tokenAddresses', tokenAddresses);
  return [];
  // return await Promise.all(tokenAddresses.map(
  //   async (tokenAddress) => {
  //     const myContract = new web3.eth.Contract(ERC20ABI as any, tokenAddress);
  //     const tokenName = await myContract.methods.name().call();
  //     const tokenSymbol = await myContract.methods.symbol().call();
  //     const offlineToken = offlineTokenList.find(
  //       ({symbol}) => symbol === tokenSymbol
  //     );
  //     const icon = offlineToken?.icon;
  //     const id = offlineToken?.id;
  //     const networks = offlineToken?.networks || [];
  //     // ToDo: Fetch network based on bridge
  //     // const networks = [chainEnum.RSK];
  //     return {
  //       id,
  //       icon,
  //       bridgedTo: {
  //         id: bridgedTo,
  //         ...destinationTokensCatalog[bridgedTo],
  //       },
  //       networks,
  //       address: tokenAddress,
  //       name: tokenName,
  //       symbol: tokenSymbol,
  //     };
  //   }
  // ));
}

export async function getTokenBalance(web3: Web3, tokenAddress: string) : Promise<BN> {
  const account = (await web3.eth.getAccounts())[0];
  console.log('getting balance', tokenAddress, account);
  const tokenContract = new web3.eth.Contract(ERC20ABI as any, tokenAddress.toUpperCase());
  const balance = await tokenContract.methods.balanceOf(account).call();
  console.log('balance is', balance.toString());
  return balance;
}

export async function redeem(web3: Web3, bAssetAddress: string, quantity: BN, bridgedTo: destinationTokenEnum) : Promise<any[]> {
  const account = (await web3.eth.getAccounts())[0];
  const mAssetContract = new web3.eth.Contract(BRIDGED_ADDRESSES[bridgedTo].MassetV3.abi, BRIDGED_ADDRESSES[bridgedTo].MassetV3.address);
  console.log('redeeming', BRIDGED_ADDRESSES[bridgedTo].MassetV3.address, bAssetAddress, quantity.toString());
  const rr = await mAssetContract.methods.redeem(bAssetAddress, quantity).send({from: account});
  console.log('rr', rr);
  return rr;
}

export async function deposit(web3: Web3, bAssetAddress: string, quantity: BN, bridgedTo: destinationTokenEnum) : Promise<any[]> {
  const bAssetContract = new web3.eth.Contract(ERC20ABI as any, bAssetAddress.toUpperCase());
  const mAssetAddress = BRIDGED_ADDRESSES[bridgedTo].MassetV3.address;
  const mAssetContract = new web3.eth.Contract(BRIDGED_ADDRESSES[bridgedTo].MassetV3.abi, mAssetAddress);
  const account = (await web3.eth.getAccounts())[0];
  console.log('approving', bAssetAddress, mAssetAddress, quantity);
  await bAssetContract.methods.approve(mAssetAddress, quantity).send({from: account});
  // const rr2 = await bAssetContract.methods.allowance(account, mAssetAddress).call();
  // console.log('allowed', rr2.toString());
  console.log('minting', mAssetAddress, bAssetAddress, quantity.toString());
  const rr = await mAssetContract.methods.mint(bAssetAddress, quantity).send({from: account});
  console.log('rr', rr);
  return rr;
}
