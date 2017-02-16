(function() { // here an iffe is initiated as to keep the global scope empty and run the code on read
  "use strict"; // the strict line is used to make sure the function only runs in strict mode

  window.location.hash = '#list'; //go to #home as soon as the page loads

  var app = { // the app object is declared
    init: function() { // the init function is declared and run
        routes.init(); //the routes function is called
        getData.init();
    }
  };

  var routes = { // the route object is declared
    init: function(data) { // the routes.init function is declared
      routie({
          'list': function() {
            document.querySelectorAll('.home').forEach(function (homeClass) {
              homeClass.classList.remove('hidden');
            });
          },
          'list/:cardId': function(cardId) {
            document.getElementById(cardId).classList.remove('hidden');
            document.querySelectorAll('.home').forEach(function (homeClass) {
              homeClass.classList.add('hidden');
            });
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
        var cardMatcher = item.cardId;
        console.log(cardMatcher);
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
          })
      .go();
    }
  };

  app.init(); //the main app function is called
})();
