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
}
