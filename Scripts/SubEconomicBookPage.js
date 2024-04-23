const boughtBooksQuanlity = document.getElementById("bought-book-quanlity");
const economicFiguresTag = document.getElementById("economicFigures");

const ulTag = document.getElementById("Navigation");
const headlineTag = document.getElementById("headline");
const baseURL = "http://139.180.134.207/DoAn/Client/assets/images/";

let dataSets = [];
let economic = [];

boughtBooksQuanlity.textContent = 0;
const liElement = document.createElement("li");
if (JSON.parse(localStorage.getItem("headline")) === 0)
  liElement.textContent = "Nhân vật kinh tế";
else liElement.textContent = "Làm giàu-Bán hàng";
liElement.style.width = "140px";
ulTag.appendChild(liElement);
headlineTag.textContent = liElement.textContent;

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
      if (JSON.parse(localStorage.getItem("headline")) === 0) {
        if (genre.includes("Lãnh Đạo") || genre.includes("Nhân Vật"))
          economic.push(dataSet);
      } else {
        if (genre.includes("Làm Giàu") || genre.includes("Bán Hàng"))
          economic.push(dataSet);
      }
    });
  });

  economic.map((data) => {
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
});
