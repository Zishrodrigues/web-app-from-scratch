(function() { // here an iffe is initiated as to keep the global scope empty and run the code on read
  "use strict"; // the strict line is used to make sure the function only runs in strict mode
  
  // You might want to check if the user didn't enter another page than the home.
  if (!window.location.hash || !(routes.pages).contains(window.location.hash)) {
    window.location.hash = '#home'; //go to #home as soon as the page loads
  }

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
      // You might want to check if the route entered by the users has a page
      if ((this.pages).contains('#' + window.location.hash) {
        window.addEventListener('hashchange', sections.toggle, false);
      }
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

  app.init(); //the main app function is called
})();
