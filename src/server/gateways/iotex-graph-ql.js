import axios from "axios";

export class IotexGraphQL {
  fetchDelegateData() {
    return axios({
      url: "https://member.iotex.io/api-gateway/",
      method: "post",
      data: {
        query: `
              query {
                bpCandidates {
                    name
                    liveVotes
                    percent
                    blurb
                    id
                    rank
                    registeredName
                    logo
                    website
                    socialMedia
                    serverStatus
                    location
                    liveVotesDelta
                    productivity 
                    productivityBase
                  }
                }
              `
      },
      headers: {
        "x-iotex-client-id": "iotxplorer"
      }
    });
  }

  fetchIotxplorerData() {
    return axios({
      url: "https://member.iotex.io/api-gateway/",
      method: "post",
      data: {
        query: `
              query {
                bpCandidate (candidateProfileId: "5c736ba72d01e727d88b9dea") {
                    name
                    rank
                  }
                }
              `
      },
      headers: {
        "x-iotex-client-id": "iotxplorer"
      }
    });
  }

  fetchElectionStats() {
    return axios({
      url: "https://member.iotex.io/api-gateway/",
      method: "post",
      data: {
        query: `
              query {
                stats {
                    totalVotedStakes
                    totalVotes
                    totalCandidates
                    nextEpoch
                  }
                }
              `
      },
      headers: {
        "x-iotex-client-id": "iotxplorer"
      }
    });
  }

  fetchbpCandidatesOnContract() {
    return axios({
      url: "https://member.iotex.io/api-gateway/",
      method: "post",
      data: {
        query: `
              query {
                bpCandidatesOnContract {
                  name
                  ioOperatorAddr
                  }
                }
              `
      },
      headers: {
        "x-iotex-client-id": "iotxplorer"
      }
    });
  }

  fetchProductivity(name, startEpoch) {
    return axios({
      url: "https://iotex-analytics.herokuapp.com/query",
      method: "post",
      data: {
        query: `
                  query {
                  delegate (startEpoch: ${startEpoch} epochCount:24 delegateName: "${name}") {
                      productivity {
                          production
                          expectedProduction
                          }
                      reward {
                        blockReward
                        epochReward
                        foundationBonus
                        }    
                     }
                  }
                  `
      }
    });
  }

  fetchBuckets(name) {
    return axios({
      url: "https://member.iotex.io/api-gateway/",
      method: "post",
      data: {
        query: `
                  query {
                  buckets(name: "${name}" offset:0 limit:1000) {
                    voter
                    votes
                    weightedVotes
                    remainingDuration
                      }
                  }
                  `
      },
      headers: {
        "x-iotex-client-id": "iotxplorer"
      }
    });
  }
}
