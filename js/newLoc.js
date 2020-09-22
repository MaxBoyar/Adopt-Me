//////////////////////////////#conditional menu
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
    console.log('no setup ui')
    loggedIn.forEach(item=> item.style.display="none");
    loggedOut.forEach(item=> item.style.display="block");

}
}