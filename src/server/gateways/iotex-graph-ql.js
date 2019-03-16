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
}
