/*

*/
//(function()
//{

var classColors = ["gameCellRed", "gameCellGreen", "gameCellBlue","gameCellYellow", "gameCellPurple"];

var numColors = 5;
var numRows = 10;
var numColumns = 10;
var cells = [];
var
 adjCells = {};
var score = 0;

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
			});
			tbl.find("tr:last").append(cell);
			
		}
	
	}

	printArray(cells);
}

function updateTable()
{
	var row = 0;
	var col = 0
	
	$("#gTable tr").each(function()
	{
		$(this).children("td").each(function()
		{
			$(this).attr("id", row + "" + col);

			col +=1;
		});
		col = 0;
		row+=1;
	});	
	init();
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
			
			$("#" + cell).fadeOut("slow", function()
			{
			
				var numId = parseInt($(this).attr("id"));
				var row = parseInt(numId/10);
				var col = parseInt(numId%10);
										
				cells[row].splice(col, 1);
				var newColor = Math.floor(Math.random() * numColors);
				cells[row].push(newColor);
			
				var newCell = $("<td>",
				{
					"class": classColors[newColor],
					"click": cellClickHandler,
					"style": "display: none"
				});		
				
				$(this).parent().append(newCell);			
				
				$(this).remove();
				updateTable();

				newCell.fadeIn("slow");

				
			});		
		}

		console.log("here");
		updateScore(adjCells["Count"]);
		
	}
	

}

function updateScore(numCells)
{

	console.log("in updateScore: score(" + score + ") + new points(" + numCells + ")");
	var scoreElement = $("#score");

	score = score + (Math.pow(numCells, 1.5)*10);

	scoreElement.text(Math.floor(score).toString());
}


//})();

