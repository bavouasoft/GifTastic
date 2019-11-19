let topics = [
  "rolls-Royce",
  "lamborghini",
  "ferrari",
  "bentley",
  "mercedes",
  "bmw",
  "cadillac",
  "bugatti",
  "land Rover",
  "aston Martin"
];

// Function that displays all gif buttons
function renderButtons() {
  $("#buttons-view").empty(); //// Deleting the topic buttons prior to adding new topic buttons//otherwise we will have repeat buttons
  for (let i = 0; i < topics.length; i++) {
    let a = $("<button>"); //create the start and end tag. (<button></button>)
    a.addClass("topic"); // Adding a class  "
    a.attr("data-name", topics[i]);
    a.text(topics[i]);

    $("#buttons-view").append(a);
  }
}

/////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

// This function handles events where one button is clicked

//function addNewButton() {
$(document).on("click", "#add-topic", function(event) {
  event.preventDefault();
  let topic = $("#topic-input")
    .val()
    .trim();
  // The topic from the textbox is then added to our array
  topics.push(topic);

  // calling renderButtons which handles the processing of our topic array
  renderButtons();
});
//}

////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
$(document).on("click", ".topic", function(event) {
  event.preventDefault();
  let dataname = $(this).attr("data-name"); //our current object here
  handleDataName(dataname); // handle the dataname to be used later

  console.log(name);
});

handleDataName = function(dataname) {
  let queryURL =
    "https://api.giphy.com/v1/gifs/search?q=" +
    dataname +
    "&api_key=dc6zaTOxFJmzC&limit=10";
  console.log(queryURL);
  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {
    console.log(response);
    $("#gifsimages").empty();
    for (item_response of response.data) {
      let gifDiv = $("<div>"); //div for the gifs
      gifDiv.addClass("gifDiv");
      // rating
      let gifRating = $("<p>").text("Rating: " + item_response.rating);
      gifDiv.append(gifRating);

      let gifImage = $("<img>");
      gifImage.attr("src", item_response.images.fixed_height_small_still.url); // still image link to src
      gifImage.attr(
        "data-still",
        item_response.images.fixed_height_small_still.url
      ); // still image
      gifImage.attr(
        "data-animate",
        item_response.images.fixed_height_small.url
      ); // animated image
      gifImage.attr("data-state", "still"); // set the image state for evaluation
      gifImage.addClass("image");
      gifDiv.append(gifImage);

      $("#gifsimages").prepend(gifDiv);
    }
  });
};

$(document).on("click", ".gifDiv", function() {
  console.log("uuuuuuuuuuuuuuu");
});

$(document).on("click", ".image", function() {
  let state = $(this).attr("data-state");
  if (state == "still") {
    $(this).attr("src", $(this).data("animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).data("still"));
    $(this).attr("data-state", "still");
  }
});

//
renderButtons();
//
