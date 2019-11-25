var firebaseConfig = {
    apiKey: "AIzaSyBDSksPKqYIvv3VZdN-3Gp6eYlGK19MY9M",
    authDomain: "chingu-budget.firebaseapp.com",
    databaseURL: "https://chingu-budget.firebaseio.com",
    projectId: "chingu-budget",
    storageBucket: "chingu-budget.appspot.com",
    messagingSenderId: "366448320990",
    appId: "1:366448320990:web:88ddcdbfa46cbdb99b3d4f",
    measurementId: "G-N37DBYNFJZ"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
 // firebase.analytics();


let provider = new firebase.auth.GoogleAuthProvider();


  function signin(){
    firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
  }


  firebase.auth().onAuthStateChanged(firebaseUser =>{
		
    if(firebaseUser){
        window.location = "main.html";
    }
    else{
        console.log("Firebase User is not logged in");
    }
    
});