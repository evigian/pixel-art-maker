let color = $("#colorPicker"); // Select color input
let height = $("#input_height"); // Select size input
let width = $("#input_width");
const pixelCanvas = $("#pixel_canvas");
let dragMouse = false;

//prevents the default action of submit button
$("#submit").click(function(event) {
  event.preventDefault();
});

// When size is submitted by the user, call makeGrid()
$(function() {
  //shortcut of document ready function
  $("#submit").on("click", function makeGrid() {
    let width = $("#input_width").val();
    let height = $("#input_height").val();
    if (width > 0 && width <= 50 && (height > 0 && height <= 50)) {
      pixelCanvas.children().remove();
      for (let column = 0; column < height; column++) {
        $("#pixel_canvas").append("<tr></tr>");
        for (let row = 0; row < width; row++) {
          $("tr")
            .last()
            .append("<td></td>");
        }
      }
    } else {
      alert(
        "Grid height and width should be greater than 0 and less or equal to 50."
      );
    }
  });
});

//draw on the canvas by mouse click
pixelCanvas.on("click", "td", function(event) {
  let color = $("#colorPicker").val();
  $(this).css("background-color", color);
});

//delete color by double click
pixelCanvas.on("dblclick", "td", function() {
  $(this).css("background-color", "transparent");
});

//draw by dragging the mouse after it is clicked
pixelCanvas.on("mousedown", "td", function(event) {
  event.preventDefault();
  let color = $("#colorPicker").val();
  $(this).css("background-color", color);
  dragMouse = true;
});

pixelCanvas.on("mousemove", "td", function() {
  if (dragMouse) {
    let color = $("#colorPicker").val();
    $(this).css("background-color", color);
  }
});

//stops drawing when mouse is up
pixelCanvas.mouseup(function() {
  dragMouse = false;
});

//stops the dragging option when the mouse leaves canvas
pixelCanvas.mouseleave(function() {
  dragMouse = false;
});

//resets the page
$("#reset").on("click", function resetGrid() {
  $("#pixel_canvas").empty();
});

//prevents right click default event on canvas
$("#pixel_canvas").contextmenu(function(event) {
  event.preventDefault();
});

//adds animation to the title
$("h1").mouseover(function(event) {
  $("h1").animate({ width: "350px" }, 3000);
});

//after animation is executed, when the title is clicked it is replaced with another one and there's no animation on the new title
$("h1").click(function(event) {
  $("h1").replaceWith(function() {
    return "<h1>Let's draw folks!</h1>";
  });
  $("h1").off("click", "mouseover");
});

