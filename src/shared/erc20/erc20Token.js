import BigNumber from "bignumber.js";
import { Account } from "iotex-antenna/lib/account/account";
import { DecodeData, ERC20, IERC20 } from "./erc20";
import { IRpcMethod } from "iotex-antenna/lib/rpc-method/types";

export interface IERC20TokenInfo {
  erc20TokenAddress: string;
  balance: BigNumber;
  decimals: BigNumber;
  symbol: string;
  name: string;
  balanceString: string;
}

export interface IERC20TokenDict {
  [index: string]: ERC20Token;
}

export interface IERC20TokenInfoDict {
  [index: string]: IERC20TokenInfo;
}

export class ERC20Token {
  erc20: IERC20;
  static erc20Refs: { [index: string]: IERC20 } = {};
  static erc20TokenRefs: { [index: string]: ERC20Token } = {};

  constructor(erc20TokenAddress: string, provider: IRpcMethod) {
    // const erc20Refs = {};
    // const erc20TokenRefs = {};
    // this.erc20Refs = erc20Refs;
    // this.erc20TokenRefs = erc20TokenRefs;

    if (!ERC20Token.erc20Refs[erc20TokenAddress]) {
      ERC20Token.erc20Refs[erc20TokenAddress] = ERC20.create(
        erc20TokenAddress,
        provider
      );
    }
    this.erc20 = ERC20Token.erc20Refs[erc20TokenAddress];
    ERC20Token.erc20TokenRefs[erc20TokenAddress] = this;
  }

  static getToken = (erc20TokenAddress: string, provider: IRpcMethod) => {
    if (ERC20Token.erc20TokenRefs[erc20TokenAddress]) {
      return ERC20Token.erc20TokenRefs[erc20TokenAddress];
    }
    ERC20Token.erc20TokenRefs[erc20TokenAddress] = new ERC20Token(
      erc20TokenAddress,
      provider
    );

    return ERC20Token.erc20TokenRefs[erc20TokenAddress];
  };

  decode = (data: string) => {
    return this.erc20.decode(data);
  };

  checkValid = async () => {
    try {
      const symbol = await this.erc20.symbol(this.erc20.address);
      return `${symbol}`.length > 0;
    } catch (error) {
      return false;
    }
  };

  getInfo = async (walletAddress: string) => {
    const erc20 = this.erc20;
    const [balance, name, symbol, decimals] = await Promise.all([
      erc20.balanceOf(walletAddress, walletAddress),
      erc20.name(walletAddress),
      erc20.symbol(walletAddress),
      erc20.decimals(walletAddress)
    ]);
    const balanceString = balance
      .dividedBy(10 ** decimals.toNumber())
      .toString();
    return {
      erc20TokenAddress: this.erc20.address,
      balance,
      decimals,
      symbol,
      name,
      balanceString
    };
  };

  transfer = async (
    to: string,
    value: BigNumber,
    account: Account,
    gasPrice: string,
    gasLimit: string
  ) => {
    return this.erc20.transfer(to, value, account, gasPrice, gasLimit);
  };
}
