$(document).ready(function() {
if (sessionStorage['buttons']) {
    console.log("There is 'buttons' in session storage ");
    var buttons = JSON.parse(sessionStorage.getItem('buttons'));
} else {
var buttons = ["wombat", "kangaroo", "possum", "raccoon", "lemur", "chinchilla"];
};

$(".clear-button").on("click", function(){
$("#images").empty();
});

function displayGifs() {
    console.log("you clicked the tag button");
    var search = $(this).attr("data-search");
    console.log(search);
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=" + search + "&limit=10";
    console.log(queryURL);
$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
      console.log(queryURL);
      console.log(response);
     var results = response.data;

          for (var i = 0; i < results.length; i++) {
            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                var gifDiv = $("<div class='item'>");
                var rating = results[i].rating;
                var p = $("<p>").text("Rating: " + rating);
                var searchImage = $("<img>");
                searchImage.attr("src", results[i].images.fixed_height.url);
                gifDiv.addClass("thumbnail col-md-4");
                gifDiv.append(p);
                gifDiv.append(searchImage);
                $("#images").prepend(gifDiv);
            }
          }
        });
};

function renderButtons() {
        $("#buttoncontainer").empty();
        for (var i = 0; i < buttons.length; i++) {
          var a = $("<button>");
          a.addClass("btn btn-default search-button");
          a.attr("data-search", buttons[i]);
          a.text(buttons[i]);
          $("#buttoncontainer").append(a);
        }
      }

      $(".addsearch").on("click", function(event) {
        event.preventDefault();
        console.log("you clicked the add tag button");
        var newSearch = $(".newsearch").val().trim();
        console.log(newSearch);
        buttons.push(newSearch);
        sessionStorage.setItem("buttons", JSON.stringify(buttons));

        renderButtons();
      });

      $(document).on("click", ".search-button", displayGifs);

      renderButtons();
});