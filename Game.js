/*

*/
(function()
{

$( document ).ready(function() 
{
	buildTable();
	colorTable();
	
	
});

function buildTable()
{
	createArray(numRows, numColumns);
	var tbl = $("#gTable");

	for(x=0; x< numRows; x++)
	{
		tbl.append("<tr />");
		for(y = 0; y < numColumns; y++)
		{
			var color = Math.floor(Math.random() * numGradients) * 2;
			// var color2 = color1 + 1;
			// console.log("(" + x + "," + y + ")");
			// console.log(color + ": " + colors[color]);
			// console.log(color2 + ": " + colors[color2]);
			// cells[x][y] = [colors[color], colors[color2]];

			switch (color) {
				case 0:
					classColor = "Red";
					break;
				case 2:
					classColor = "Green";
					break;
				case 4:
					classColor = "Blue";
					break;
				case 6:
					classColor = "Yellow";
					break;
			}

			var className = "gameCell" + classColor;

			var cell = $("<td>",
			{
				"class": className,
				/*"click": cellClickHandler,*/
				"id": "" + x + "" + y,
				"style": "back"
			});
			tbl.find("tr:last").append(cell);
			
		}
	
	}
}

function colorTable()
{

}

})();

var colors = [
				"#FF0000", "#FF8080", // Red
				"#33CC33", "#70DB70", // Green
				"#3333FF", "#8585FF", // Blue
				"#FFCC00", "#FFE066"]; // Yellow

var numGradients = colors.length/2;
var numRows = 10;
var numColumns = 10;
var cells = [];
function createArray(r, c)
{
	for (x = 0; x < r; x++) {
		var row = [];
		for (y = 0; c < c; y++) {
			var cell = [];
			row.push(cell);
		}
		cells.push(row);
	}
}	