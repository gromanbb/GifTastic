// VARIABLES
// ==============================================================================
// Initial array of Celebrities
let celebritiesArr = ["Jennifer Lawrence", "Robert Downey Jr.", "Emma Stone", "Samuel L. Jackson", "Angelina Jolie", "Bradley Cooper"];

let apiURL = "https://api.giphy.com/v1/gifs/search?";		// String for Giphy's Search Endpoint URL
let apiMethod = "GET";										// String for Giphy's Get Method
let apiKey = "M7vT95tSFYUtbwRSC6qZl8OSN60aY7Tr";			// String for Giphy's API Key
let apiQuery = "";											// String for Giphy's search query term or phrase
let apiLimit = "10";										// String for Giphy's max number of objects to return 
let apiRating = "PG";										// String for Giphy's rating filter
let apiLang = "en";											// String for Giphy's default language

let inputCelebrity = "";									// String for Celebrity's name provided in textbox
let celebrityResponse = {};									// Object for retrieved data from Giphy's API
let celebrityGifArr = [];									// Array for retrieved data from Giphy's API

// FUNCTIONS
// ==============================================================================
// Function for re-rendering the HTML to display the appropriate content
function displayCelebritiesGifs() {
	// Grabbing and storing the data-name property value from the button being clicked
	apiQuery = $(this).attr("data-name") + " laughing";

	// Building Giphy's URL for AJAX Call
	apiURL = apiURL + "api_key=" + apiKey + "&q=" + encodeURIComponent(apiQuery) + "&limit=" + apiLimit + "&rating=" + apiRating + "&lang=" + apiLang
	// Debugging
	console.log(apiURL);
	// Creating AJAX Call for the specific celebrity button being clicked
	$.ajax({
		queryURL: apiURL,
		method: apiMethod,
	}).then(function (celebrityResponse) {
		// Debugging
		console.log(celebrityResponse);

		// Setting an array with the returned GIFs for the celebrity
		celebrityGifArr = celebrityResponse.data;

		// Looping through every returned GIF
		for (var i = 0; i < celebrityGifArr.length; i++) {
			// Creating a div tag for the GIF
			let gifDiv = "";
			gifDiv = $("<div>");

			// Creating an img tag for the GIF
			let gifImg = "";
			gifImg = $("<img>");
			// Giving the <img> tag an src attribute of a proprty pulled off the GIF
			gifImg.attr("src", celebrityGifArr[i].images.fixed_height_still.url);
			// Adding custom data- attributes to the <img> tag to store the still and animated GIFs
			gifImg.attr("data-still", celebrityGifArr[i].fixed_height_still.url);
			gifImg.attr("data-animate", celebrityGifArr[i].fixed_height.url);
			gifImg.attr("data-state", "still");
			// Adding a class "gif" to the <img> tag to handle an event later on
			gitImg.addClass("gif");

			// Grabbing and storings the GIF's rating
			let strRating = "";
			strRating = toUpperCase(celebrityGifArr[i].rating);

			// Creating a p tag as caption
			let gifP = "";
			gifP("<p>").text("Rating: " + strRating);

			// Appending the <img> and <p> tags to the GIF's div that was just created
			gifDiv.append(gifImg);
			gifDiv.append(gifP);

			// Preppending the <div> tag to the GIFs celebrities-view div
			$("#celebrities-view").preppend(gifDiv);

		}
	});
}

// Function for displaying Celebrities buttons
function renderCelebritiesBtns() {
	// Deleting the celebrities buttons prior to adding new celebrities to prevent duplicate buttons
	$("#buttons-view").empty();

	// Looping through the array of Celebrities
	for (let i = 0; i < celebritiesArr.length; i++) {
		// Generating a button for each celebrity in the array dynamically
		let btn = $("<button>");
		// Adding a type button to the button
		btn.attr("type", "button");
		// Adding a class of celebrity-btn to the button
		btn.addClass("celebrity-btn");
		// Adding a Bootstrap's class to the button
		btn.addClass("celebrity-btn");
		// Adding a Bootstrap's class to the button
		btn.addClass("mx-auto");
		// Adding a custom data-name attribute to the button
		btn.attr("data-name", celebritiesArr[i]);
		// Providing the initial button text
		btn.text(celebritiesArr[i]);
		// Adding the button to the buttons-view div
		$("#buttons-view").append(btn);
	}
}

// MAIN PROCESS
// ==============================================================================
// Adding a click event listener to the Add Celebrity button
$("#add-celebrity").on("click", function (event) {
	event.preventDefault();
	// This line grabs the input from the textbox
	var inputCelebrity = $("#celebrity-input").val().trim();

	// Adding celebrity from the button to our array
	celebritiesArr.push(inputCelebrity);

	// Calling renderCelebritiesBtns which handles the processing of the Celebrities array
	renderCelebritiesBtns();
});

// Adding a click event listener to all buttons with class "celebrity-btn"
$(document).on("click", ".celebrity-btn", displayCelebritiesGifs);

// Calling the renderCelebritiesBtns function to display the intial buttons
renderCelebritiesBtns();

// Adding a click event listener to all GIFs with class "gif"
$(".gif").on("click", function () {
	// Grabbing the custom data-state attribute from the GIF being clicked
	let gifState = $(this).attr("data-state");

	// If the clicked GIF's state is still, update its src attribute to what its data-animate value is.
	// Then set the GIF's data-state attribute to animate
	// Else set its src attribute to its data-still value
	if (state === "still") {
		$(this).attr("src", $(this).attr("data-animate"));
		$(this).attr("data-state", "animate");
	} else {
		$(this).attr("src", $(this).attr("data-still"));
		$(this).attr("data-state", "still");
	}
});
