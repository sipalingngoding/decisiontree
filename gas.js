const axios = require("axios")

function MatchDampakGempa(dirasakan) {
  let result = ""
  if (dirasakan.match("I") || dirasakan.match("II")) {
    result = "Not Felt"
  }
  if (dirasakan.match("III") || dirasakan.match("IV") || dirasakan.match("V")) {
    result = "Felt"
  }
  if (dirasakan.match("VI")) {
    result = "Slight Damage"
  }
  if (dirasakan.match("VII") || dirasakan.match("VIII")) {
    result = "Moderate Damage"
  }
  if (dirasakan.match("IX") || dirasakan.match("X") || dirasakan.match("XI") || dirasakan.match("XII")) {
    result = "Heavy Damage"
  }
  return result
}

axios.get("https://data.bmkg.go.id/DataMKG/TEWS/gempadirasakan.json")
  .then(({ data }) => {
    let dataGempa = data.Infogempa.gempa
    dataGempa.map((d) => {
      console.log(MatchDampakGempa(d.Dirasakan));
      console.log("-------");
    })
  })

