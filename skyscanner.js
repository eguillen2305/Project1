var country = "US"; // default for simplicity right now
var locale = "en-US"; // default for simplicity right now
var currency = "USD"; // default for simplicity right now


// testing //
$("#start-jr").on("click", function(){
  window.location.reload();
  console.log("button clicked")
})

$(".submitBtn").on("click", function (e) {
  e.preventDefault();

  $('#flight-details').text(" ");


 

  var origin = $("#origin").val();
  var destination = $("#destination").val();
  var departurDate = $("#depart").val();
  var returnDate = $("#return").val();

  // AJAX call to get origin PlaceID //
  var settings = {
    async: true,
    crossDomain: true,
    url: `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/${country}/${currency}/en-US/?query=${origin}`,
    method: "GET",
    headers: {
      "x-rapidapi-host":
        "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
      "x-rapidapi-key": "0b8bdf6765msh3a834de431554e9p1feb19jsn74c4481a7c10",
    },
  };

  $.ajax(settings).done(function (responsePlaceID) {
    var originID = responsePlaceID.Places[0].PlaceId;
    console.log(originID);
    console.log(responsePlaceID)
    // AJAX call to get destinationID
    var settings = {
      async: true,
      crossDomain: true,
      url: `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/${country}/${currency}/en-US/?query=${destination}`,
      method: "GET",
      headers: {
        "x-rapidapi-host":
          "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
        "x-rapidapi-key": "0b8bdf6765msh3a834de431554e9p1feb19jsn74c4481a7c10",
      },
    };

    $.ajax(settings).done(function (responsePlaceID) {
      var destinationID = responsePlaceID.Places[0].PlaceId;
      console.log(destinationID);

      // AJAX call to get Quotes //
      var settings = {
        async: true,
        crossDomain: true,
        url: `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/${country}/${currency}/${locale}/${originID}/${destinationID}/${departurDate}/?inboundpartialdate=${returnDate}`,
        method: "GET",
        headers: {
          "x-rapidapi-host":
            "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
          "x-rapidapi-key":
            "0b8bdf6765msh3a834de431554e9p1feb19jsn74c4481a7c10",
        },
      };

      $.ajax(settings).done(function (response) {
        console.log(response);

        // add some styling //

        
        $('#flight-details').css({"background-color": "#F5F5F5", "font-size": "20px", "padding": "10px"})
        
        // IS FLIGHT INFORMATION AVAILABLE //
        var goNoGo = response.Quotes.length
        if (goNoGo > 0){
          $('#flight-details').html(`<h3><b>${origin} to ${destination}</b></h3>`);
          
        } else if (goNoGo === 0){
          $('#flight-details').append(`NO FLIGHT DATA AVAILABLE`)
          covidCountry(CountryCode)
        }

        console.log(goNoGo)
        
        var flightData = response.Quotes.length;
        for (var i = 0; i < flightData; i++) {
          var airlineID = response.Quotes[i].OutboundLeg.CarrierIds;
          var prices = response.Quotes[i].MinPrice;
          var directFlight = response.Quotes[i].Direct;
          var CountryCode = response.Places[0].CountryName;
          var destinationAirport = response.Places[1].Name;
          var originAirport = response.Places[0].Name;
          var outboundlegId = response.Quotes[0].OutboundLeg.DestinationId
          var numericPlaceId = response.Places[0].PlaceId

          console.log(numericPlaceId)
          console.log(outboundlegId)

          
          
          console.log(airlineID, prices, directFlight);


         
          // still working on getting the right airpot //
          var airlineLi = $("<li>");

         
          var originAirportLi = $("<li>");
          var destinationAirportLi = $("<li>");
          var priceLi = $("<li>");
          var directFlightLi = $("<li>");
                
      getLonLat(destination)

		  covidCountry(CountryCode)

                    
          $("#flight-details").append(airlineLi);
          $("#flight-details").append(originAirportLi);
          $("#flight-details").append(destinationAirportLi);
          $("#flight-details").append(priceLi);
          $("#flight-details").append(directFlightLi);

          console.log(CountryCode)

          
          //  matching placeid with origin //

          
          // if else statments to Display Airline name instead of Number //
          if (airlineID == "1065"){
            airlineLi.text(`Airline: Frontier Air`);
          }
          else if (airlineID == "881"){
            airlineLi.text('Airline: British Airway')
          }
          else if (airlineID == "1108"){
            airlineLi.text('Airline: Allegiant Air')
          }
          else if (airlineID == "838"){
            airlineLi.text('Airline: Air France')
          }
          else if (airlineID == "1361"){
            airlineLi.text('Airline: LATAM Airlines Group')
          }
          else if (airlineID == "1467"){
            airlineLi.text('Airline: Spirit Airline')
          }
          else if (airlineID == "1793"){
            airlineLi.text('Airline: United Airline')
          }
          else if (airlineID == "210"){
            airlineLi.text('Airline: Boutique Air')
          }
          else if (airlineID == "1126"){
            airlineLi.text('Airline: Gulf Air')
          }
          else if (airlineID == "1218"){
            airlineLi.text('Airline: Iberia Air')
          }
          else if (airlineID == "1606"){
            airlineLi.text('Airline: Quatar Air')
          }
          else if (airlineID == "1530"){
            airlineLi.text('Airline: Asiana Airlines')
          }
          else if (airlineID == "952"){
            airlineLi.text('Airline: Cathay Pacific')
          }
          else if (airlineID == "1317"){
            airlineLi.text('Airline: Korean Air')
          }
          else if (airlineID == "1324"){
            airlineLi.text('Airline: KLM')
          }
          else if (airlineID == "1755"){
            airlineLi.text('Airline: Turkish Airlines')
          }
          else if (airlineID == "1878"){
            airlineLi.text('Airline: Wizz Air')
          }
          else if (airlineID == "1464"){
            airlineLi.text('Airline: ANA')
          }
          else if (airlineID == "1902"){
            airlineLi.text('Airline: Southwest Airlines')
          }
          else if (airlineID == "1368"){
            airlineLi.text('Airline: Lufthansa')
          }
          else (airlineLi.text(`Airline: ${airlineID}`));

          // airports //

          if (outboundlegId == numericPlaceId) {
            originAirportLi.text(`Ariving At: ${originAirport}`)
          destinationAirportLi.text(`Departing From: ${destinationAirport}`)
           
          } else {
            originAirportLi.text(`Departing From: ${originAirport}`)
            destinationAirportLi.text(`Arriving At: ${destinationAirport}`)
          }

          // price //
          priceLi.text(`Prices: $${prices}`);

          if (directFlight == "true"){
            directFlightLi.text(`Direct Flight: Non-stop`);
          } else 
          directFlightLi.text(`Direct Flight: Not a Direct Flight`);
          
        }
      });
    });
  });
});


function getLonLat(destination){
$.ajax(
  {url: `https://api.opencagedata.com/geocode/v1/json?q=${destination}&key=27cb56ad5c784b38b713068f493bb1b0`,
   method: 'GET'})
.then(function(response){
  console.log(response) 

  var lat = response.results[0].geometry.lat
  var lon = response.results[0].geometry.lng
  
  var mymap = L.map('mapid').setView([lat, lon], 7);
 
  
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiYXJvZDEyMDciLCJhIjoiY2thdnB0ZzAxMWlkOTJ4cGN5NDJxeWtqcSJ9.sQsygMwVtngG59Cz3GYbuA'
}).addTo(mymap);
})
$("#searchForm")[0].reset();
}

