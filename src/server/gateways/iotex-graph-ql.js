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
                    id
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
      }
    });
  }
}
