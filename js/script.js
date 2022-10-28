const elSelect = document.querySelector("#regionSelect");
const elTimesList = document.querySelector("#times");
const elMintaqa = document.querySelector("#mintaqa");
const elHudud = document.querySelector('#hudud');


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

const defaultRegion = localStorage.getItem("region")
  ? localStorage.getItem("region")
  : regions[0];
console.log(defaultRegion);

fetch(BASE_URL + "/monthly?region=" + defaultRegion + "&month=10")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    elTimesList.innerHTML = "";

    data.forEach((item) => {
      const elListTimesItem = document.createElement("li");

      Object.keys(item.times).forEach((i) => {
        const elListTime = document.createElement("p");
        elListTime.innerHTML = `${i}: ${item.times[i]}`;
        elListTimesItem.appendChild(elListTime);
      });
      elListTimesItem.style.border = "1px solid #444";
      elListTimesItem.style.borderRadius = "10px";
      elListTimesItem.style.margin = "10px";
      elListTimesItem.style.padding = "10px";
      elTimesList.appendChild(elListTimesItem);
    });
  });

async function renderDate() {
  const data = new Date();
  const monthNames = [
    "yanvar",
    "fevral",
    "mart",
    "aprel",
    "may",
    "iyun",
    "iyul",
    "avgust",
    "sentabr",
    "oktabr",
    "noyabr",
    "dekabr",
  ];

  const elData = document.querySelector('#data');
  const elTime = document.querySelector('#time');

  elData.innerHTML = `
    ${data.getDate()}-${monthNames[data.getMonth()]} ${data.getFullYear()}-yil`;setInterval(() => {
    const data = new Date();
    elTime.innerHTML = `${data.getHours()}:${data.getMinutes()}:${data.getSeconds()}`;
  }, 1000);
}
renderDate();

regions.forEach((region) => {
  const optionsEl = document.createElement("option");
  optionsEl.innerHTML = region;
  optionsEl.value = region;
  elSelect.appendChild(optionsEl);
});

elSelect.value = defaultRegion;
elHudud.innerHTML = `Mintaqa: ${defaultRegion}`;

elSelect.addEventListener("change", (evt) => {
  console.log(elSelect.value);
  
  elHudud.innerHTML = `Mintaqa: ${evt.target.value}`;
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
