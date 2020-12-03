//Popup.js:
//This file will be called by popup.html. This file processes the 
//user entered login credentials once the login button is clicked.

//check auth
chrome.runtime.sendMessage({command: "checkAuth"}, (response)=>{
    console.log(response.status);
    
    if(response.status == 'success'){
        document.querySelector('.loggedInArea').style.display='block';
    }else{
        document.querySelector('.loginArea').style.display='block';
    }
    
});

document.querySelector('.login-btn-auth').addEventListener('click',function(){
    loginFunc();
});
document.querySelector('.logout-btn-auth').addEventListener('click',function(){
    logoutFunc();
});


var loginFunc = function(){
    var e = document.querySelector('.loginArea input[type="email"]').value;
    var p = document.querySelector('.loginArea input[type="password"]').value;
    chrome.runtime.sendMessage({command:"loginUser", data:{e:e,p:p}}, (response)=>{
        console.log(response);
        document.querySelector('.loginArea').style.display='none';
        document.querySelector('.loggedInArea').style.display='none';
        if(response.status == 'success'){
            document.querySelector('.loggedInArea').style.display='block';
        }else{
            document.querySelector('.loginArea').style.display='block';
        }

    });
}

var logoutFunc = function(){
    document.querySelector('.loginArea').style.display='block';
    document.querySelector('.loggedInArea').style.display='none';
    chrome.runtime.sendMessage({command: "logoutAuth"}, (response) => {
        console.log(response);
    }); 
}

/*
document.querySelector('button').addEventListener('click',function(){
    //Login button listener:
    //This will listen for the login button click, 
    //package the user’s credential data, and send 
    //it to the background.js file using chrome.tabs.sendMessage.
},false); 
*/