import request from "./accountService.js";
//create object request để callAPI
let callApi = new request();
let getEle = function(value) {
    return document.getElementById(value);
};

// handle event submit
getEle("form-login").addEventListener("submit", function(event) {
    localStorage.clear();
    event.preventDefault(); // để ko load lại trang
    const email = getEle("email-login").value;
    const Password = getEle("password-login").value;
    console.log("password", Password);
    callApi
        .login({ email, Password })
        .then((res) => {
            console.log(res.data);
            if (res.data.success) {
                if (
                    res.data.data.idRole === "admin" ||
                    res.data.data.idRole === "owner"
                ) {
                    localStorage.setItem("token", res.data.data.token);
                    localStorage.setItem("user", JSON.stringify(res.data.data));
                    Swal.fire({
                        timer: 4000,
                        icon: "success",
                        title: "Đăng nhập thành công!!!",
                        showConfirmButton: false,
                    });
                    setTimeout(() => {
                        window.location.href = "/admin_view/views/admin/admin-start.html";
                    }, 2500);
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Bạn không phải quản trị viên",
                        footer: "<a href>Why do I have this issue?</a>",
                    });
                }
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Bạn không phải quản trị viên",
                    footer: "<a href>Why do I have this issue?</a>",
                });
            }
        })
        .catch((e) => {
            Swal.fire({
                icon: "error",
                title: "Đăng nhập không thành công",
            });
        });
});