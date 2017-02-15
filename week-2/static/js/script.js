(function() { // here an iffe is initiated as to keep the global scope empty and run the code on read
  "use strict"; // the strict line is used to make sure the function only runs in strict mode

  window.location.hash = '#home'; //go to #home as soon as the page loads

  var app = { // the app object is declared
    init: function() { // the init function is declared and run
        routes.init(); //the routes function is called
        getData.init();
    }
  };

  var routes = { // the route object is declared
    pages: [ //here an array is made with the page id's
      'home',
      'bestprac'
    ],
    init: function() { // the routes.init function is declared
      window.addEventListener('hashchange', sections.toggle, false);
    }
  };

  var sections = {
      // loop for each get element by id
      toggle: function(){
          var route = window.location.hash;
          routes.pages.forEach(function (page){
            if ('#' + page  === route ) {
                document.getElementById(page).classList.remove('hidden');
            } else {
                document.getElementById(page).classList.add('hidden');
            }
          });
      }
  };

  //set variables in library object
  var library = {
    main: document.querySelector('main'),
    template : Handlebars.compile(document.querySelector('#template').innerHTML),
    urlHolidays: 'https://holidayapi.com/v1/holidays?key=e969cdc0-1552-4027-b885-41220d5b85f3&country=NL&year=2016',
    html: ''
  };

  var dataContainer = {
    valueA: '',
    valueB: ''
  };

  // store the data here
  var storeData = {
    holidays: function(data) {
      var holidaysArray = Object.keys(data.holidays).map(function (hMap) {
      return data.holidays[hMap];
    }).map(function (hMap) {
      return hMap[0];
    }).map(function (mapName) {
      return mapName.name;
    });
        // .map(hMap => data.holidays[hMap]);
        // .map(hMap => hMap[0])
        // .map(mapName => mapName.name);
      console.log(holidaysArray);
      dataContainer.valueA = holidaysArray;
      // dataContainer.valueB = data.holidays;
    }
  };

  // object that calls the data
  var getData = {
    init: function() {
      aja()
        .url(library.urlHolidays)
        .on('200', function(data){
            //data is a javascript object
            storeData.holidays(data);
          })
      .go();
    }
  };

  app.init(); //the main app function is called
})();
