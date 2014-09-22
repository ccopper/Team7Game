/*

*/
//(function()
//{

var classColors = ["gameCellRed", "gameCellGreen", "gameCellBlue","gameCellYellow"];

var numColors = 4;
var numRows = 10;
var numColumns = 10;
var cells = [];

$( document ).ready(function() 
{
	buildTable();

});

function buildTable()
{
	cells = [];
	var tbl = $("#gTable");

	for(x=0; x< numRows; x++)
	{
		cells.push([]);
		tbl.append("<tr />");
		for(y = 0; y < numColumns; y++)
		{
			var color = Math.floor(Math.random() * numColors);
			cells[x][y] = color;

			var cell = $("<td>",
			{
				"class": classColors[color],
				"click": cellClickHandler,
				"id": "" + x + "" + y,
				"style": "back"
			});
			tbl.find("tr:last").append(cell);
			
		}
	
	}

	printArray(cells);
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

	if (typeof(id) != "string") 
	{
		console.log("not a string");
		console.log($(this).attr("id"));
		id = $(this).attr("id");
	}
	
	var id = parseInt(id)
	var row = parseInt(id/10);
	var col = parseInt(id%10);

	console.log("row: " + row);
	console.log("col: " + col);
	console.log(typeof(row));
	idColor = cells[row, col];
	
	// North
	if (row > 0) {
		if (cells[row-1][col] == idColor) {
			cellClickHandler( (row-1) + "" + col );
		}
	}
	// South
	if (row < numRows-1) {
		if (cells[row+1][col] == idColor) {
			cellClickHandler( (row+1) + "" + col );
		}
	}
	// East
	if (col < numColumns-1) {
		if (cells[row][col+1] == idColor) {
			cellClickHandler( row + "" + (col+1) );
		}
	}
	// West
	if (col > 0) {
		if (cells[row][col-1] == idColor) {
			cellClickHandler( row + "" + (col-1) );
		}
	}
}



//})();

