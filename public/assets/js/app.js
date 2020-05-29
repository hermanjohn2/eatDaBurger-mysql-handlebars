$(document).ready(function () {
  // When the "Devour"/"Eat Again" btn is clicked...
  $('.burger-handler').on('click', function (event) {
    var id = $(this).data('id');
    var devouredState = $(this).data('devoured');

    // Checking if devouredState is true or false -- changing value based on state
    if (devouredState) devouredState = false;
    else devouredState = true;

    var newDevouredState = {
      isDevoured: devouredState
    };

    // PUT request
    $.ajax(`/api/burgers/${id}`, {
      type: 'PUT',
      data: newDevouredState
    })
      .then(function () {
        console.log(`Changed Devoured State to: ${devouredState}`);

        // Reloading the page
        location.reload();
      })
      .catch(function (err) {
        if (err) throw err;
      });
  });

  // When the create new burger btn is clicked...
  $('.create-form').on('submit', function (event) {
    event.preventDefault();

    var newBurger = {
      name: $('#burger').val().trim()
    };

    // POST request
    $.ajax('/api/burgers', {
      type: 'POST',
      data: newBurger
    })
      .then(function () {
        // Reloading the page
        location.reload();
      })
      .catch(function (err) {
        if (err) throw err;
      });
  });
});
