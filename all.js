// 按鈕
const signupBtn = document.querySelector(".signup_btn")

// 輸入欄位
const signupEmail = document.querySelector("#signup_email")
const signupName = document.querySelector("#signup_name")
const signupPassword = document.querySelector("#signup_password")
const signupPassword2 = document.querySelector("#ignin_password_2")

// 存放輸入資訊
const signupInfo = {};

// 錯誤訊息
const signupEmailErr= document.querySelector(".signup_email_err")
const signupNameErr = document.querySelector(".signup_name_err")
const signupPswErr = document.querySelector(".signup_psw_err")
const signupPsw2Err = document.querySelector(".signup_psw2_err")

// API
const apiURL = "https://todoo.5xcamp.us"
let token = "" ; 
let nickname = "";


// 點擊註冊
signupBtn.addEventListener("click",function(e){
    e.preventDefault();
    signupInfo.email = signupEmail.value;
    signupInfo.name =  signupName.value;
    signupInfo.psw = signupPassword.value;
    signupInfo.psw2 = signupPassword2.value;
    signupCheck();
    if(signupCheck() === true){
        signup()
    }
})

// 檢查註冊內容
function signupCheck(){
    // 初始化
    signupEmailErr.textContent = "";
    signupNameErr.textContent = "";
    signupPswErr.textContent = "";
    signupPsw2Err.textContent = "";


    // error check
    if(signupInfo.email ===""){
        signupEmailErr.textContent = "此欄不可為空"
        return false;
    }else if(signupInfo.name ===""){
        signupNameErr.textContent = "此欄不可為空"
        return false;
    }else if(signupInfo.psw ===""){
        signupPswErr.textContent = "此欄不可為空"
        return false;
    }else if(signupInfo.psw2 ===""){
        signupPsw2Err.textContent = "此欄不可為空"
        return false;
    }else if(signupInfo.psw2 !== signupInfo.psw){
        signupPsw2Err.textContent = "兩次輸入密碼不相同"
        return false;
    }else{
        return true;
    }
}

// 傳送註冊API
function signup() {
    axios.post(`${apiURL}/users`, {
        "user": {
            "email": signupInfo.email,
            "nickname": signupInfo.name,
            "password": signupInfo.psw
          }
    })

    // 取得token與nickname
    .then(res =>{
        token = res.headers.authorization
        nickname = res.data.nickname
    })

    // 清除input
    .then(res => {
        clearInput(signupEmail)
        clearInput(signupName)
        clearInput(signupPassword)
        clearInput(signupPassword2)
    })

    // 彈跳成功視窗
    .then(res=>{
        let timerInterval;
        Swal.fire({
        title: "註冊成功",
        icon:"success",
        html: "正在創建帳號中...",
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading();
            const timer = Swal.getPopup().querySelector("b");
            timerInterval = setInterval(() => {
            }, 100);
        },
        willClose: () => {
            clearInterval(timerInterval);
        }
        }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
            console.log("I was closed by the timer");
        }
        });
    })

    // 跳轉頁面
    .then(res=>{
        switchPage()
    })

    // 彈跳失敗視窗
    .catch(error => {
        Swal.fire({
            title: "註冊失敗",
            text: error.response.data.error,
            icon: "error"
          })
        })
}

// 清除input內容
function clearInput(inputname){
    inputname.value = "";
}

