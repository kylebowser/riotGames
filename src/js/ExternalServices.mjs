const baseURL = import.meta.env.VITE_SERVER_URL;

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ExternalServices {
  constructor() {}
  async getId(name) {
    const res = await fetch(`/api/player/${name}/NA1`);

    // console.log("Response from API:", res);
    // const data = await convertToJson(res);
    return res.json();
  }

  async getRank(puuid) {
    console.log("Fetching rank for PUUID:", puuid); // Debugging log
    const res = await fetch(`/api/player/rank/${puuid}`);
    return res.json();
  }

  async getMatchList(puuid) {
    console.log("Fetching match list for PUUID:", puuid); // Debugging log
    const res = await fetch(`/api/player/match/${puuid}`);
    return res.json();
  }

  async getMatchDetails(matchId) {
    console.log("Fetching match details for Match ID:", matchId); // Debugging log
    const res = await fetch(`/api/match/${matchId}`);
    return res.json();
  }
}
