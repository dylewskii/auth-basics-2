document
  .getElementById("register-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const firstName = document.getElementById("first").value;
    const lastName = document.getElementById("last").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const errMsgDiv = document.getElementById("error-message");

    if (!firstName || !lastName || !email || !password) {
      errMsgDiv.innerText = "All fields are required";
      return;
    }
  });
