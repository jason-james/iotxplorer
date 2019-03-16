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
                    rank
                    id
                  }
                }
              `
      }
    });
  }
}
