//background.js
//This file will monitor URL changes. It also connects with the 
//firebase database to receive and format user information, more 
//specifically, their login credentials and flagged websites visited.
//(Flagged websites are websites specified to be monitored by the parents).
(function(){
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
console.log(firebase);

chrome.tabs.onActivated.addListener(function(activeInfo) {
   // how to fetch tab url using activeInfo.tabid
   chrome.tabs.get(activeInfo.tabId, function(tab){
      console.log("here");
      console.log(tab.url);
      var user = firebase.auth().currentUser;
      var url = " ";
      console.log("We in!");
      if(user) {
         //user signed in got the url and we check!
         url = user.photoURL;;
         console.log(url);
         console.log("here");
         if(tab.url == url){
            console.log("caught u!")
            var today = new Date();
            var dd = today.getDate();

            var mm = today.getMonth()+1; 
            var yyyy = today.getFullYear();
            var hh = today.getHours();
            var min = today.getMinutes();
            if(dd<10) 
            {
               dd='0'+dd;
            } 

            if(mm<10) 
            {
               mm='0'+mm;
            } 
            if(hh<10)
            {
               hh = '0'+hh;
            }if(min < 10)
            {
               min = '0'+min;
            }
            today = mm+'-'+dd+'-'+yyyy+' '+hh+':'+min;
            console.log(today);
            writeNewPost(user.uid, user.email, user.photoURL, today);
         }
      }else{
         //No user signed in
         console.log("we out!"); 
      }
   });
 });

 chrome.runtime.onMessage.addListener((msg, sender, response)=>{
   console.log(msg.command);

   if(msg.command == 'logoutAuth'){
      firebase.auth().signOut().then(function(){
         //Sign out successfull
         
         response({type: "un-auth", status: "success", message: true});
      }, function(error){
         //An error ocurred
         response({type:"un-auth", status: "false", message: error});
      });  
   }

   if(msg.command == 'checkAuth'){
      var user = firebase.auth().currentUser;
      console.log(user);
      if(user) {
         //user signed in
         response({type: "auth", status: "success", message: user});
      }else{
         //No user signed in
         
         response({type: "auth", status: "no-auth", message: false});
      }
   }
   if(msg.command == 'loginUser'){
      console.log(msg.data);
      var email = msg.data.e;
      var pass = msg.data.p;

      firebase.auth().signInWithEmailAndPassword(email, pass).catch(function(error){
         //Handle errors here
         var errorCode = error.code;
         var errorMessage = error.message;
         console.log(error);
         
         response({type: "auth", status: "error", message: error});
      });
      firebase.auth().onAuthStateChanged(function(user){
         if(user){
            //signed in 
            console.log(user);
            
            
            response({type: "auth", status: "success", message: user});
         } else {
            //No user signed in (handled this condition in the firebase auth catch excpetion)
            
            response({type: "auth", status: "error", message: false});
         }
      });
   }
});

function writeNewPost(uid, email, url, timestap) {
   // A post entry.
   var postData = {
     email: email,
     uid: uid,
     url: url,
     time: timestap,
   };
 
   // Get a key for a new Post.
   var newPostKey = firebase.database().ref().child('posts').push().key;
 
   // Write the new post's data simultaneously in the posts list and the user's post list.
   var updates = {};
   updates['/posts/' + newPostKey] = postData;
   updates['/user-posts/' + uid + '/' + newPostKey] = postData;
 
   return firebase.database().ref().update(updates);
 }

}());