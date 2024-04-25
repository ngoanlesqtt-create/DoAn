const boughtBooksQuanlity = document.getElementById("bought-book-quanlity");
const economicFiguresTag = document.getElementById("economicFigures");
const economicSellingTag = document.getElementById("economicSelling");
const headlineTags = document.getElementsByClassName("headline");
const baseURL = "http://139.180.134.207/DoAn/Client/assets/images/";
let dataSets = [];
let economicFigures = [];
let economicSelling = [];
boughtBooksQuanlity.textContent = 0;
async function handleApi() {
  const response = await fetch("http://139.180.134.207:3000/book/all");
  const results = await response.json();
  return results;
}
const results = handleApi();
results.then((datas) => {
  datas.map((data) => {
    data.genres.map((genre) => {
      if (genre.includes("Kinh Tế")) dataSets.push(data);
    });
  });
  dataSets.map((dataSet) => {
    dataSet.genres.map((genre) => {
      if (genre.includes("Lãnh Đạo") || genre.includes("Nhân Vật"))
        economicFigures.push(dataSet);
    });
  });
  dataSets.map((dataSet) => {
    dataSet.genres.map((genre) => {
      if (genre.includes("Làm Giàu") || genre.includes("Bán Hàng"))
        economicSelling.push(dataSet);
    });
  });
  economicFigures.map((data) => {
    const divElements = document.createElement("div");
    economicFiguresTag.appendChild(divElements);

    const imgElements = document.createElement("img");
    imgElements.src = baseURL + data.image;
    divElements.appendChild(imgElements);

    const nameElements = document.createElement("p");
    nameElements.textContent = data.name;
    divElements.appendChild(nameElements);

    const priceElements = document.createElement("p");
    priceElements.textContent = data.cost + " VNĐ";
    divElements.appendChild(priceElements);
  });
  economicSelling.map((data) => {
    const divElements = document.createElement("div");
    economicSellingTag.appendChild(divElements);

    const imgElements = document.createElement("img");
    imgElements.src = baseURL + data.image;
    imgElements.setAttribute("alt", data.name);
    divElements.appendChild(imgElements);

    const nameElements = document.createElement("p");
    nameElements.textContent = data.name;
    divElements.appendChild(nameElements);

    const priceElements = document.createElement("p");
    priceElements.textContent = data.cost + " VNĐ";
    divElements.appendChild(priceElements);
  });
});
for (let i = 0; i <= headlineTags.length - 1; i++)
  headlineTags[i].addEventListener("click", function () {
    localStorage.setItem("headline", i);
    window.location = "../Pages/SubEconomicBookPage.html";
  });

const token = localStorage.getItem("token");
const usernameTag = document.getElementById("loginhead");
const registerTag = document.getElementById("regishead");

if (token) {
  usernameTag.textContent = localStorage.getItem("username");
  registerTag.innerHTML = `Đăng xuất 
  <i class="fa-solid fa-right-from-bracket"></i>
  `;
}