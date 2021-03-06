var changer=0
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





 
 
 //////////////////////////////////Adding Map///////////////
 mymap = L.map('mapid').setView([31.771959, 35.217018], 8); //, { dragging: !L.Browser.mobile }
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                   attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributor', 
                   
                   //other attributes.
}).addTo(mymap);
var marker;
var circle;



//////////////////Map cordinations visualization///////////
mymap.on('mousemove',function(e){
    var str="latitude:"+e.latlng.lat.toFixed(5) + " Longitude: "+e.latlng.lng.toFixed(5)+ " Zoom Level: "+mymap.getZoom();
   document.querySelector("#map_cords").innerHTML=str;
});

/////////////Adding markers SVG
var pawMarker = L.icon({
    iconUrl: 'img/maps-and-location.svg',

    iconSize:     [28, 30], // size of the icon [32, 34]
    
    iconAnchor:   [16, 37], // point of the icon which will correspond to marker's location
    
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

var mapLocation = L.icon({
  iconUrl: 'img/geo.svg',

  iconSize:     [40, 50], // size of the icon //32, 37
  
  iconAnchor:   [16, 37], // point of the icon which will correspond to marker's location
  
  popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});
///////////////////////////////




//  Adding GeoJson file to Map
// var geoJsonLayer= new L.GeoJSON.AJAX('data/attractions4.geojson',{pointToLayer:
//   function(feature,latlng) {
//     console.log(latlng)
//   var str=`<h4>${feature.properties.Name}</h4><hr>`;
//   str+=`<div class="compImage"><img src="${feature.properties.Logo}" alt="" width="100" height="100"></div>`
//   str+="<h5 style=text-align:center>"+feature.properties.City+"</h5>"
//   str+="<h5 style=text-align:center>"+feature.properties.Address+"</h5>"
//   str+="<h5 style=text-align:center>"+"שעות: "+feature.properties.Hours+"</h5>"
//   str+="<h5 style=text-align:center>"+feature.properties.Phone+"</h5>"
//   str+=`<div class="compIcons">
//   <a href="${feature.properties.Waze}" target="_blank" class="compIcon" ><img src="img/waze.svg" alt="" width="40" height="40"></a>
//   <a href="${feature.properties.FbURL}" target="_blank" class="compIcon" ><img src="img/facebook.svg" alt="" width="40" height="40"></a>
//   <a href="${feature.properties.WebURL}" target="_blank" class="compIcon" ><img src="img/www.svg" alt="" width="40" height="40"></a>
//   <button style="border:none;" onclick="checkValueNotEmpty()" class="compIcon" ><img src="img/route.svg" alt="" width="40" height="40"></a></button>
//   </div>`
//   return L.marker(latlng,{icon:pawMarker}).bindPopup(str).on('click', lats);
//   }
//  }).addTo(mymap);

///////////////////////////////////////////////////////////////Adding data markers from DB/////////////////////////////////////////

 function getData(){
  firebase.database().ref('places/features').once('value',function(snapshot){
    
    snapshot.forEach(function(childSnapshot)
    {
      var childData=childSnapshot.val();
      var cords=childData.geometry.coordinates
      var x=cords[1]     
      var y=cords[0]  
      
      
      
      var str=`<h4 id="popUpHead">${childData.properties.Name}</h4><hr>`;
      str+=`<div class="compImage"><img src="${childData.properties.Logo}" alt="" width="100" height="100"></div>`
      str+="<h5 class='popUpContent' style='text-align:center'>"+childData.properties.City+"</h5>"
      str+="<h5 class='popUpContent' style=text-align:center>"+childData.properties.Address+"</h5>"
      str+="<h5 class='popUpContent' style=text-align:center>"+"שעות: "+childData.properties.Hours+"</h5>"
      str+="<h5 class='popUpContent' style=text-align:center>"+childData.properties.Phone+"</h5>"
      
      str+=`<div class="col-md-12 text-center">
      <button style="text-align:center; margin-bottom: 1vh;margin-left:1vh;" onclick="checkValueNotEmpty()" class="compIcon btn btn-info" >הצג זמן נסיעה ומסלול משוערים</a></button>
      
      </div>`
      str+=`<div class="compIcons">
      <a href="${childData.properties.Waze}" target="_blank" class="compIcon" ><img src="img/waze.svg" alt="" width="40" height="40"></a>
      <a href="${childData.properties.FbURL}" target="_blank" class="compIcon" ><img src="img/facebook.svg" alt="" width="40" height="40"></a>
      <a href="${childData.properties.WebURL}" target="_blank" class="compIcon" ><img src="img/www.svg" alt="" width="40" height="40"></a>
      
      </div>`
      L.marker([x,y],{icon:pawMarker}).bindPopup(str).on('click', lats).addTo(mymap);//lats is function that getting coordinates
      
    })  
    
  })
}
getData();


///////////////////////Zoom out button//////////
var btnA=document.querySelector('.btnZoomOut');
var zoomTo=()=> { 
  if (marker != null){
    mymap.removeLayer(marker)
  }
  mymap.setView([31.771959, 35.217018], 8)
  removeRoutingControl();
  $('.select2').val(null).trigger('change');
 

};
btnA.addEventListener("click",zoomTo);




 //Adding Data to search box
var formControl=document.querySelector(".form-control")
var jsonData=[
    {
      "Name": "ראש פינה",
      "Code": 26,
      "X": 35.53991,
      "Y": 32.9675
    },
    {
      "Name": "מזכרת בתיה",
      "Code": 28,
      "X": 34.8429947,
      "Y": 31.8524284
    },
    {
      "Name": "אופקים",
      "Code": 31,
      "X": 34.62042,
      "Y": 31.3075447
    },
    {
      "Name": "אליכין",
      "Code": 41,
      "X": 34.92503,
      "Y": 32.4075851
    },
    {
      "Name": "מטולה",
      "Code": 43,
      "X": 35.5761261,
      "Y": 33.27877
    },
    {
      "Name": "יבנאל",
      "Code": 46,
      "X": 35.5117722,
      "Y": 32.70377
    },
    {
      "Name": "כפר תבור",
      "Code": 47,
      "X": 35.4197,
      "Y": 32.68767
    },
    {
      "Name": "מנחמיה",
      "Code": 48,
      "X": 35.5551033,
      "Y": 32.6665955
    },
    {
      "Name": "עתלית",
      "Code": 53,
      "X": 34.9420433,
      "Y": 32.68882
    },
    {
      "Name": "כנרת (מושבה)",
      "Code": 63,
      "X": 35.5597267,
      "Y": 32.7222862
    },
    {
      "Name": "מגדל",
      "Code": 65,
      "X": 35.50388,
      "Y": 32.8411331
    },
    {
      "Name": "אשדוד",
      "Code": 70,
      "X": 34.64725,
      "Y": 31.7905388
    },
    {
      "Name": "בית אלפא",
      "Code": 95,
      "X": 35.4305153,
      "Y": 32.5160522
    },
    {
      "Name": "כפר מל\"ל",
      "Code": 98,
      "X": 34.8943367,
      "Y": 32.1680679
    },
    {
      "Name": "מצפה רמון",
      "Code": 99,
      "X": 34.79853,
      "Y": 30.6148739
    },
    {
      "Name": "חופית",
      "Code": 115,
      "X": 34.87475,
      "Y": 32.38526
    },
    {
      "Name": "רמת ישי",
      "Code": 122,
      "X": 35.1649437,
      "Y": 32.7028275
    },
    {
      "Name": "גת רימון",
      "Code": 128,
      "X": 34.88055,
      "Y": 32.0684471
    },
    {
      "Name": "תל מונד",
      "Code": 154,
      "X": 34.9180641,
      "Y": 32.2526665
    },
    {
      "Name": "עין ורד",
      "Code": 157,
      "X": 34.932106,
      "Y": 32.2661247
    },
    {
      "Name": "גן יבנה",
      "Code": 166,
      "X": 34.7079,
      "Y": 31.7887917
    },
    {
      "Name": "כפר יונה",
      "Code": 168,
      "X": 34.9322853,
      "Y": 32.3152466
    },
    {
      "Name": "פרדסייה",
      "Code": 171,
      "X": 34.9104919,
      "Y": 32.3063545
    },
    {
      "Name": "אביחיל",
      "Code": 175,
      "X": 34.87101,
      "Y": 32.3516235
    },
    {
      "Name": "כפר ביל\"ו",
      "Code": 177,
      "X": 34.82634,
      "Y": 31.87316
    },
    {
      "Name": "אבן יהודה",
      "Code": 182,
      "X": 34.8862648,
      "Y": 32.2705345
    },
    {
      "Name": "כפר ויתקין",
      "Code": 190,
      "X": 34.8791275,
      "Y": 32.3844566
    },
    {
      "Name": "הדר עם",
      "Code": 191,
      "X": 34.9019623,
      "Y": 32.34848
    },
    {
      "Name": "כפר חיים",
      "Code": 193,
      "X": 34.9005432,
      "Y": 32.3537827
    },
    {
      "Name": "קדימה-צורן",
      "Code": 195,
      "X": 34.9229164,
      "Y": 32.2790871
    },
    {
      "Name": "בית ינאי",
      "Code": 200,
      "X": 34.8638344,
      "Y": 32.38303
    },
    {
      "Name": "רמות השבים",
      "Code": 206,
      "X": 34.8851,
      "Y": 32.1666031
    },
    {
      "Name": "מוצא עילית",
      "Code": 208,
      "X": 35.157383,
      "Y": 31.793787
    },
    {
      "Name": "גני תקווה",
      "Code": 229,
      "X": 34.8746223,
      "Y": 32.0597458
    },
    {
      "Name": "כפר ידידיה",
      "Code": 233,
      "X": 34.8982162,
      "Y": 32.3458328
    },
    {
      "Name": "חבצלת השרון",
      "Code": 235,
      "X": 34.86132,
      "Y": 32.36078
    },
    {
      "Name": "יקנעם עילית",
      "Code": 240,
      "X": 35.09431,
      "Y": 32.6460876
    },
    {
      "Name": "נתיבות",
      "Code": 246,
      "X": 34.582798,
      "Y": 31.4206066
    },
    {
      "Name": "כפר סירקין",
      "Code": 249,
      "X": 34.92413,
      "Y": 32.077282
    },
    {
      "Name": "נופך",
      "Code": 257,
      "X": 34.9207649,
      "Y": 32.04381
    },
    {
      "Name": "כפר שמריהו",
      "Code": 267,
      "X": 34.8210526,
      "Y": 32.1860847
    },
    {
      "Name": "צור משה",
      "Code": 276,
      "X": 34.9110069,
      "Y": 32.3004761
    },
    {
      "Name": "שבי ציון",
      "Code": 282,
      "X": 35.08273,
      "Y": 32.9800377
    },
    {
      "Name": "שדה ורבורג",
      "Code": 284,
      "X": 34.9017677,
      "Y": 32.20818
    },
    {
      "Name": "בית יהושע",
      "Code": 288,
      "X": 34.8692932,
      "Y": 32.25713
    },
    {
      "Name": "נהורה",
      "Code": 309,
      "X": 34.7081261,
      "Y": 31.6241684
    },
    {
      "Name": "כפר נטר",
      "Code": 316,
      "X": 34.87137,
      "Y": 32.2770462
    },
    {
      "Name": "שאר ישוב",
      "Code": 324,
      "X": 35.64704,
      "Y": 33.2263145
    },
    {
      "Name": "בית יצחק-שער חפר",
      "Code": 326,
      "X": 34.89087,
      "Y": 32.33398
    },
    {
      "Name": "ניר צבי",
      "Code": 331,
      "X": 34.8634148,
      "Y": 31.9523411
    },
    {
      "Name": "ניצן",
      "Code": 351,
      "X": 34.6306725,
      "Y": 31.7370644
    },
    {
      "Name": "מכמורת",
      "Code": 382,
      "X": 34.8738441,
      "Y": 32.40584
    },
    {
      "Name": "בני דרור",
      "Code": 386,
      "X": 34.8991737,
      "Y": 32.2620621
    },
    {
      "Name": "בני ציון",
      "Code": 418,
      "X": 34.8730354,
      "Y": 32.2159767
    },
    {
      "Name": "אודים",
      "Code": 446,
      "X": 34.846096,
      "Y": 32.26472
    },
    {
      "Name": "נורדייה",
      "Code": 447,
      "X": 34.8984947,
      "Y": 32.31804
    },
    {
      "Name": "נחלים",
      "Code": 449,
      "X": 34.91281,
      "Y": 32.0589256
    },
    {
      "Name": "גזית",
      "Code": 457,
      "X": 35.446434,
      "Y": 32.6388321
    },
    {
      "Name": "רמת רזיאל",
      "Code": 460,
      "X": 35.07208,
      "Y": 31.7740669
    },
    {
      "Name": "בית דגן",
      "Code": 466,
      "X": 34.8309174,
      "Y": 31.9999142
    },
    {
      "Name": "קריית עקרון",
      "Code": 469,
      "X": 34.8230629,
      "Y": 31.86123
    },
    {
      "Name": "אבו גוש",
      "Code": 472,
      "X": 35.1111145,
      "Y": 31.8051224
    },
    {
      "Name": "דאלית אל-כרמל",
      "Code": 494,
      "X": 35.04848,
      "Y": 32.6943779
    },
    {
      "Name": "גנות הדר",
      "Code": 549,
      "X": 34.9005051,
      "Y": 32.3200073
    },
    {
      "Name": "אזור",
      "Code": 565,
      "X": 34.80712,
      "Y": 32.02378
    },
    {
      "Name": "סביון",
      "Code": 587,
      "X": 34.87882,
      "Y": 32.0471649
    },
    {
      "Name": "עשרת",
      "Code": 591,
      "X": 34.7476845,
      "Y": 31.8244076
    },
    {
      "Name": "מזור",
      "Code": 606,
      "X": 34.9287,
      "Y": 32.0511856
    },
    {
      "Name": "קדרון",
      "Code": 615,
      "X": 34.7962875,
      "Y": 31.8148823
    },
    {
      "Name": "רינתיה",
      "Code": 616,
      "X": 34.92896,
      "Y": 32.0444641
    },
    {
      "Name": "חדיד",
      "Code": 618,
      "X": 34.933,
      "Y": 31.9685078
    },
    {
      "Name": "ג'לג'וליה",
      "Code": 627,
      "X": 34.95424,
      "Y": 32.1539459
    },
    {
      "Name": "כפר קאסם",
      "Code": 634,
      "X": 34.9766731,
      "Y": 32.1133881
    },
    {
      "Name": "קלנסווה",
      "Code": 638,
      "X": 34.9821739,
      "Y": 32.28498
    },
    {
      "Name": "עומר",
      "Code": 666,
      "X": 34.8496857,
      "Y": 31.2667522
    },
    {
      "Name": "כפר טרומן",
      "Code": 673,
      "X": 34.92448,
      "Y": 31.980711
    },
    {
      "Name": "גבעת שמואל",
      "Code": 681,
      "X": 34.8499565,
      "Y": 32.07689
    },
    {
      "Name": "נווה ימין",
      "Code": 686,
      "X": 34.93987,
      "Y": 32.16991
    },
    {
      "Name": "כפר חב\"ד",
      "Code": 696,
      "X": 34.8488235,
      "Y": 31.9917183
    },
    {
      "Name": "בארותיים",
      "Code": 697,
      "X": 34.9878578,
      "Y": 32.3212776
    },
    {
      "Name": "בורגתה",
      "Code": 698,
      "X": 34.96246,
      "Y": 32.32673
    },
    {
      "Name": "בית זית",
      "Code": 710,
      "X": 35.1621246,
      "Y": 31.7819176
    },
    {
      "Name": "מגשימים",
      "Code": 722,
      "X": 34.89881,
      "Y": 32.0467
    },
    {
      "Name": "משמר השבעה",
      "Code": 729,
      "X": 34.8235664,
      "Y": 32.009716
    },
    {
      "Name": "רמות מאיר",
      "Code": 735,
      "X": 34.8561,
      "Y": 31.8740559
    },
    {
      "Name": "גמזו",
      "Code": 745,
      "X": 34.94225,
      "Y": 31.9274445
    },
    {
      "Name": "ינוב",
      "Code": 753,
      "X": 34.94803,
      "Y": 32.30784
    },
    {
      "Name": "מצליח",
      "Code": 757,
      "X": 34.8723068,
      "Y": 31.906908
    },
    {
      "Name": "שתולים",
      "Code": 763,
      "X": 34.6834221,
      "Y": 31.7740059
    },
    {
      "Name": "מבוא ביתר",
      "Code": 771,
      "X": 35.1055336,
      "Y": 31.7223778
    },
    {
      "Name": "אורה",
      "Code": 780,
      "X": 35.1542473,
      "Y": 31.7557411
    },
    {
      "Name": "אבן ספיר",
      "Code": 783,
      "X": 35.13442,
      "Y": 31.7629414
    },
    {
      "Name": "בית נחמיה",
      "Code": 784,
      "X": 34.95608,
      "Y": 31.9761925
    },
    {
      "Name": "גבעת יערים",
      "Code": 787,
      "X": 35.0939331,
      "Y": 31.786314
    },
    {
      "Name": "אחיסמך",
      "Code": 804,
      "X": 34.90807,
      "Y": 31.9354916
    },
    {
      "Name": "חניאל",
      "Code": 807,
      "X": 34.94701,
      "Y": 32.3323631
    },
    {
      "Name": "שלומי",
      "Code": 812,
      "X": 35.1508446,
      "Y": 33.076767
    },
    {
      "Name": "בר גיורא",
      "Code": 823,
      "X": 35.0715446,
      "Y": 31.7299671
    },
    {
      "Name": "ירוחם",
      "Code": 831,
      "X": 34.9259644,
      "Y": 30.9877071
    },
    {
      "Name": "גני יוחנן",
      "Code": 862,
      "X": 34.8389549,
      "Y": 31.8584423
    },
    {
      "Name": "גינתון",
      "Code": 863,
      "X": 34.91295,
      "Y": 31.96367
    },
    {
      "Name": "מגדל העמק",
      "Code": 874,
      "X": 35.2437668,
      "Y": 32.6780853
    },
    {
      "Name": "רכסים",
      "Code": 922,
      "X": 35.10114,
      "Y": 32.7525024
    },
    {
      "Name": "מבשרת ציון",
      "Code": 1015,
      "X": 35.15114,
      "Y": 31.8006687
    },
    {
      "Name": "אור עקיבא",
      "Code": 1020,
      "X": 34.92038,
      "Y": 32.5064735
    },
    {
      "Name": "שדרות",
      "Code": 1031,
      "X": 34.59328,
      "Y": 31.527813
    },
    {
      "Name": "קריית מלאכי",
      "Code": 1034,
      "X": 34.7461624,
      "Y": 31.7323837
    },
    {
      "Name": "נוף הגליל",
      "Code": 1061,
      "X": 35.3232155,
      "Y": 32.7073
    },
    {
      "Name": "מעלות-תרשיחא",
      "Code": 1063,
      "X": 35.2805748,
      "Y": 33.01611
    },
    {
      "Name": "בני עי\"ש",
      "Code": 1066,
      "X": 34.76006,
      "Y": 31.7891235
    },
    {
      "Name": "מבועים",
      "Code": 1080,
      "X": 34.6549034,
      "Y": 31.4501438
    },
    {
      "Name": "תושייה",
      "Code": 1083,
      "X": 34.5420227,
      "Y": 31.4337158
    },
    {
      "Name": "כפר מימון",
      "Code": 1095,
      "X": 34.5363235,
      "Y": 31.4321423
    },
    {
      "Name": "מרכז שפירא",
      "Code": 1098,
      "X": 34.7060776,
      "Y": 31.6951122
    },
    {
      "Name": "צוקי ים",
      "Code": 1102,
      "X": 34.8587875,
      "Y": 32.36101
    },
    {
      "Name": "צור הדסה",
      "Code": 1113,
      "X": 35.0954971,
      "Y": 31.7163181
    },
    {
      "Name": "קריית יערים",
      "Code": 1137,
      "X": 35.102005,
      "Y": 31.8038464
    },
    {
      "Name": "כרמיאל",
      "Code": 1139,
      "X": 35.2898064,
      "Y": 32.9104919
    },
    {
      "Name": "שילת",
      "Code": 1165,
      "X": 35.0186539,
      "Y": 31.9204712
    },
    {
      "Name": "קיסריה",
      "Code": 1167,
      "X": 34.90903,
      "Y": 32.5049934
    },
    {
      "Name": "ספיר",
      "Code": 1176,
      "X": 35.185463,
      "Y": 30.6151218
    },
    {
      "Name": "מורשת",
      "Code": 1178,
      "X": 35.23177,
      "Y": 32.8261948
    },
    {
      "Name": "עדי",
      "Code": 1199,
      "X": 35.1738167,
      "Y": 32.7822762
    },
    {
      "Name": "מודיעין-מכבים-רעות",
      "Code": 1200,
      "X": 35.0101166,
      "Y": 31.89618
    },
    {
      "Name": "כוכב יאיר",
      "Code": 1224,
      "X": 34.99431,
      "Y": 32.2199631
    },
    {
      "Name": "יתד",
      "Code": 1227,
      "X": 34.32778,
      "Y": 31.2061443
    },
    {
      "Name": "פרי גן",
      "Code": 1231,
      "X": 34.3554535,
      "Y": 31.2215652
    },
    {
      "Name": "נירית",
      "Code": 1236,
      "X": 34.9848366,
      "Y": 32.1463661
    },
    {
      "Name": "עין הבשור",
      "Code": 1240,
      "X": 34.44156,
      "Y": 31.281168
    },
    {
      "Name": "קציר",
      "Code": 1243,
      "X": 35.10908,
      "Y": 32.4818459
    },
    {
      "Name": "תמרת",
      "Code": 1244,
      "X": 35.225235,
      "Y": 32.70357
    },
    {
      "Name": "חריש",
      "Code": 1247,
      "X": 35.06166,
      "Y": 32.47046
    },
    {
      "Name": "כפר ורדים",
      "Code": 1263,
      "X": 35.2695923,
      "Y": 32.9958954
    },
    {
      "Name": "כרמי יוסף",
      "Code": 1264,
      "X": 34.9202271,
      "Y": 31.8478718
    },
    {
      "Name": "מיתר",
      "Code": 1268,
      "X": 34.9396133,
      "Y": 31.3258266
    },
    {
      "Name": "להבים",
      "Code": 1271,
      "X": 34.8136635,
      "Y": 31.3696671
    },
    {
      "Name": "גן נר",
      "Code": 1274,
      "X": 35.3379936,
      "Y": 32.5319939
    },
    {
      "Name": "נופית",
      "Code": 1284,
      "X": 35.14465,
      "Y": 32.75867
    },
    {
      "Name": "גבעת אלה",
      "Code": 1288,
      "X": 35.244194,
      "Y": 32.72151
    },
    {
      "Name": "גבעת אבני",
      "Code": 1293,
      "X": 35.4389572,
      "Y": 32.7760544
    },
    {
      "Name": "שוהם",
      "Code": 1304,
      "X": 34.944912,
      "Y": 31.9994278
    },
    {
      "Name": "אלעד",
      "Code": 1309,
      "X": 34.95589,
      "Y": 32.0509529
    },
    {
      "Name": "לפיד",
      "Code": 1310,
      "X": 35.0327,
      "Y": 31.91752
    },
    {
      "Name": "מתן",
      "Code": 1315,
      "X": 34.9726868,
      "Y": 32.15912
    },
    {
      "Name": "בת חפר",
      "Code": 1319,
      "X": 35.0139,
      "Y": 32.333683
    },
    {
      "Name": "אחוזת ברק",
      "Code": 1330,
      "X": 35.3383942,
      "Y": 32.6413269
    },
    {
      "Name": "נוף איילון",
      "Code": 1333,
      "X": 34.9886856,
      "Y": 31.8686447
    },
    {
      "Name": "שמשית",
      "Code": 1337,
      "X": 35.2465363,
      "Y": 32.7327461
    },
    {
      "Name": "צור יצחק",
      "Code": 1345,
      "X": 34.9993,
      "Y": 32.24097
    },
    {
      "Name": "ניצן ב'",
      "Code": 1419,
      "X": 34.6364326,
      "Y": 31.7364979
    },
    {
      "Name": "תנובות",
      "Code": 2002,
      "X": 34.9627953,
      "Y": 32.30548
    },
    {
      "Name": "בן שמן (מושב)",
      "Code": 2013,
      "X": 34.92392,
      "Y": 31.9527683
    },
    {
      "Name": "חצור הגלילית",
      "Code": 2034,
      "X": 35.54223,
      "Y": 32.983345
    },
    {
      "Name": "טירת כרמל",
      "Code": 2100,
      "X": 34.97165,
      "Y": 32.76068
    },
    {
      "Name": "דימונה",
      "Code": 2200,
      "X": 35.0370331,
      "Y": 31.0699043
    },
    {
      "Name": "קרית טבעון",
      "Code": 2300,
      "X": 35.12602,
      "Y": 32.71497
    },
    {
      "Name": "אור יהודה",
      "Code": 2400,
      "X": 34.8547821,
      "Y": 32.02952
    },
    {
      "Name": "נשר",
      "Code": 2500,
      "X": 35.04102,
      "Y": 32.7685738
    },
    {
      "Name": "באר יעקב",
      "Code": 2530,
      "X": 34.8368263,
      "Y": 31.9386749
    },
    {
      "Name": "גדרה",
      "Code": 2550,
      "X": 34.78091,
      "Y": 31.8117237
    },
    {
      "Name": "ערד",
      "Code": 2560,
      "X": 35.21442,
      "Y": 31.2597485
    },
    {
      "Name": "אילת",
      "Code": 2600,
      "X": 34.9423332,
      "Y": 29.55514
    },
    {
      "Name": "בית שמש",
      "Code": 2610,
      "X": 34.98908,
      "Y": 31.7341251
    },
    {
      "Name": "קריית אונו",
      "Code": 2620,
      "X": 34.85742,
      "Y": 32.0599365
    },
    {
      "Name": "קריית גת",
      "Code": 2630,
      "X": 34.7630653,
      "Y": 31.6094341
    },
    {
      "Name": "ראש העין",
      "Code": 2640,
      "X": 34.9605446,
      "Y": 32.09433
    },
    {
      "Name": "רמת השרון",
      "Code": 2650,
      "X": 34.84203,
      "Y": 32.1398926
    },
    {
      "Name": "יבנה",
      "Code": 2660,
      "X": 34.7368851,
      "Y": 31.8769054
    },
    {
      "Name": "אום אל-פחם",
      "Code": 2710,
      "X": 35.1495476,
      "Y": 32.52605
    },
    {
      "Name": "טירה",
      "Code": 2720,
      "X": 34.9496346,
      "Y": 32.23346
    },
    {
      "Name": "קריית שמונה",
      "Code": 2800,
      "X": 35.57224,
      "Y": 33.21153
    },
    {
      "Name": "ירושלים",
      "Code": 3000,
      "X": 35.2118073,
      "Y": 31.783596
    },
    {
      "Name": "קדומים",
      "Code": 3557,
      "X": 35.16064,
      "Y": 32.2196655
    },
    {
      "Name": "אלקנה",
      "Code": 3560,
      "X": 35.03344,
      "Y": 32.11024
    },
    {
      "Name": "אריאל",
      "Code": 3570,
      "X": 35.1872177,
      "Y": 32.1049461
    },
    {
      "Name": "בית אל",
      "Code": 3574,
      "X": 35.2220573,
      "Y": 31.9411068
    },
    {
      "Name": "אלון שבות",
      "Code": 3604,
      "X": 35.1265945,
      "Y": 31.65403
    },
    {
      "Name": "מעלה אפרים",
      "Code": 3608,
      "X": 35.40438,
      "Y": 32.071785
    },
    {
      "Name": "קריית ארבע",
      "Code": 3611,
      "X": 35.11976,
      "Y": 31.538763
    },
    {
      "Name": "מעלה אדומים",
      "Code": 3616,
      "X": 35.3039322,
      "Y": 31.7784538
    },
    {
      "Name": "עפרה",
      "Code": 3617,
      "X": 35.2618065,
      "Y": 31.9516335
    },
    {
      "Name": "אלעזר",
      "Code": 3618,
      "X": 35.14431,
      "Y": 31.6597118
    },
    {
      "Name": "קרני שומרון",
      "Code": 3640,
      "X": 35.09019,
      "Y": 32.1692467
    },
    {
      "Name": "גבעון החדשה",
      "Code": 3644,
      "X": 35.1584854,
      "Y": 31.8479443
    },
    {
      "Name": "מתתיהו",
      "Code": 3648,
      "X": 35.0348129,
      "Y": 31.9298077
    },
    {
      "Name": "אפרתה",
      "Code": 3650,
      "X": 35.15425,
      "Y": 31.6590748
    },
    {
      "Name": "בית אריה",
      "Code": 3652,
      "X": 35.0523643,
      "Y": 32.03577
    },
    {
      "Name": "ברקן",
      "Code": 3654,
      "X": 35.108532,
      "Y": 32.10722
    },
    {
      "Name": "עמנואל",
      "Code": 3660,
      "X": 35.1363,
      "Y": 32.1625938
    },
    {
      "Name": "שערי תקווה",
      "Code": 3720,
      "X": 35.0264435,
      "Y": 32.1232071
    },
    {
      "Name": "גבעת זאב",
      "Code": 3730,
      "X": 35.1678543,
      "Y": 31.8575134
    },
    {
      "Name": "אלפי מנשה",
      "Code": 3750,
      "X": 35.0124054,
      "Y": 32.1732941
    },
    {
      "Name": "אורנית",
      "Code": 3760,
      "X": 34.99103,
      "Y": 32.13099
    },
    {
      "Name": "עלי",
      "Code": 3765,
      "X": 35.2673759,
      "Y": 32.07222
    },
    {
      "Name": "הר אדר",
      "Code": 3769,
      "X": 35.12894,
      "Y": 31.8268318
    },
    {
      "Name": "חשמונאים",
      "Code": 3770,
      "X": 35.0239067,
      "Y": 31.9314766
    },
    {
      "Name": "ביתר עילית",
      "Code": 3780,
      "X": 35.1121025,
      "Y": 31.6973572
    },
    {
      "Name": "כפר האורנים",
      "Code": 3796,
      "X": 35.03753,
      "Y": 31.9195938
    },
    {
      "Name": "מודיעין עילית",
      "Code": 3797,
      "X": 35.04005,
      "Y": 31.9310741
    },
    {
      "Name": "חיפה",
      "Code": 4000,
      "X": 35.0076027,
      "Y": 32.8056145
    },
    {
      "Name": "קצרין",
      "Code": 4100,
      "X": 35.6856766,
      "Y": 32.9936256
    },
    {
      "Name": "תל אביב יפו",
      "Code": 5000,
      "X": 34.7855072,
      "Y": 32.07351
    },
    {
      "Name": "באקה אל-גרביה",
      "Code": 6000,
      "X": 35.03224,
      "Y": 32.41782
    },
    {
      "Name": "בני ברק",
      "Code": 6100,
      "X": 34.83448,
      "Y": 32.08653
    },
    {
      "Name": "בת ים",
      "Code": 6200,
      "X": 34.749382,
      "Y": 32.01929
    },
    {
      "Name": "גבעתיים",
      "Code": 6300,
      "X": 34.81011,
      "Y": 32.0709267
    },
    {
      "Name": "הרצליה",
      "Code": 6400,
      "X": 34.83427,
      "Y": 32.1690521
    },
    {
      "Name": "חדרה",
      "Code": 6500,
      "X": 34.91915,
      "Y": 32.43507
    },
    {
      "Name": "חולון",
      "Code": 6600,
      "X": 34.7777443,
      "Y": 32.0166855
    },
    {
      "Name": "טבריה",
      "Code": 6700,
      "X": 35.5230255,
      "Y": 32.7877235
    },
    {
      "Name": "קריית אתא",
      "Code": 6800,
      "X": 35.1113129,
      "Y": 32.80515
    },
    {
      "Name": "כפר סבא",
      "Code": 6900,
      "X": 34.9119453,
      "Y": 32.18089
    },
    {
      "Name": "לוד",
      "Code": 7000,
      "X": 34.89168,
      "Y": 31.9494019
    },
    {
      "Name": "אשקלון",
      "Code": 7100,
      "X": 34.573864,
      "Y": 31.6729031
    },
    {
      "Name": "נס ציונה",
      "Code": 7200,
      "X": 34.79742,
      "Y": 31.927948
    },
    {
      "Name": "נצרת",
      "Code": 7300,
      "X": 35.29515,
      "Y": 32.70184
    },
    {
      "Name": "נתניה",
      "Code": 7400,
      "X": 34.8606224,
      "Y": 32.3151665
    },
    {
      "Name": "עכו",
      "Code": 7600,
      "X": 35.083416,
      "Y": 32.9309044
    },
    {
      "Name": "עפולה",
      "Code": 7700,
      "X": 35.3043175,
      "Y": 32.6184235
    },
    {
      "Name": "פרדס חנה-כרכור",
      "Code": 7800,
      "X": 34.97713,
      "Y": 32.472702
    },
    {
      "Name": "פתח תקווה",
      "Code": 7900,
      "X": 34.8856773,
      "Y": 32.0845947
    },
    {
      "Name": "צפת",
      "Code": 8000,
      "X": 35.505394,
      "Y": 32.96528
    },
    {
      "Name": "קריית מוצקין",
      "Code": 8200,
      "X": 35.0796967,
      "Y": 32.8357048
    },
    {
      "Name": "ראשון לציון",
      "Code": 8300,
      "X": 34.7938957,
      "Y": 31.9704418
    },
    {
      "Name": "רחובות",
      "Code": 8400,
      "X": 34.808342,
      "Y": 31.8913383
    },
    {
      "Name": "רמלה",
      "Code": 8500,
      "X": 34.8652267,
      "Y": 31.9289761
    },
    {
      "Name": "רמת גן",
      "Code": 8600,
      "X": 34.82247,
      "Y": 32.07082
    },
    {
      "Name": "רעננה",
      "Code": 8700,
      "X": 34.8702126,
      "Y": 32.1853828
    },
    {
      "Name": "שפרעם",
      "Code": 8800,
      "X": 35.1711235,
      "Y": 32.80627
    },
    {
      "Name": "באר שבע",
      "Code": 9000,
      "X": 34.78506,
      "Y": 31.25461
    },
    {
      "Name": "נהרייה",
      "Code": 9100,
      "X": 35.0964775,
      "Y": 33.00606
    },
    {
      "Name": "בית שאן",
      "Code": 9200,
      "X": 35.4970665,
      "Y": 32.4949875
    },
    {
      "Name": "זכרון יעקב",
      "Code": 9300,
      "X": 34.9517021,
      "Y": 32.57054
    },
    {
      "Name": "יהוד-מונוסון",
      "Code": 9400,
      "X": 34.88554,
      "Y": 32.0332642
    },
    {
      "Name": "קריית ביאליק",
      "Code": 9500,
      "X": 35.0899658,
      "Y": 32.8385429
    },
    {
      "Name": "קריית ים",
      "Code": 9600,
      "X": 35.0723953,
      "Y": 32.8486557
    },
    {
      "Name": "הוד השרון",
      "Code": 9700,
      "X": 34.8934479,
      "Y": 32.15254
    },
    {
      "Name": "בנימינה-גבעת עדה",
      "Code": 9800,
      "X": 34.9603271,
      "Y": 32.5209351
    }
  ]

/////////////////////////////////////////////////Table Build////////////////////////////////////
function buildTable(dataJ){
    for(var i=0;i<dataJ.length;i++){ 
        formControl.innerHTML+=`<option style="text-align:center;"  value="${dataJ[i].X+","+dataJ[i].Y}">${dataJ[i].Name}</option>`; 
        
    }
}
buildTable(jsonData);

//intitialize select component
$('.select2').select2({
    
  dir: "rtl" ,
  placeholder: "בחר עיר מגורים"
       
});


$('.select2').val(null).trigger('change');

//function zoom to choosen city

function setZoom(){
    

    if (marker != null){
      mymap.removeLayer(marker)
    }

    if (circle != null){
      mymap.removeLayer(circle)
    }
    
    removeRoutingControl()//Remove Last Route if changed
    var radius=25000;//50 Kilometers
    var coordinatesArr=formControl.value.split(',');
    var lat_a=parseFloat(coordinatesArr[0]);
    var lng_a=parseFloat(coordinatesArr[1]);
    mymap.setView([lng_a,lat_a], 10);
    
    marker=new L.marker([lng_a,lat_a],{icon:mapLocation})
    mymap.addLayer(marker)
    circle=L.circle([lng_a,lat_a], radius).addTo(mymap);
    if (changer <= 1){
      
      Swal.fire({
        title: '!שימו לב',
        text: 'כל המקומות בתוך הרדיוס הכחול הם בטווח נסיעה של חצי שעה בממוצע מעיר מגוריכם',
        icon: 'info',
        confirmButtonText: 'אישור'
      })
    }
    changer++;
    
  
    
    

};




//////////////////////////////////Routing//////////////////////////////////////

//Get lats
var latsxy
function lats(e) {
  latsxy=this.getLatLng();

  
}

var routingControl
function checkValueNotEmpty(){
  
  if(!formControl.value){
      
      Swal.fire({
        title: 'על מנת לקבל מסלול יש לבחור עיר מגורים',
        icon: 'info',
        confirmButtonText: 'אישור'
      })
  }
  else{
    runRoute();
  }
}
function runRoute(){
  removeRoutingControl();
///Point A
  var coordinatesArr=formControl.value.split(',');
  var lat_a=parseFloat(coordinatesArr[0]);
  var lng_a=parseFloat(coordinatesArr[1]);
  
//Point B
  routingControl=L.Routing.control({
    waypoints: [
      L.latLng(lng_a,lat_a),
      L.latLng(latsxy.lat, latsxy.lng)
    ],
    collapsible:true,
    totalDistanceRoundingSensitivity:2,
    summaryTemplate:'<h1 class="routeName">:מרחק וזמן נסיעה משוערים</h1><h2 class="routeName">{distance}, {time}</h2>',
    itineraryClassName:'route',
    createMarker: function() { return null; }
  }).addTo(mymap);
}

function removeRoutingControl() {
  try {
    
      mymap.removeControl(routingControl)
      routingControl = null
  }
  catch(err) {
    console.log("No lats")
  }
 
  
  
};

mymap.on('click', function(e) {        
  if (routingControl != null) {
    mymap.removeControl(routingControl);
    routingControl = null;
}
});
