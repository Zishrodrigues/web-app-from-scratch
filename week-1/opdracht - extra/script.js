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
            console.log('This car is ' + this.color + ', from the year ' + this.year + ' and made by ' + this.brand)
        }
    };

    console.log(car);
    car.describe();
})();