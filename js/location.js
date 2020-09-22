 //////////////////////////////////Adding Map///////////////
 mymap = L.map('mapid').setView([31.771959, 35.217018], 8); //, { dragging: !L.Browser.mobile }
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                   attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributor', 
                   
                   //other attributes.
}).addTo(mymap);
var marker;
var circle;

var pawMarker = L.icon({
    iconUrl: 'img/maps-and-location.svg',

    iconSize:     [28, 30], // size of the icon [32, 34]
    
    iconAnchor:   [16, 37], // point of the icon which will correspond to marker's location
    
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

var address
var city
var facebook
var hours
var logo
var name
var phone
var waze
var web
var lat
var lng
var x=lat   
var y=lng


function test(){
    var accept=confirm("האם הזנת נתונים נכון??");
    if (accept==true){
        if (marker != null){
            mymap.removeLayer(marker)
        }
        lat=document.getElementById('LatData').value
        lng=document.getElementById('LngData').value
        address=document.getElementById('AddData').value
        city=document.getElementById('CitData').value
        facebook=document.getElementById('FbData').value
        hours=document.getElementById('HouData').value
        logo=document.getElementById('LogData').value
        name=document.getElementById('NamData').value
        phone=document.getElementById('PhoData').value
        waze=document.getElementById('WazData').value
        web=document.getElementById('WebData').value
        x=lat   
        y=lng
        var str=`<h4>${name}</h4><hr>`;
        str+=`<div class="compImage"><img src="${logo}" alt="" width="100" height="100"></div>`
        str+="<h5 style=text-align:center>"+city+"</h5>"
        str+="<h5 style=text-align:center>"+address+"</h5>"
        str+="<h5 style=text-align:center>"+"שעות: "+hours+"</h5>"
        str+="<h5 style=text-align:center>"+phone+"</h5>"
        str+=`<div class="compIcons">
        <a href="${waze}" target="_blank" class="compIcon" ><img src="img/waze.svg" alt="" width="40" height="40"></a>
        <a href="${facebook}" target="_blank" class="compIcon" ><img src="img/facebook.svg" alt="" width="40" height="40"></a>
        <a href="${web}" target="_blank" class="compIcon" ><img src="img/www.svg" alt="" width="40" height="40"></a>
        <button style="border:none;" onclick="checkValueNotEmpty()" class="compIcon" ><img src="img/route.svg" alt="" width="40" height="40"></a></button>
        </div>`
        marker= L.marker([x,y],{icon:pawMarker}).bindPopup(str).addTo(mymap);//lats is function that getting coordinates
    }
    else{
        return
    }
    
    
}
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
  

function Push(){
    var accept=confirm(" שים לב אם תלחץ אוקיי אז הנתונים ישלחו לדאטה בייס, האם אתה בטוח שהזנת ובדקת את כל הנתונים לפני? ,אם לא תלחץ על ביטול ");
    if (accept ==true){
        dbRef.push({
            geometry:{
            coordinates:{
                1:x,
                0:y
            }
            },
            properties:{
            Address:address,
            City:city,
            FbURL:facebook,
            Hours:hours,
            Logo:logo,
            Name:name,
            Phone:phone,
            Waze:waze,
            WebURL:web
    
            }
        });
    }
    else{
        return
    }
    
   
}