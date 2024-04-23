const boughtBookQuanlity = document.getElementById("bought-book-quanlity");

boughtBookQuanlity.textContent = 0;
const registerUser = async (name, email, password) => {
  try {
    const response = await fetch("http://139.180.134.207:3000/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    if (response.status === 200) {
      alert("Thành công", "Tạo tài khoản thành công.");
      window.location = "Login.html";
    } else {
      alert("Email bị trùng, vui lòng nhập lại");
    }
  } catch (error) {
    console.error("Error handling registration: ", error);
    alert("Error", error.response.data);
  }
};

function validateForm() {
  const name = document.getElementById("uName").value;
  const email = document.getElementById("uEmail").value;
  const password = document.getElementById("uPassword").value;
  if (name === "") {
    alert("Bạn chưa nhập UserName");
    return;
  }

  if (email === "") {
    alert("Bạn chưa nhập Email");
    return;
  }

  if (password === "") {
    alert("Bạn chưa nhập mật khẩu");
    return;
  }

  registerUser(name, email, password);
}

const submitBtn = document.getElementById("formId");
submitBtn.addEventListener("submit", function (event) {
  event.preventDefault();
  validateForm();
});
