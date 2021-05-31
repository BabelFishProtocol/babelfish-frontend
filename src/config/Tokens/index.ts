import usdtIcon from "../../resources/images/Tokens/Usdt/usdt.png";
import paxIcon from "../../resources/images/Tokens/Pax/pax.png";
import daiIcon from "../../resources/images/Tokens/Dai/dai.png";
import usdcIcon from "../../resources/images/Tokens/Usdc/usdc.png";
import busdIcon from "../../resources/images/Tokens/Busd/busd.png";

export enum tokenEnum {
  USDT = "USDT",
  USDC = "USDC",
  BUSD = "BUSD",
  PAX = "PAX",
  DAI = "DAI",
}
export const tokens = [
  { name: "USDT", id: tokenEnum.USDT, icon: usdtIcon },
  { name: "USDC", id: tokenEnum.USDC, icon: usdcIcon },
  { name: "BUSD", id: tokenEnum.BUSD, icon: busdIcon },
  { name: "PAX", id: tokenEnum.PAX, icon: paxIcon },
  { name: "DAI", id: tokenEnum.PAX, icon: daiIcon },
];
