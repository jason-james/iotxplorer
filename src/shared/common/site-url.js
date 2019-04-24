// @flow

export const SITE_URL = '/';
export const CONSENSUS_API = '/api/getConsensusMetrics';
export const IOTXPLORER_URL = 'https://iotxplorer.io/';

export class ADDRESS {
  static get INDEX(): string {
    return '/address/:id/';
  }

  static get GET_ACTIONS(): string {
    return '/api/getActionsAddress';
  }

  static get GET_ADDRESS(): string {
    return '/api/getAddressId';
  }

  static get GET_TRANSFERS(): string {
    return '/api/getAddressTransfersId';
  }

  static get GET_EXECUTIONS(): string {
    return '/api/getAddressExecutionsId';
  }

  static get GET_VOTERS(): string {
    return '/api/getAddressVotersId';
  }

  static get GET_SETTLE_DEPOSITS(): string {
    return '/api/getAddressSettleDepositsId';
  }

  static get GET_CREATE_DEPOSITS(): string {
    return '/api/getAddressCreateDepositsId';
  }
}

export class VOTE {
  static get INDEX(): string {
    return '/votes/:id/';
  }

  static get GET_VOTE(): string {
    return '/api/getVoteId';
  }
}

export class VOTES {
  static get INDEX(): string {
    return '/votes/';
  }

  static get GET(): string {
    return '/api/getVotes';
  }
}

export class BLOCK {
  static get INDEX(): string {
    return '/blocks/:id/';
  }

  static get GET_BLOCK(): string {
    return '/api/getBlockId';
  }

  static get GET_TRANSFERS(): string {
    return '/api/getBlockTransfersId';
  }

  static get GET_VOTES(): string {
    return '/api/getBlockVotesId';
  }

  static get GET_EXECUTIONS(): string {
    return '/api/getBlockExecutionsId';
  }
}

export class BLOCKS {
  static get INDEX(): string {
    return '/blocks/';
  }

  static get GET(): string {
    return '/api/getBlocks';
  }
}

export class EXECUTION {
  static get INDEX(): string {
    return '/executions/:id/';
  }

  static get GET(): string {
    return '/api/getExecutionId';
  }

  static get GET_RECEIPT(): string {
    return '/api/getExecutionReceipt';
  }

  static get GET_EXECUTIONS(): string {
    return '/api/getContractExecutions';
  }
}

export class EXECUTIONS {
  static get INDEX(): string {
    return '/executions/';
  }

  static get GET(): string {
    return '/api/getExecutions';
  }
}

export class TRANSFER {
  static get INDEX(): string {
    return '/transfers/:id/';
  }

  static get GET(): string {
    return '/api/getTransferId';
  }
}

export class TRANSFERS {
  static get INDEX(): string {
    return '/transfers/';
  }

  static get GET(): string {
    return '/api/getTransfers';
  }
}

export class ACTION {
  static get INDEX(): string {
    return '/actions/:id/';
  }

  static get GET(): string {
    return '/api/getAction';
  }
}

export class DEPOSIT {
  static get INDEX_SETTLE(): string {
    return '/settle-deposit/:id';
  }

  static get INDEX_CREATE(): string {
    return '/create-deposit/:id';
  }

  static get GET_SETTLE(): string {
    return '/api/getSettleDepositId';
  }

  static get GET_CREATE(): string {
    return '/api/getcreateDepositId';
  }
}

export class NAV {
  static get STATISTIC(): string {
    return '/api/getStatistic';
  }

  static get PRICE(): string {
    return '/api/getPrice';
  }

  static get FUZZY_SEARCH(): string {
    return '/api/getBlockOrActionByHash';
  }
}

export class DASHBOARD {
  static get MARKET_DATA(): String {
    return '/api/getMarketData';
  }

  static get BLOCK_METAS(): String {
    return '/api/getBlockMetas';
  }

  static get BLOCK_META(): String {
    return '/api/getBlockMeta';
  }

  static get CANDIDATE_DATA(): String {
    return '/api/getCandidateData';
  }

  static get ELECTION_STATS(): String {
    return '/api/getElectionStats';
  }
}

export class CHART {
  static get CHART_DATA(): String {
    return '/api/getChartData';
  }
}

export class WALLET {
  static get INDEX(): string {
    return '/wallet';
  }

  static get GENERATE_KEY_PAIR(): string {
    return '/api/wallet/generateKeyPair';
  }

  static get UNLOCK_WALLET(): string {
    return '/api/wallet/unlockWallet';
  }

  static get TRANSACTION(): string {
    return '/wallet/transaction';
  }

  static get CONTRACT(): string {
    return '/wallet/transaction';
  }

  static get GENERATE_TRANSFER(): string {
    return `/api${this.TRANSACTION}/generateTransfer`;
  }

  static get GENERATE_VOTE(): string {
    return `/api${this.TRANSACTION}/generateVote`;
  }

  static get SEND_TRANSACTION(): string {
    return `/api${this.TRANSACTION}/sendTransaction`;
  }

  static get CONTINUE_DEPOSIT(): string {
    return `/api${this.TRANSACTION}/continueDeposit`;
  }

  static get SIGN_AND_SETTLE_DEPOSIT(): string {
    return `/api${this.TRANSACTION}/signSettleDeposit`;
  }

  static get SIGN_CONTRACT_ABI(): string {
    return `/api${this.CONTRACT}/signContractAbi`;
  }

  static get GENERATE_EXECUTION(): string {
    return `/api${this.CONTRACT}/generateExecution`;
  }

  static get READ_EXECUTION(): string {
    return `/api${this.CONTRACT}/readExecution`;
  }
}

export class DELEGATES {
  static get INDEX(): string {
    return '/delegates';
  }

  static get GET(): string {
    return '/api/getDelegates';
  }
}

export class STAKING {
  static get INDEX(): string {
    return '/staking';
  }
}

export class STAKING_DASHBOARD {
  static get INDEX(): string {
    return '/staking/dashboard';
  }

  static get CALCULATORS(): string {
    return '/staking/calculators';
  }

  static get DELEGATE_DATA(): string {
    return '/api/getDelegateData';
  }

  static get IOTXPLORER_DELEGATE_DATA(): string {
    return '/api/getIotxplorerDelegateData';
  }
}

export class HOW_TO_STAKE {
  static get INDEX(): string {
    return '/staking/howto';
  }
}

export class EDUCATION {
  static get INDEX(): string {
    return '/education';
  }

  static get UNDERSTANDING_IOTEX(): string {
    return '/education/understandingiotex';
  }

  static get USING_THE_TESTNET(): string {
    return '/education/usingthetestnet';
  }

  static get VOTING_AND_DELEGATING(): string {
    return '/education/votingdelegating';
  }
}
