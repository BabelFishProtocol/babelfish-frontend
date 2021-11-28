import Web3 from 'web3';
import BN from 'bn.js';
import ERC20ABI from './abi/ERC20.json';
import {destinationTokenEnum, tokenType} from "../config/Tokens";
import {chainEnum} from "../config/Chains";
import {amountAsBN2, EthLiveTransaction} from "../utils/themes/ethLiveTransaction";
import {BRIDGED_ADDRESSES, FROM_RSK_BRIDGE_ADDRESSES} from "./Contracts";

export async function listBassets(web3: Web3, bridgedTo: destinationTokenEnum) {
  const basketManager = new web3.eth.Contract(BRIDGED_ADDRESSES[bridgedTo].BasketManagerNew.abi, BRIDGED_ADDRESSES[bridgedTo].BasketManagerNew.address);
  const tokenAddresses = await basketManager.methods.getBassets().call() as string[];
  // ToDo: Fetch network based on bridge
  const tokenAddressesMap = Object.fromEntries((await Promise.all(tokenAddresses.map(
    async (tokenAddress) => {
      const myERC20 = new web3.eth.Contract(ERC20ABI as any, tokenAddress);
      const tokenSymbol = await myERC20.methods.symbol().call();
      return [tokenSymbol, tokenAddress]
    }
  ))).filter(Boolean));
  return tokenAddressesMap;
}

export async function getTokenBalance(web3: Web3, tokenAddress: string) : Promise<BN> {
  const account = (await web3.eth.getAccounts())[0];
  const tokenContract = new web3.eth.Contract(ERC20ABI as any, tokenAddress);
  const balance = await tokenContract.methods.balanceOf(account).call();
  return new BN(balance);
}

export async function redeem(
  web3: Web3, sourceNetwork: chainEnum, asset: tokenType, quantity: BN, _receiverAddress?: string,
) : Promise<EthLiveTransaction> {
  const bAssetName = asset.name;
  const bridgedTo = asset.bridgedTo.id;
  const tokenOnNetwork = asset.networks[sourceNetwork]!;
  const bAssetAddress = tokenOnNetwork.address;
  const account = (await web3.eth.getAccounts())[0];
  const receiverAddress = _receiverAddress ? _receiverAddress : account;
  const mAssetAddress = BRIDGED_ADDRESSES[bridgedTo].MassetV3.address;
  const mAssetContract = new web3.eth.Contract(BRIDGED_ADDRESSES[bridgedTo].MassetV3.abi, mAssetAddress);

  return new EthLiveTransaction(
    () => {
      if (sourceNetwork === chainEnum.RSK) {
        return mAssetContract.methods.redeemTo(bAssetAddress, quantity, receiverAddress).send({from: account});
      }
      return mAssetContract.methods.redeemToBridge(bAssetAddress, quantity, receiverAddress).send({from: account});
    },
    {
      currency: bAssetName,
      amount: quantity,
    },
    {
      currency: bridgedTo.toString(),
      amount: quantity,
    },
  );
}

export async function deposit(
  web3: Web3, sourceNetwork: chainEnum, asset: tokenType, quantity: BN, _receiverAddress?: string,
) : Promise<EthLiveTransaction> {
  const bAssetName = asset.name;
  const bridgedTo = asset.bridgedTo.id;
  const tokenOnNetwork = asset.networks[sourceNetwork]!;
  const quantity2 = amountAsBN2({amount: quantity, decimals: tokenOnNetwork.decimals});
  const bAssetAddress = tokenOnNetwork.address;
  const account = (await web3.eth.getAccounts())[0];
  const receiverAddress = _receiverAddress ? _receiverAddress : account;
  const mAssetAddress = BRIDGED_ADDRESSES[bridgedTo].MassetV3.address;
  const mAssetContract = new web3.eth.Contract(BRIDGED_ADDRESSES[bridgedTo].MassetV3.abi, mAssetAddress);
  const bAssetContract = new web3.eth.Contract(ERC20ABI as any, bAssetAddress);
  const assetContract = new web3.eth.Contract(ERC20ABI as any, tokenOnNetwork.oAddress);
  return new EthLiveTransaction(
    () => {
      if (sourceNetwork === chainEnum.RSK) {
        return bAssetContract.methods.approve(mAssetAddress, quantity2).send({from: account});
      }
      const bridgeSpec = FROM_RSK_BRIDGE_ADDRESSES[sourceNetwork];
      return assetContract.methods.approve(bridgeSpec.address, quantity2).send({from: account});
    },
    {
      currency: bAssetName,
      amount: quantity,
      decimals: tokenOnNetwork.decimals,
    },
    {
      currency: bridgedTo.toString(),
      amount: quantity,
      decimals: tokenOnNetwork.decimals,
    },
    () => new EthLiveTransaction(
      () => {
        if (sourceNetwork === chainEnum.RSK) {
          return mAssetContract.methods.mintTo(bAssetAddress, quantity2, receiverAddress).send({from: account});
        }
        const bridgeSpec = FROM_RSK_BRIDGE_ADDRESSES[sourceNetwork];
        const bridgeContract = new web3.eth.Contract(bridgeSpec.abi as any, bridgeSpec.address);
        const extraData = web3.eth.abi.encodeParameters(
          ['address'],
          [receiverAddress],
        );
        // ToDo: For deposit of XUSD happens something weird...
        return bridgeContract.methods.receiveTokensAt(tokenOnNetwork.oAddress, quantity2, mAssetAddress, extraData).send({from: account});
      },
      {
        currency: bAssetName,
        amount: quantity,
      },
      {
        currency: bridgedTo.toString(),
        amount: quantity,
      },
    ),
  );
}
