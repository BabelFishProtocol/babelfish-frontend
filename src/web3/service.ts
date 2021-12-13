import Web3 from 'web3';
import BN from 'bn.js';
import ERC20ABI from './abi/ERC20.json';
import AllowTokensABI from './abi/AllowTokens.json';
import {destinationTokenEnum, tokenType} from '../config/Tokens';
import {chainEnum} from '../config/Chains';
import {
  amountAsBN2,
  EthLiveTransaction,
} from '../utils/themes/ethLiveTransaction';
import {
  BRIDGED_ADDRESSES,
  FROM_RSK_BRIDGE_ADDRESSES,
  TO_RSK_BRIDGE_ADDRESSES,
} from './Contracts';

export async function listBassets(web3: Web3, bridgedTo: destinationTokenEnum) {
  const basketManager = new web3.eth.Contract(
    BRIDGED_ADDRESSES[bridgedTo].BasketManagerNew.abi,
    BRIDGED_ADDRESSES[bridgedTo].BasketManagerNew.address,
  );
  const tokenAddresses = (await basketManager.methods
    .getBassets()
    .call()) as string[];
  // ToDo: Fetch network based on bridge
  const tokenAddressesMap = Object.fromEntries(
    (
      await Promise.all(
        tokenAddresses.map(async (tokenAddress) => {
          const myERC20 = new web3.eth.Contract(ERC20ABI as any, tokenAddress);
          const tokenSymbol = await myERC20.methods.symbol().call();
          return [tokenSymbol, tokenAddress];
        }),
      )
    ).filter(Boolean),
  );
  return tokenAddressesMap;
}

export async function getTokenBalance(
  web3: Web3,
  tokenAddress: string,
): Promise<BN> {
  const account = (await web3.eth.getAccounts())[0];
  const tokenContract = new web3.eth.Contract(ERC20ABI as any, tokenAddress);
  const balance = await tokenContract.methods
    .balanceOf(account.toLowerCase())
    .call();
  return new BN(balance);
}

export async function bridgeFees(
  web3: Web3,
  sourceNetwork: chainEnum,
  goingInto: boolean,
): Promise<BN> {
  // if (sourceNetwork === chainEnum.RSK) {
  //   return new BN(0);
  // }
  // const bridgeSpec = !goingInto ? FROM_RSK_BRIDGE_ADDRESSES[sourceNetwork] : TO_RSK_BRIDGE_ADDRESSES[sourceNetwork];
  // console.log(bridgeSpec.allowTokenAddress, bridgeSpec.address);
  // // const bridgeContract = new web3.eth.Contract(bridgeSpec.abi as any, bridgeSpec.address);
  // const allowTokensContract = new web3.eth.Contract(AllowTokensABI as any, bridgeSpec.allowTokenAddress);
  // const [
  //   // spentToday,
  //   // dailyLimit,
  //   // getMinPerToken,
  //   getFeePerToken,
  //   // getMaxTokensAllowed,
  // ] = await Promise.all([
  //   // bridgeContract.methods.spentToday().call(),
  //   // allowTokensContract.methods.dailyLimit().call(),
  //   allowTokensContract.methods.getMinPerToken(bridgeSpec.address).call(),
  //   // allowTokensContract.methods.getFeePerToken(bridgeSpec.address).call(),
  //   // allowTokensContract.methods.getMaxTokensAllowed().call(),
  // ]);
  // console.log('getFeePerToken', getFeePerToken);
  // return new BN(getFeePerToken);
  return new BN(0);
}

function getRedeemTrx(
  web3: Web3,
  sourceNetwork: chainEnum,
  asset: tokenType,
  quantity: BN,
  receiverAddress?: string,
): any {
  const bridgedTo = asset.bridgedTo.id;
  const tokenOnNetwork = asset.networks[sourceNetwork]!;
  const bAssetAddress = tokenOnNetwork.address;
  const mAssetAddress = BRIDGED_ADDRESSES[bridgedTo].MassetV3.address;
  const mAssetContract = new web3.eth.Contract(
    BRIDGED_ADDRESSES[bridgedTo].MassetV3.abi,
    mAssetAddress,
  );
  if (sourceNetwork === chainEnum.RSK) {
    return mAssetContract.methods.redeemTo(
      bAssetAddress,
      quantity,
      receiverAddress,
    );
  }
  return mAssetContract.methods.redeemToBridge(
    bAssetAddress,
    quantity,
    receiverAddress,
  );
}

