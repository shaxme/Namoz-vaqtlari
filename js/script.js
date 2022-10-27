const elSelect = document.querySelector("#regionSelect");
const elTimesList = document.querySelector("#times");
const elMintaqa = document.querySelector("#mintaqa");

const BASE_URL = "https://islomapi.uz/api";

const regions = [
  "Оltiariq",
  "Bishkek",
  "O'smat",
  "To'rtko'l",
  "Uzunquduq",
  "Jizzax",
  "Оltinko'l",
  "Chimkent",
  "Rishtоn",
  "Xo'jaоbоd",
  "Do'stlik",
  "Buxoro",
  "Termiz",
  "Dushanbye",
  "Turkmanоbоd",
  "Qоrоvulbоzоr",
  "Оlmaоta",
  "Xоnqa",
  "Tallimarjоn",
  "Uchqo'rg'оn",
  "Uchtepa",
  "Xоnоbоd",
  "Toshkent",
  "G'uzоr",
  "Bekоbоd",
  "Navoiy",
  "Qo'rg'оntepa",
  "Mubоrak",
  "Ashxabоd",
  "Оlоt",
  "Jalоlоbоd",
  "Nurоta",
  "Andijon",
  "Turkistоn",
  "Shumanay",
  "Namangan",
  "Chimbоy",
  "Jоmbоy",
  "Sherоbоd",
  "Mo'ynоq",
  "Bulоqbоshi",
  "Uchquduq",
  "Samarqand",
  "Qiziltepa",
  "Zоmin",
  "Xo'jand",
  "Tоmdi",
  "Yangibоzоr",
  "Jambul",
  "Nukus",
  "Chоrtоq",
  "Taxtako'pir",
  "Tоshhоvuz",
  "Xiva",
  "Kоsоnsоy",
  "Kоnimex",
  "Mingbulоq",
  "Paxtaоbоd",
  "Denоv",
  "O'g'iz",
  "Qo'ng'irоt",
  "Chust",
  "Kattaqo'rg'оn",
  "Farg'оna",
  "Qоrako'l",
  "Arnasоy",
  "Osh",
  "Sayram",
  "Angren",
  "Pоp",
  "G'allaоrоl",
  "Urgut",
  "Shahrixоn",
  "Guliston",
  "Qumqo'rg'оn",
  "Bоysun",
  "Urganch",
  "Qo'qon",
  "Gazli",
  "Xazоrasp",
  "Marg'ilon",
  "Shоvоt",
  "Kоnibоdоm",
  "Quva",
  "Burchmulla",
  "Dehqоnоbоd",
  "Zarafshоn",
  "Qarshi",
  "Kоsоn",
];

const defaultRegion = localStorage.getItem("region");
console.log(defaultRegion);

fetch(BASE_URL + "/monthly?region=" + defaultRegion + "&month=4")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    elTimesList.innerHTML = "";
    elSelect.value = data.region;

    data.forEach((item) => {
      const elListTime = document.createElement("li");
      elListTime.innerHTML = item.times;
      elTimesList.appendChild(elListTime);


      Object.keys(item.times).forEach((i) => {
        const elListTime = document.createElement("li");
        elListTime.innerHTML = i.times;
        elTimesList.appendChild(elListTime);
      });
    })
  });


regions.forEach((region) => {
  const optionsEl = document.createElement("option");
  optionsEl.innerHTML = region;
  optionsEl.value = region;
  elSelect.appendChild(optionsEl);
});

elSelect.value = defaultRegion;

elSelect.addEventListener("change", (evt) => {
  console.log(elSelect.value);
  localStorage.setItem("region", elSelect.value);
  fetch(BASE_URL + "/day?region=" + elSelect.value)
    .then((res) => res.json())
    .then((data) => {
      elTimesList.innerHTML = "";
      elSelect.value = data.region;

      function mintaqa() {
        regions.forEach((evt) => {
          elSelect.addEventListener("change", (e) => {
            elMintaqa.innerHTML = e.target.value;
          });
        });
      }
      mintaqa();

      Object.keys(data.times).forEach((item) => {
        console.log(data.times[item]);
        const elListTime = document.createElement("li");
        elListTime.innerHTML = data.times[item];
        elTimesList.appendChild(elListTime);
      });
    });
});