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
    init: function() { // the routes.init function is declared
      routie({
          'list': function() {
          },
          'list/:cardId': function(cardId) {
            console.log(cardId);
            // toggleSections.toggle();
            if ('#list/' + cardId  === window.location.hash) {
                document.getElementById(cardId).classList.remove('hidden');
                console.log('if ' + cardId);
            } else {
                document.getElementById(cardId).classList.add('hidden');
                console.log('else ' + cardId);
            }
          }
      });
      // routie('renderData.render.item.cardId', function() {
      //   console.log('zomg');
      // });
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

  var toggleSections = {
      // loop for each get element by id
      toggle: function(data){
          var route = window.location.hash;
          data.forEach(function (cardId){
            if ('#list/' + cardId  === window.location.hash) {
                document.getElementById(cardId).classList.remove('hidden');
                console.log('if ' + cardId);
            } else {
                document.getElementById(cardId).classList.add('hidden');
                console.log('else ' + cardId);
            }
          });
      }
  };

  // store the data here
  var renderData = {
    render: function(data) {
      data.forEach(function(item, i) {
        var compile = Handlebars.compile(library.source);
        library.html = compile(item);
        library.main.innerHTML += library.html;
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
