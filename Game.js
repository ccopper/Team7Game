/*

*/
(function()
{

$( document ).ready(function() 
{
	buildTable();
	
	
	
});

function buildTable()
{
	var tbl = $("#gTable");

	for(x=0; x< 10; x++)
	{
		tbl.append("<tr />");
		for(y = 0; y < 10; y++)
		{
			var cell = $("<td>",
			{
				"class": "gameCell",
				/*"click": cellClickHandler,*/
				"id": "" + x + "" + y
			});
			tbl.find("tr:last").append(cell);
		}
	
	}
}

})();