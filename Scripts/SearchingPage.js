const mainPageTag = document.getElementById("main-page");
let searchedDatas = [];
let searchingWords = localStorage.getItem("searchingWords");
const baseURL = "http://139.180.134.207/DoAnMobile/Client/assets/images/";

async function handleVerticalJSON() {
  const reponse = await fetch("http://139.180.134.207:3000/book/all");
  const results = await reponse.json();
  return results;
}
console.log(searchingWords);
const results = handleVerticalJSON();
results.then((data) => {
  for (let i = 0; i <= data.length - 1; i++)
    if (data[i].name.includes(searchingWords)) searchedDatas.push(data[i]);
  for (let i = 0; i <= searchedDatas.length - 1; i++) {
    const bigDivElements = document.createElement("div");
    mainPageTag.appendChild(bigDivElements);

    const bookImgElements = document.createElement("img");
    bookImgElements.src = baseURL + searchedDatas[i].image;
    bigDivElements.appendChild(bookImgElements);

    const nameElements = document.createElement("p");
    nameElements.textContent = searchedDatas[i].name;
    bigDivElements.appendChild(nameElements);

    const priceElements = document.createElement("p");
    priceElements.textContent = searchedDatas[i].cost + " VNĐ";
    bigDivElements.appendChild(priceElements);

    const startTags = document.createElement("h4");
    startTags.innerHTML = `<i class="fa-solid fa-star"></i
    ><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>`;
    bigDivElements.appendChild(startTags);
  }
});
