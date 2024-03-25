window.onload = () => {
  if (!sessionStorage.getItem("isAuthenticated")) {
    alert("Access Denied");
    window.location.href = "index.html";
  }
};
