// for the settings menu
function dropmenufunction() {
  document.getElementById("dropmenu").classList.toggle("show");
}
// The firebase config key
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
// Just for testing. If I can detect the login configurations of the user after they
// were redirected from the login page.
firebase.auth().onAuthStateChanged(firebaseUser =>{
  if(firebaseUser){
      console.log(firebaseUser);
  }});
console.log(firebase)

// to log out the user from the firebase. 
function Logout(){
  firebase.auth().signOut();
  console.log("We out!");
  console.log(firebase);
  window.close();
}


//add Update
btnUpdate.addEventListener('click', e=>{
    const URL = document.getElementById("weburl_text").value;
    var user = firebase.auth().currentUser;
    if(URL == ""){
      alert("Invalid URL");
      return;
    }
  //update
  user.updateProfile({
      // we save the links to be monitored on the user's profile 
      // under the photo url.
      photoURL: URL
    }).then(function() {
      // Update successful.
      console.log("update Success")
    }).catch(function(error) {
      // An error happened.
      console.log("Error in update")
    });
});

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}
