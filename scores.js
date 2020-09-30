// Getting existing scores from local storage and creating a new array if one does not exist
var scores = JSON.parse(localStorage.getItem("scores"));
if (scores == null) {
    scores = [];
}

// Rendering table based on array
for (i = 0; i * 2 < scores.length; i++) {
    // Creating cells, storing scores and names in cells
    var score = document.createElement("td");
    var scoreName = document.createElement("td");
    score.textContent = scores[i * 2];
    scoreName.textContent = scores[i * 2 + 1];
    // Appending cells to rows, and rows to the table
    var row = document.createElement("tr");
    row.append(score);
    row.append(scoreName);
    document.getElementById("scores").append(row);
}

// Listening for the clear button to be clicked
document.getElementById("clear-button").addEventListener("click", function() {
    // Clearing the array
    scores = [];
    // Saving the empty array
    localStorage.setItem("scores", JSON.stringify(scores));
    // Rendering the empty array
    document.getElementById("scores").style.display = "none";
});