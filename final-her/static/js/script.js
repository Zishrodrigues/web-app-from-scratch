(function() { // here an iffe is initiated as to keep the global scope empty and run the code on load
    "use strict"; // the strict line is used to make sure the functions only runs in strict mode

    var config = {
        url: apiUrl,
        radioButton: document.querySelector('input'),
        main : document.querySelector('main'), // This is the element that holds the html
        template: document.querySelector('template'), //This is the element that holds the template html to be added in main
        source: template.innerHTML, //This selects the template and used innerHTML to inject new html into the element
        html: '' //empty html which will hold the new html
    };

    var app = {
        init: function() {
            routes.init();
        }
    };

    var routes = {
        init: function(data) {
            routie({
                '': function() { //function that's activitated when url = #list
                    window.location.hash = 'intro';
                },
                'intro': function() { //function that's activitated when url = #list
                    document.querySelector('.intro').classList.remove('hide');
                },
                'placeForm': function() { //function that's activitated when url = #list
                    document.querySelector('.intro').classList.add('hide');
                    document.getElementById('placeForm').classList.remove('hide');
                    filters.formSubmit('placeForm', 'place', 'roomForm');
                },
                'roomform': function() { //function that's activitated when url = #list
                    filters.formSubmit('roomForm', 'rooms', 'spaceForm');
                },
                'spaceForm': function() { //function that's activitated when url = #list
                    filters.formSubmit('spaceForm', 'space', 'result');
                },
                'result':function() {
                    document.getElementById('loader').classList.remove('hide');
                    dataWorker.getData(config.url);
                    // document.getElementById('placeForm').classList.add('hide');
                    document.querySelectorAll('.overview').forEach(function (overview) { // Loop through all elements with class .home
                      overview.classList.remove('hide'); // Go through the classes with .hidden and remove the class from element
                    });
                    document.querySelectorAll('.detail').forEach(function (detail) {
                      detail.classList.add('hide');
                    });
                },
                'reset':function() {
                    location.reload();
                    window.location.hash = 'intro';
                },
                'result/:Id': function(Id) {
                    console.log(Id);
                    document.getElementById(Id).classList.remove('hide');
                    document.querySelectorAll('.overview').forEach(function (overview) {
                      overview.classList.add('hide');
                    });
                }
            });
        }
    };

    var filters = {
        getRadioVal: function(form, name) {
            var val;
            // get list of radio buttons with specified name
            var radios = form.elements[name];
            // loop through list of radio buttons
            for (var i=0, len=radios.length; i<len; i++) {
                if ( radios[i].checked ) { // radio checked?
                    val = radios[i].value; // if so, hold its value in val
                    break; // and break out of for loop
                }
            }
            return val; // return value of checked radio or undefined if none checked
        },
        parameters: [],
        formSubmit: function(formId, name, formLink) {
            document.getElementById(formId).onsubmit = function() {
                var val = filters.getRadioVal(this, name);
                filters.parameters.push('/' + val);
                window.location.hash = '#' + formLink;
                filters.showHide(formLink, formId);
                console.log(filters.parameters);
                return false;
            };
        },
        showHide: function(show, hide) {
            document.getElementById(show).classList.remove('hide');
            document.getElementById(hide).classList.add('hide');
        }
    };

    var dataWorker = {
        dataHolder: [],
        getData: function(url) {
            aja()
                .url(url + filters.parameters.join(''))
                .on('200', function(data){
                //data is a javascript object
                    document.getElementById('loader').classList.add('hide');
                    dataWorker.render(data.Objects);
                    dataWorker.filterBrochure(data.Objects);
                    dataWorker.sortRooms(data.Objects);
                    data.Objects.map(function(item) {
                        dataWorker.dataHolder.push(item);
                    });
                    // localStorage.setItem("dataHolder", JSON.stringify(dataWorker.dataHolder));
                    console.log(dataWorker.dataHolder);
                })
                .on('40x', function(response){
                    document.getElementById('error').classList.remove('hide');
                    document.getElementById('loader').classList.add('hide');
                    console.log('Error :-()');
                })
            .go();
        },
        render: function(data) {
            config.main.innerHTML = '';
            data.forEach(function(item) {
                var compile = Handlebars.compile(config.source);
                config.html = compile(item);
                config.main.innerHTML += config.html;
            });
            // console.log(JSON.parse(localStorage.getItem("dataHolder")));
        },
        filterBrochure: function(data) {
            var filtered = data.filter(function(val) {
                return val.HeeftBrochure === false;
            });
            console.log('Filtered(brochure): ' + filtered);
        },
        roomArray: [],
        sortRooms: function(data) {
            data.forEach(function(item) {
                dataWorker.roomArray.push(item.AantalKamers);
            });
            var sorted = dataWorker.roomArray.sort(function(a, b) {
                return a - b;
            });
            dataWorker.countRooms(data);
            console.log('Sorted(rooms): ' + sorted);
        },
        countRooms: function(data) {
            var reduced = dataWorker.roomArray.reduce(function(total, sum) {
                return total + sum;
            });
            console.log('Reduced(total rooms): ' + reduced);
        }
    };

    app.init();
})();
