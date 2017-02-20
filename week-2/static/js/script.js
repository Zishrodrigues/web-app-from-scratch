(function() { // here an iffe is initiated as to keep the global scope empty and run the code on read
  "use strict"; // the strict line is used to make sure the function only runs in strict mode

  window.location.hash = '#list'; //go to #home as soon as the page loads

  var app = { // the app object is declared
    init: function() { // the init function is declared and run
        routes.init(); //the routes function is called
        getData.init(); //the getData function is called
    }
  };

  var routes = { // the route object is declared
    init: function(data) { // the routes.init function is declared
      routie({
          'list': function() { //function that's activitated when url = #list
            document.querySelectorAll('.home').forEach(function (homeClass) { // Loop through all elements with class .home
              homeClass.classList.remove('hidden'); // Go through the classes with .hidden and remove the class from element
            });
            document.querySelectorAll('.card-detail').forEach(function (cardDetail) {
              cardDetail.classList.add('hidden');
            });
          },
          'list/:cardId': function(cardId) { //Function that's activitated when url = #list/cardId
            document.getElementById(cardId).classList.remove('hidden');
            document.querySelectorAll('.home').forEach(function (homeClass) {
              homeClass.classList.add('hidden');
            });
          }
      });
    }
  };

  var config = { //set variables in config object
    main : document.querySelector('main'), // Select element main
    template : document.querySelector('#template'), //select element with id #template
    source : template.innerHTML, //select the HTML of #template to change its content
    urlPromoCards: 'https://omgvamp-hearthstone-v1.p.mashape.com/cards/sets/Promo', //api link
    html: ''
  };

  var renderData = { // render the data to the html here
    render: function(data) { // use the api data for this function
      data.forEach(function(item) { //Loop through each data object and put it in item
        var compile = Handlebars.compile(config.source); //compile the data into #template
        config.html = compile(item); //compile an item into the html
        config.main.innerHTML += config.html; //add the HTML into the main element
      });
    }
  };

  // object that calls the data
  var getData = {
    init: function() {
      aja()
        .url(config.urlPromoCards)
        .header('X-Mashape-Key', '2sTOhVU46SmshEg17iL8fyLAEp9Hp1B5PGBjsnsJ2tUf1zkppp')
        .on('200', function(data){
            //data is a javascript object
            renderData.render(data);
            console.log(data);
          })
      .go();
    }
  };

  app.init(); //the main app function is called
})();
