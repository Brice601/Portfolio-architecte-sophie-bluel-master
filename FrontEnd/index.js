const authToken = localStorage.getItem("token");

if (authToken) {

}else {
    window.location.href = ".login.html";
}