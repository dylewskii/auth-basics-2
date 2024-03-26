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

    try {
      const response = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
        }),
      });

      if (response.ok) {
      } else {
        const { error } = await response.json();
        throw new Error(error?.message[0]);
      }
    } catch (error) {
      errMsgDiv.innerText = `Failed to register user: ${
        error.message ? error.message : "Unknown error occured"
      }`;
    }
  });
