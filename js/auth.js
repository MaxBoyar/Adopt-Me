// Your web app's Firebase configuration

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

//////////////////////////////Conditional menu 
if (!loggedIn){
  var loggedIn=document.querySelectorAll('.logged-in');
  var loggedOut=document.querySelectorAll('.logged-out');  

}

const setupUI=(user) =>{
  if (user){
    console.log('setup ui')
    loggedIn.forEach(item=> item.style.display="block");
    loggedOut.forEach(item=> item.style.display="none");
  }
  else{
    
    loggedIn.forEach(item=> item.style.display="none");
    
    loggedOut.forEach(item=> item.style.display="block");
    

  }
}





//observer
auth.onAuthStateChanged(user => {
  if (user){
    
    setupUI(user);
    
    
  }
  else{
    
    setupUI();
  }
})

//logout
try{
  const logout=document.querySelector('#logout');//Navbar logout ID
  logout.addEventListener('click',(e)=>{
    e.preventDefault();
    setTimeout(() => {  location.replace("./app.html"); }, 2000);
    Swal.fire({
      title: 'התנתקת בהצלחה',
      
      icon: 'success',
      
    })
    auth.signOut();
  });
  
  
}
catch(err){

}

// login
try{
  const loginForm = document.querySelector('#login-form');
  loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // get user info
  const email = document.querySelector('#user').value;
  const password = document.querySelector('#pass').value;
  

    // log the user in
    auth.signInWithEmailAndPassword(email, password).then((cred) => {
      


      setTimeout(() => {  
        loginForm.reset();
        location.replace("./app.html") }, 2000);
      
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        
      })
      
      Toast.fire({
        icon: 'success',
        title: 'Signed in successfully'
      })
    }).catch(err=>{
      Swal.fire({
        title: '!שימו לב',
        text: 'שם משתמש או סיסמה לא נכונים',
        icon: 'error',
        confirmButtonText: 'אישור'
      })
    })

  });


}
catch(err){
  
}



