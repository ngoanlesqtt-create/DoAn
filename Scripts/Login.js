const boughtBookQuanlity = document.getElementById("bought-book-quanlity");

boughtBookQuanlity.textContent = 0;
function eyetoggle() {
  var passbar = document.getElementById("ePassword");
  var eye = document.getElementById("eye");

  if (passbar.type === "password") {
    passbar.type = "text";
    eye.className = "fa-solid fa-eye-slash";
  } else {
    passbar.type = "password";
    eye.className = "fa-solid fa-eye";
  }
}

const loginU = async (email, password) => {
  try {
    const response = await fetch("http://139.180.134.207:3000/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (response.status === 200) {
      localStorage.setItem("token", 1);
      localStorage.setItem("username", data.user.name);
      window.location = "../index.html";
    } else {
      alert("Đăng nhập thất bại!");
    }
  } catch (error) {
    console.error("Error handling registration: ", error);
    alert("Error", error.response.data);
  }
};

function loginUser() {
  const loginEmail = document.getElementById("uemailId").value;
  const loginPass = document.getElementById("ePassword").value;

  loginU(loginEmail, loginPass);
}

const submitBtn = document.getElementById("formId");
submitBtn.addEventListener("submit", function (event) {
  event.preventDefault();
  loginUser();
});