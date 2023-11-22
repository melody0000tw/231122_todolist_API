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

// check signup input Error
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