export async function redeemEstimateGas(
  web3: Web3,
  sourceNetwork: chainEnum,
  asset: tokenType,
  quantity: BN,
): Promise<BN> {
  // const receiverAddress = '0x0000000000000000000000000000000000000000';
  // const gas = await getRedeemTrx(web3, sourceNetwork, asset, quantity, receiverAddress).estimateGas();
  // console.log('gas', gas);
  // return new BN(gas);
  return new BN(0);
}

export async function redeem(
  web3: Web3,
  sourceNetwork: chainEnum,
  asset: tokenType,
  quantity: BN,
  _receiverAddress?: string,
): Promise<EthLiveTransaction> {
  const bAssetName = asset.name;
  const bridgedTo = asset.bridgedTo.id;
  const account = (await web3.eth.getAccounts())[0];
  const receiverAddress = _receiverAddress ? _receiverAddress : account;
  return new EthLiveTransaction(
    () =>
      getRedeemTrx(web3, sourceNetwork, asset, quantity, receiverAddress).send({
        from: account,
      }),
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

export async function depositEstimateGas(
  web3: Web3,
  sourceNetwork: chainEnum,
  asset: tokenType,
  quantity: BN,
): Promise<BN> {
  // const receiverAddress = '0x0000000000000000000000000000000000000000';
  // const gas = await getRedeemTrx(web3, sourceNetwork, asset, quantity, receiverAddress).estimateGas();
  // console.log('gas', gas);
  // return new BN(gas);
  return new BN(0);
}

export async function deposit(
  web3: Web3,
  sourceNetwork: chainEnum,
  asset: tokenType,
  quantity: BN,
  _receiverAddress?: string,
): Promise<EthLiveTransaction> {
  const bAssetName = asset.name;
  const bridgedTo = asset.bridgedTo.id;
  const tokenOnNetwork = asset.networks[sourceNetwork]!;
  const quantity2 = amountAsBN2({
    amount: quantity,
    decimals: tokenOnNetwork.decimals,
  });
  const bAssetAddress = tokenOnNetwork.address;
  const account = (await web3.eth.getAccounts())[0];
  const receiverAddress = _receiverAddress ? _receiverAddress : account;
  const mAssetAddress = BRIDGED_ADDRESSES[bridgedTo].MassetV3.address;
  const mAssetContract = new web3.eth.Contract(
    BRIDGED_ADDRESSES[bridgedTo].MassetV3.abi,
    mAssetAddress,
  );
  let assetContract: any;
  if (sourceNetwork === chainEnum.RSK) {
    assetContract = new web3.eth.Contract(ERC20ABI as any, bAssetAddress);
  } else {
    assetContract = new web3.eth.Contract(
      ERC20ABI as any,
      tokenOnNetwork.oAddress,
    );
  }
  return new EthLiveTransaction(
    () => {
      if (sourceNetwork === chainEnum.RSK) {
        return assetContract.methods
          .approve(mAssetAddress, quantity2)
          .send({from: account});
      }
      const bridgeSpec = FROM_RSK_BRIDGE_ADDRESSES[sourceNetwork];
      return assetContract.methods
        .approve(bridgeSpec.address, quantity2)
        .send({from: account});
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
    () =>
      new EthLiveTransaction(
        () => {
          if (sourceNetwork === chainEnum.RSK) {
            return mAssetContract.methods
              .mintTo(bAssetAddress, quantity2, receiverAddress)
              .send({from: account});
          }
          const bridgeSpec = FROM_RSK_BRIDGE_ADDRESSES[sourceNetwork];
          const bridgeContract = new web3.eth.Contract(
            bridgeSpec.abi as any,
            bridgeSpec.address,
          );
          const extraData = web3.eth.abi.encodeParameters(
            ['address'],
            [receiverAddress],
          );
          // ToDo: For deposit of XUSD happens something weird...
          return bridgeContract.methods
            .receiveTokensAt(
              tokenOnNetwork.oAddress,
              quantity2,
              mAssetAddress,
              extraData,
            )
            .send({from: account});
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
