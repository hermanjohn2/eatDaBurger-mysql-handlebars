$(document).ready(function () {
	// Calls PUT route and updates burger's devoured state in db
	function updateBurger(id, state) {
		$.ajax(`/api/burgers/${id}`, {
			type: 'PUT',
			data: state
		}).then(function () {
			// Reloading the DOM
			location.reload();
		});
	}

	// Calls POST route and creates a new burger entry in the db
	function createBurger(name) {
		$.ajax('/api/burgers', {
			type: 'POST',
			data: name
		}).then(function () {
			// Reloading the DOM
			location.reload();
		});
	}

	// Handle's Devour and Eat Again btn clicks
	function handleBurgerClick(event) {
		// Checking if devouredState is true or false -- changing value based on state
		event.preventDefault();
		var id = $(this).data('id');
		var devouredState = $(this).data('devoured');

		if (devouredState) devouredState = false;
		else devouredState = true;

		var newDevouredState = {
			isDevoured: devouredState
		};

		updateBurger(id, newDevouredState);
	}

	// Handles submit button click
	function handleBurgerSubmit(event) {
		event.preventDefault();

		var newBurger = {
			name: $('#burger').val().trim()
		};

		createBurger(newBurger);
	}

	// When the "Devour"/"Eat Again" btn is clicked...
	$('.burger-handler').on('click', handleBurgerClick);

	// When the create new burger btn is clicked...
	$('.create-form').on('submit', handleBurgerSubmit);
});
