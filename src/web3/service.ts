import Web3 from 'web3';
import GovernorAdminABI from './abi/GovernorAdmin.json';
import BasketManagerV3ABI from './abi/BasketManagerV3.json';
import MassetV3ABI from './abi/MassetV3.json';
// import MassetProxyABI from './abi/MassetProxy.json';
import ERC20ABI from './abi/ERC20.json';
import {tokenType} from "../config/Tokens";

const ADDRESSES = {
  // sovToken: {
  //   address: '0x6a9A07972D07e58F0daf5122d11E069288A375fb',
  //   abi: SovTokenABI as any,
  // },
  // staking: {
  //   address: '0xc37A85e35d7eECC82c4544dcba84CF7E61e1F1a3',
  //   abi: StakingABI as any,
  // },
  governorAdmin: {
    address: '0x1528f0341a1Ea546780caD690F54b4FBE1834ED4',
    abi: GovernorAdminABI as any,
  },
  governorOwner: {
    address: '0x058FD3F6a40b92b311B49E5e3E064300600021D7',
    abi: GovernorAdminABI as any,
  },
  ETHs_BasketManagerV3: {
    address: '0xD86C8F0327494034F60e25074420BcCF560D5610',
    abi: BasketManagerV3ABI as any,
  },
  ETHs_MassetV3: {
    address: '0x254dffcd3277C0b1660F6d42EFbB754edaBAbC2B',
    abi: MassetV3ABI as any,
  },
  // vestingRegistry: {
  //   address: '0x80ec7ADd6CC1003BBEa89527ce93722e1DaD5c2a',
  //   abi: VestingRegistryABI as any,
  // },
  // vestingRegistry2: {
  //   address: '0x310006E356b0818C3Eaf86a9B2f13013d4691a1c',
  //   abi: VestingRegistryABI as any,
  // },
  // vestingRegistry3: {
  //   address: '0x52E4419b9D33C6e0ceb2e7c01D3aA1a04b21668C',
  //   abi: VestingRegistryABI as any,
  // },
  // priceFeed: {
  //   address: '0x7f38c422b99075f63C9c919ECD200DF8d2Cf5BD4',
  //   abi: priceFeedsAbi as any,
  // },
  // swapNetwork: {
  //   address: '0x61172B53423E205a399640e5283e51FE60EC2256',
  //   abi: SwapNetworkABI as any,
  // },
  // feeSharingProxy: {
  //   address: '0x740E6f892C0132D659Abcd2B6146D237A4B6b653',
  //   abi: feeSharingProxyAbi as any,
  // },
  // DOC_token: {
  //   address: '0xCB46c0ddc60D18eFEB0E586C17Af6ea36452Dae0',
  //   abi: tokenAbi as any,
  // },
  // DOC_itoken: {
  //   address: '0x74e00A8CeDdC752074aad367785bFae7034ed89f',
  //   abi: tokenAbi as any,
  // },
  // RBTC_token: {
  //   address: '0x69FE5cEC81D5eF92600c1A0dB1F11986AB3758Ab',
  //   abi: abiTestWBRTCToken as any,
  // },
  // RBTC_itoken: {
  //   address: '0xe67Fe227e0504e8e96A34C3594795756dC26e14B',
  //   abi: abiTestWBRTCToken as any,
  // },
  // USDT_token: {
  //   address: '0x4d5a316d23ebe168d8f887b4447bf8dbfa4901cc',
  //   abi: tokenAbi as any,
  // },
  // USDT_itoken: {
  //   address: '0xd1f225BEAE98ccc51c468d1E92d0331c4f93e566',
  //   abi: tokenAbi as any,
  // },
  // BPRO_token: {
  //   address: '0x4da7997a819bb46b6758b9102234c289dd2ad3bf',
  //   abi: tokenAbi as any,
  // },
  // BPRO_itoken: {
  //   address: '0x6226b4B3F29Ecb5f9EEC3eC3391488173418dD5d',
  //   abi: tokenAbi as any,
  // },
  // SOV_token: {
  //   address: '0x6a9A07972D07e58F0daf5122d11E069288A375fb',
  //   abi: tokenAbi as any,
  // },
};

export async function listProposals(web3: Web3, start = 0, end = 10) : Promise<any[]> {
  const myContract = new web3.eth.Contract(ADDRESSES.governorAdmin.abi, ADDRESSES.governorAdmin.address);
  const count = myContract.methods.proposalCount().call();
  const results = await Promise.all(new Array(end - start).fill(null).map(
    (aux, index) => myContract.methods.proposals(start + index).call()
  ));
  return results as any[]
}

export async function listBassets(web3: Web3, start = 0, end = 10) : Promise<tokenType[]> {
  const myContract = new web3.eth.Contract(ADDRESSES.ETHs_BasketManagerV3.abi, ADDRESSES.ETHs_BasketManagerV3.address);
  const count = await myContract.methods.getBassets().call();
  return count;
}

export async function redeem(web3: Web3) : Promise<any[]> {
  const myContract = new web3.eth.Contract(ADDRESSES.ETHs_MassetV3.abi, ADDRESSES.ETHs_MassetV3.address);
  const count = await myContract.methods.redeem().call();
  return count;
}

export async function getTokenBalance(web3: Web3, tokenAddress: string) : Promise<number> {
  const accounts = await web3.eth.getAccounts();
  const myContract = new web3.eth.Contract(ERC20ABI as any, tokenAddress);
  const count = await myContract.methods.balanceOf(accounts[0]).call();
  return count;
}
