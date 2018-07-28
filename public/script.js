// pickup object should look as follows
    // {
    //     lat: ,
    //     lng: ,
    //     content: {
    //         address: ,
    //         custId: ,
    //         icon: ,
    //     }
    // }

function initMap(){

        // Create a new StyledMapType object, passing it an array of styles,
        // and the name to be displayed on the map type control.
        var styledMapType = new google.maps.StyledMapType(
            [
              {elementType: 'geometry', stylers: [{color: '#ebe3cd'}]},
              {elementType: 'labels.text.fill', stylers: [{color: '#523735'}]},
              {elementType: 'labels.text.stroke', stylers: [{color: '#f5f1e6'}]},
              {
                featureType: 'administrative',
                elementType: 'geometry.stroke',
                stylers: [{color: '#c9b2a6'}]
              },
              {
                featureType: 'administrative.land_parcel',
                elementType: 'geometry.stroke',
                stylers: [{color: '#dcd2be'}]
              },
              {
                featureType: 'administrative.land_parcel',
                elementType: 'labels.text.fill',
                stylers: [{color: '#ae9e90'}]
              },
              {
                featureType: 'landscape.natural',
                elementType: 'geometry',
                stylers: [{color: '#dfd2ae'}]
              },
              {
                featureType: 'poi',
                elementType: 'geometry',
                stylers: [{color: '#dfd2ae'}]
              },
              {
                featureType: 'poi',
                elementType: 'labels.text.fill',
                stylers: [{color: '#93817c'}]
              },
              {
                featureType: 'poi.park',
                elementType: 'geometry.fill',
                stylers: [{color: '#a5b076'}]
              },
              {
                featureType: 'poi.park',
                elementType: 'labels.text.fill',
                stylers: [{color: '#447530'}]
              },
              {
                featureType: 'road',
                elementType: 'geometry',
                stylers: [{color: '#f5f1e6'}]
              },
              {
                featureType: 'road.arterial',
                elementType: 'geometry',
                stylers: [{color: '#fdfcf8'}]
              },
              {
                featureType: 'road.highway',
                elementType: 'geometry',
                stylers: [{color: '#f8c967'}]
              },
              {
                featureType: 'road.highway',
                elementType: 'geometry.stroke',
                stylers: [{color: '#e9bc62'}]
              },
              {
                featureType: 'road.highway.controlled_access',
                elementType: 'geometry',
                stylers: [{color: '#e98d58'}]
              },
              {
                featureType: 'road.highway.controlled_access',
                elementType: 'geometry.stroke',
                stylers: [{color: '#db8555'}]
              },
              {
                featureType: 'road.local',
                elementType: 'labels.text.fill',
                stylers: [{color: '#806b63'}]
              },
              {
                featureType: 'transit.line',
                elementType: 'geometry',
                stylers: [{color: '#dfd2ae'}]
              },
              {
                featureType: 'transit.line',
                elementType: 'labels.text.fill',
                stylers: [{color: '#8f7d77'}]
              },
              {
                featureType: 'transit.line',
                elementType: 'labels.text.stroke',
                stylers: [{color: '#ebe3cd'}]
              },
              {
                featureType: 'transit.station',
                elementType: 'geometry',
                stylers: [{color: '#dfd2ae'}]
              },
              {
                featureType: 'water',
                elementType: 'geometry.fill',
                stylers: [{color: '#b9d3c2'}]
              },
              {
                featureType: 'water',
                elementType: 'labels.text.fill',
                stylers: [{color: '#92998d'}]
              }
            ],
            {name: 'Styled Map'});

        // Create a map object, and include the MapTypeId to add
        // to the map type control.
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {
            lat: 40.3026,
            lng: -74.5112,
          },
          zoom: 11,
          mapTypeControlOptions: {
            mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain',
                    'styled_map']
          }
        });

        //Associate the styled map with the MapTypeId and set it to display.
        map.mapTypes.set('styled_map', styledMapType);
        map.setMapTypeId('hybrid');
    
    // array that will contain al pickup location data
    let PICK_UP_ARRAY = [
        {
            lat: 40.4129,
            lng: -74.3073,
            content: {
                address: '123 Main St., Old Bridge',
                custId: 443910192
            }
        }
    ];


    // map options
    // centers map on the lat and lng
    const options = {
        zoom: 10,
        center: {
            lat: 40.3026,
            lng: -74.5112,
        }
    }

    // create map
    // const map = new google.maps.Map(document.getElementById('map'), options)


    // function used to create single pickup location
    // each location must have lat, lng, and content
    // each location can have an optional icon
    // content is an object with address, custId
    function createPickup(lat, lng, icon, content){
        PICK_UP_ARRAY.push({
            lat: lat,
            lng: lng,
            content: content
        })
    }

    // function used to create multiple pickup locations
    // first col: lat
    // second col: lng
    // third col: address
    // fourth col: custId
    function createPickups(array2d){
        const arrayLength = array2d.length;
        for(let i = 0; i < arrayLength; i++){
            let icon = '';
            if(!array2d[i][3]){
                icon = '';
            }

            PICK_UP_ARRAY.push({
                lat: array2d[i][0],
                lng: array2d[i][1],
                content: {
                    address: array2d[i][2],
                    custId: array2d[i][3],
                    icon: icon
                }
            })
        }
            
    }

    // function used to create markers of all locations
    // markers will have a an infowindow
    function createMarkers(pickups){
        
        for(let i = 0; i < pickups.length; i++){
            let icon = '';
            if(!pickups[i].content.custId){
                const lat = pickups[i].lat;
                const lng = pickups[i].lng;

                const circle = new google.maps.Circle({
                    strokeColor: '#FF0000',
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: '#FF0000',
                    fillOpacity: 0.35,
                    map: map,
                    center: {lat, lng},
                    radius: 100
                  });
            }
            const marker = new google.maps.Marker({
                position: pickups[i],
                map: map,
                icon: icon,
            })
        
            const infoWindow = new google.maps.InfoWindow({
                content: '<h3>' + pickups[i].content.address + '</h3><h6>' + pickups[i].content.custId + '</h6>'
            })

            marker.addListener('click', function(){
                infoWindow.open(map, marker)
            })
        }
    }

    const test2dArr = [
        [40.398433, -74.224945, '1 test drive', 09876], 
        [40.391048, -74.221402, '2 example ave', ''], 
        [40.345528,	-74.19579, '3 main st', 567432],
        [40.405025,	-74.193747, '4 demo blvd', 12092190]]

    createPickups(test2dArr);
    console.log(PICK_UP_ARRAY)
    createMarkers(PICK_UP_ARRAY);
    
    
}

$('#submit-button').on('click', (event) => {
  const file = $('#csv-upload').prop('files')[0].webkitRelativePath
  + $('#csv-upload').prop('files')[0].name
  console.log(file);
  sendFile(file)  
})


function sendFile(file){
  const dataObj = {
    data: file
  }
  $.ajax({
    method: 'POST',
    url: '/csv-to-json',
    data: dataObj
  }).done((response) => {
    console.log(response);
    
  })
}