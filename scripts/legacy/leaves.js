
// Get references to objects in the doc
var leftOutlines = [ document.getElementById("_left") ];    // List of all paths on the left side
var rightOutlines = [ document.getElementById("_right") ];  // List of all paths on the right side (simply mirrors the left side)


var leftParams = 0;




var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  output.innerHTML = this.value;
  leftParams = this.value;
  UpdateSides();
}



function UpdateSides() {
  var leftSide = "M "+leftParams+" 250 Q20 110 ,250 60"

  leftOutline.setAttribute('d', leftSide);
}




function downloadSVG() {
    const svg = document.getElementById('svg_leaf').outerHTML;

    var content = svg.toString();

    // Sadly I didn't find a way to easily convert the leaf into a downloadable format without an external library, so I hardcoded it. ¯\_(ツ)_/¯
    content = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n" +
        "<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" viewBox=\"0 0 512 512\">\n" +
        "\t<title>Leaf</title>\n" +
        "\t<a>\n" +
        content + "\n" +
        "\t</a>" +
        "</svg>";

    const blob = new Blob([content]);
    const element = document.createElement("a");
    element.download = "new leaf.svg";
    element.href = window.URL.createObjectURL(blob);
    element.click();
    element.remove();
}

