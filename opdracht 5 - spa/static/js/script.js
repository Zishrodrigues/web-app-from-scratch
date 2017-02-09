(function() { // here an iffe is initiated as to keep the global scope empty and run the code on read
  "use strict"; // the strict line is used to make sure the function only runs in strict mode

  var app = { // the app object is declared
    init: function() { // the init function is declared and run
      console.log('hi');
        routes.init(); //the routes function is called
    }
  };

  var routes = { // the route object is declared
    pages: [ //here an array is made with the page id's
      '#home',
      '#bestprac'
    ],
    init: function() { // the routes.init function is declared
      console.log('hi from routes');
      window.addEventListener('hashchange', sections.toggle, false);
    }
  };

  var sections = { // the sections object is declared
    toggle: function() { // create toggle function which will check the hash toggle
      var route = window.location.hash; // declare variable in which route is equal to the location hash
      if (route === '#home') {
        console.log('test');
      } else {
        console.log('lel');
      }
    }
  };

  app.init(); //the main app function is called
})();




/*

(function() {
    "use strict";
    var person = {
        name: 'jane doe',
        speak: function() {
            console.log('hello, my name is ' + this.name);
        }
    };

    console.log(person);
    person.speak();
})();

(function() {
    "use strict";
    var car = {
        color: 'green',
        year: '1991',
        brand: 'tesla',
        describe: function() {
            console.log('This car is ' + this.color + ', from the year ' + this.year + ' and made by ' + this.brand);
        }
    };

    console.log(car);
    car.describe();
})();
*/
