const mainPageTag = document.getElementById("main-page");
const searchingInputTag = document.getElementById("search");
const searchingBtnTag = document.getElementById("search-btn");
const boughtBooksQuanlityTag = document.getElementById("bought-book-quanlity");
const cartNavigationTag = document.getElementById("cart-navigation");
const popUpTag = document.getElementById("pop-up");
const clickedBookTags = document.getElementsByClassName("clicked-book");

let inputValue;
let state = false;
searchingInputTag.oninput = function () {
  inputValue = searchingInputTag.value;
  localStorage.setItem("searchingWords", inputValue);
};
let addedBooks = JSON.parse(localStorage.getItem("addedBooks"));
let boughtBooksQuanlity = JSON.parse(
  localStorage.getItem("boughtBooksQuanlity")
);
if (boughtBooksQuanlity === null && addedBooks === null) {
  boughtBooksQuanlityTag.textContent = 0;
} else if (boughtBooksQuanlity !== 0) {
  boughtBooksQuanlityTag.textContent = boughtBooksQuanlity;
} else if (boughtBooksQuanlity === 0 && addedBooks !== 0)
  boughtBooksQuanlityTag.textContent = addedBooks;

let searchedDatas = [];
let searchingWords = localStorage.getItem("searchingWords");
const baseURL = "http://139.180.134.207/DoAn/Client/assets/images/";

async function handleVerticalJSON() {
  const reponse = await fetch("http://139.180.134.207:3000/book/all");
  const results = await reponse.json();
  return results;
}
const results = handleVerticalJSON();
results.then((data) => {
  if (data) popUpTag.style.display = "none";
  for (let i = 0; i <= data.length - 1; i++)
    if (data[i].name.includes(searchingWords)) searchedDatas.push(data[i]);
  if (searchedDatas.length >= 1) {
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
      priceElements.textContent =
        searchedDatas[i].cost.toLocaleString("en-US") + " VNĐ";
      bigDivElements.appendChild(priceElements);

      const buttonElements = document.createElement("button");
      buttonElements.textContent = "Chi tiết sản phẩm";
      bigDivElements.appendChild(buttonElements);
      bigDivElements.classList.add("clicked-book");
      bigDivElements.addEventListener("click", function () {
        localStorage.setItem("book", JSON.stringify(searchedDatas[i]));
        window.location = "../Pages/Item.html";
      });

      const startTags = document.createElement("h4");
      startTags.innerHTML = `<i class="fa-solid fa-star"></i
            ><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>`;
      bigDivElements.appendChild(startTags);
    }
  } else {
    const informingPElements = document.createElement("p");
    informingPElements.textContent = "Không tìm thấy quyển sách bạn muốn";
    mainPageTag.style.display = "block";
    mainPageTag.appendChild(informingPElements);
  }
});
cartNavigationTag.onclick = function () {
  window.location = "../Pages/Cart.html";
};

const token = localStorage.getItem("token");
const usernameTag = document.getElementById("loginhead");
const registerTag = document.getElementById("regishead");

if (token) {
  usernameTag.textContent = localStorage.getItem("username");
  registerTag.innerHTML = `Đăng xuất 
  <i class="fa-solid fa-right-from-bracket"></i>
  `;
}