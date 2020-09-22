// Your web app's Firebase configuration
console.log("auth check")
var firebaseConfig = {
  apiKey: "AIzaSyD9dOZhcsCMCZoXscAdeCOkWF84iWZXwAI",
  authDomain: "adopt-me-3d1c1.firebaseapp.com",
  databaseURL: "https://adopt-me-3d1c1.firebaseio.com",
  projectId: "adopt-me-3d1c1",
  storageBucket: "adopt-me-3d1c1.appspot.com",
  messagingSenderId: "820650895820",
  appId: "1:820650895820:web:9694cfae3c3418b84e1569"
};
// Initialize Firebase
if(!firebase.apps.length){
  
  firebase.initializeApp(firebaseConfig);
  var dbRef = firebase.database().ref().child('places').child('features');
  var auth = firebase.auth();
  
}







auth.onAuthStateChanged(user => {
  if (user){
    console.log('user logged in: ',user);
    setupUI(user);
    //location.replace("./app.html")
    
  }
  else{
    console.log('user not logged in: ');
    setupUI();
  }
})

//logout
try{
  const logout=document.querySelector('#logout');//Navbar logout ID
  logout.addEventListener('click',(e)=>{
    e.preventDefault();
    location.replace("./app.html")
    auth.signOut();
  });
  
  
}
catch(err){
  //console.log(err.message)
}

// login
try{
  const loginForm = document.querySelector('#login-form');
  loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // get user info
  const email = document.querySelector('#user').value;
  const password = document.querySelector('#pass').value;
  console.log(email)

    // log the user in
    auth.signInWithEmailAndPassword(email, password).then((cred) => {
      console.log(cred.user);
      location.replace("./app.html")
      // close the signup modal & reset form
      
      loginForm.reset();
    });

  });


}
catch(err){
  //console.log(err.message)
}



