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
    main : document.querySelector('main'),
    template : document.querySelector('#template'),
    source : template.innerHTML,
    urlPromoCards: 'https://omgvamp-hearthstone-v1.p.mashape.com/cards/sets/Promo',
    html: ''
  };

  // store the data here
  var renderData = {
    render: function(data) {
      data.forEach(function(item, i) {
        var compile = Handlebars.compile(library.source);
        library.html = compile(item);
        library.main.innerHTML += library.html;
        console.log(item);
      });
    }
  };

  // object that calls the data
  var getData = {
    init: function() {
      aja()
        .url(library.urlPromoCards)
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
