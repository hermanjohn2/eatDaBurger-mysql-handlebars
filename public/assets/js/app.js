// Using ES5 syntax because ES6 arrow functions will not work to use .data()
$(document).ready(function () {
  $('.burger-handler').on('click', function (event) {
    // console.log('click');

    var id = $(this).data('id');
    var devouredState = $(this).data('devoured');

    // console.log(`id: ${id}`, `isDevoured: ${devouredState}`);

    // Checking if devouredState is true or false -- changing value based on state
    if (devouredState) devouredState = false;
    else devouredState = true;

    var newDevouredState = {
      isDevoured: devouredState
    };

    $.ajax(`/api/burgers/${id}`, {
      type: 'PUT',
      data: newDevouredState
    }).then(function () {
      console.log(`Changed Devoured State to: ${devouredState}`);

      location.reload();
    });
  });

  $('.create-form').on('submit', function (event) {
    event.preventDefault();

    var newBurger = {
      name: $('#burger').val().trim()
    };

    $.ajax('/api/burgers', {
      type: 'POST',
      data: newBurger
    }).then(function () {
      console.log('success');

      location.reload();
    });
  });
});
