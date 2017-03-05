(function() { // here an iffe is initiated as to keep the global scope empty and run the code on load
    "use strict"; // the strict line is used to make sure the functions only runs in strict mode

    window.location.hash = '#list'; //go to #list as soon as the page loads

    var config = { //set variables to be used throughout the code
        setList: {
            main : document.querySelector('section'), // This is the element that holds the html
            template: document.querySelector('list-template'), //This is the element that holds the template html to be added in main
            source: template.innerHTML, //This selects the template and used innerHTML to inject new html into the element
            url: 'https://omgvamp-hearthstone-v1.p.mashape.com/info/', //API url for general info
        },
        general: {
            main : document.querySelector('main'), // This is the element that holds the html
            template: document.querySelector('template'), //This is the element that holds the template html to be added in main
            source: template.innerHTML, //This selects the template and used innerHTML to inject new html into the element
            url: 'https://omgvamp-hearthstone-v1.p.mashape.com/cards/sets/', //API url
            html: '' //empty html which will hold the new html
        }
    };

    var app = {
        init: function() {
            routes.init();
        }
    };

    var routes = {
        init: function(data) {
            routie({
                'list': function() { //function that's activitated when url = #list
                    dataWorker.getData(config.setList.url);
                },
                'list/:cardId': function() { //Function that's activitated when url = #list/cardId
                }
            });
        }
    };

    var dataWorker = {
        getData: function(url) {
            aja()
              .url(url)
              .header('X-Mashape-Key', '2sTOhVU46SmshEg17iL8fyLAEp9Hp1B5PGBjsnsJ2tUf1zkppp')
              .on('200', function(data){
                  //data is a javascript object
                  dataWorker.render(data.sets);
                })
            .go();
        },
        render: function(data) {
            data.forEach(function(item) {
                console.log(item);
            });
        }
    };

    app.init();
})();
