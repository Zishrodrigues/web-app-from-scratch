(function() { // here an iffe is initiated as to keep the global scope empty and run the code on read
  "use strict"; // the strict line is used to make sure the function only runs in strict mode

  window.location.hash = '#home'; //go to #home as soon as the page loads

  var app = { // the app object is declared
    init: function() { // the init function is declared and run
        routes.init(); //the routes function is called
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

  var api = {
    init: function() {
      var request = new XMLHttpRequest();
      request.open('GET', 'https://holidayapi.com/v1/holidays?key=e969cdc0-1552-4027-b885-41220d5b85f3&country=NL&year=2016', true);

      request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
          // Success!
          console.log('success');
          var data = JSON.parse(request.responseText);
        } else {
          console.log('error');
          // We reached our target server, but it returned an error
        }
      };

      request.onerror = function() {
        // There was a connection error of some sort
      };

      request.send();
      console.log(request);
    }
  };

  app.init(); //the main app function is called
  api.init();
})();
