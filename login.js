const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

// Your web app's Firebase configuration
var firebaseConfig = {
        apiKey: "AIzaSyCbI8uEoiGR8X9TuvjU2nFZz8Fjl07kt18",
        authDomain: "screenaware.firebaseapp.com",
        databaseURL: "https://screenaware.firebaseio.com",
        projectId: "screenaware",
        storageBucket: "screenaware.appspot.com",
        messagingSenderId: "48486854475",
	    appId: "1:48486854475:web:10ab88fae6f3d78e11c2ce"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//Add login button listener 
btnLogin.addEventListener('click', e=>{
	const email = document.getElementById('email_login').value;
	const pass = document.getElementById('pass_login').value;
	const auth = firebase.auth()
	//Sign In
	const promise = auth.signInWithEmailAndPassword(email, pass);
	var user = auth.currentUser;
	if(user){
		window.open("dashboard.html",'_blank');
	}
	promise.catch(e=>console.log(e.message));
	console.log(firebase);
});
//add sign in button listener 
btnsignUp.addEventListener('click', e=>{
	const email = document.getElementById('email_sign').value;
	const pass = document.getElementById('pass_sign').value;
	const auth = firebase.auth();
	//Create User
	const promise = auth.createUserWithEmailAndPassword(email, pass);
	var user = auth.currentUser;
	if(user){
		window.open("dashboard.html",'_blank');
	}
	promise.catch(e=>console.log(e.message));
	console.log(firebase);
});
