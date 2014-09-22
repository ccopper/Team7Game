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
			var color = Math.floor(Math.random() * numColors);
			cells[x][y] = [color];

			switch (color) {
				case 0:
					classColor = "Red";
					break;
				case 1:
					classColor = "Green";
					break;
				case 2:
					classColor = "Blue";
					break;
				case 3:
					classColor = "Yellow";
					break;
			}

			var className = "gameCell" + classColor;

			var cell = $("<td>",
			{
				"class": className,
				"click": cellClickHandler,
				"id": "" + x + "" + y,
				"style": "back"
			});
			tbl.find("tr:last").append(cell);
			
		}
	
	}

	printArray(cells);
}

function colorTable()
{

}

})();

var numColors = 4;
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

function printArray(arr)
{
	for (x = 0; x < arr[0].length; x++) {
		var output = "";
		for (y = 0; y < arr.length; y++) {
			output += ", " + arr[x][y];
		}
		console.log(output);
	}
}

function cellClickHandler(id)
{

	console.log(id);

	if (typeof(id) != "string") {
		console.log("not a string");
		console.log($(this).attr("id"));
		id = $(this).attr("id");
	}


	console.log("id[0]: " + id[0]);
	console.log("id[1]: " + id[1]);
	console.log(typeof(id[0]));
	idColor = cells[id[0], id[1]];

	// North
	if (id[0] > 0) {
		if (cells[id[0]-1][id[1]] == idColor) {
			cellClickHandler( (id[0]-1) + "" + id[1] );
		}
	}
	// South
	if (id[0] < numRows-1) {
		if (cells[id[0]+1][id[1]] == idColor) {
			cellClickHandler( (id[0]+1) + "" + id[1] );
		}
	}
	// East
	if (id[1] < numColumns-1) {
		if (cells[id[0]][id[1]+1] == idColor) {
			cellClickHandler( id[0] + "" + (id[1]+1) );
		}
	}
	// West
	if (id[1] > 0) {
		if (cells[id[0]][id[1]-1] == idColor) {
			cellClickHandler( id[0] + "" + (id[1]-1) );
		}
	}
}