/*

*/
//(function()
//{

var classColors = ["gameCellRed", "gameCellGreen", "gameCellBlue","gameCellYellow"];

var numColors = 4;
var numRows = 10;
var numColumns = 10;
var cells = [];

var adjCells = {};

$( document ).ready(function() 
{
	buildTable();
	init();

	$("#newGame").click(function() 
	{
		$("#gTable").empty();
		
		cells = [];
		
		buildTable();
		init();
	});
	
	
});

function init()
{
	$("#gTable td").hover(function() 
	{
		var id = $(this).attr("id");
		adjCells = {};
		adjCells["Count"] = 0;
		
		var numId = parseInt(id)
		var row = parseInt(numId/10);
		var col = parseInt(numId%10);

		selectAdj(row, col);
		for(var cell in adjCells)
		{
			if(cell == "Count")
				continue;
		
			$("#" + cell).addClass("rotate");						
		}
	
	}, function ()
	{
		var id = $(this).attr("id");
		adjCells = {};
		adjCells["Count"] = 0;
		
		var numId = parseInt(id)
		var row = parseInt(numId/10);
		var col = parseInt(numId%10);

		selectAdj(row, col);
		
		for(var cell in adjCells)
		{
			if(cell == "Count")
				continue;
		
			$("#" + cell).removeClass("rotate");
						
		}
		
	});	
}

function selectAdj(row, col)
{
	var id = row + "" + col;
	
	if(adjCells[id] == true)
		return;	
		
	var idColor = cells[row][col];
	
	adjCells[id] = true;
	adjCells["Count"] +=1;
			
	// North
	if (row > 0) {
		if (cells[row-1][col] == idColor) {	
			selectAdj((row-1), col );
		}
	}
	// South
	if (row < numRows-1) {
		if (cells[row+1][col] == idColor) {
			selectAdj( (row+1), col );
		}
	}
	// East
	if (col < numColumns-1) {
		if (cells[row][col+1] == idColor) {
			selectAdj( row, (col+1) );
		}
	}
	// West
	if (col > 0) {
		if (cells[row][col-1] == idColor) {
			selectAdj( row, (col-1) );
		}
	}
}


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

function updateTable()
{
	for(x=0; x< numRows; x++)
	{
		for(y = 0; y < numColumns; y++)
		{
			//$("#" + x + "" y).addClass, classColors[cell[x][y]]);
		}
	
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
	id = $(this).attr("id");
	adjCells = {};
	adjCells["Count"] = 0;
		
	var numId = parseInt(id)
	var row = parseInt(numId/10);
	var col = parseInt(numId%10);

	selectAdj(row, col);
	
	if(adjCells["Count"] >= 3)
	{
		for(var cell in adjCells)
		{
			if(cell == "Count")
				continue;
			
			var numId = parseInt(id);
			var row = parseInt(numId/10);
			var col = parseInt(numId%10);
		
			$("#" + cell).removeClass(classColors[cells[row][col]]);
			
			
			
			//cells[row].splice(col, 1);
			//cells[row].push(Math.floor(Math.random() * numColors));
			
		}
	}
	
}


//})();

