$(document).ready(function(){

	$("#selectAll").click(function(){

		var checkboxes = document.querySelectorAll('.checkbox');

		if(this.checked)
			checkboxes.forEach(function(checkbox) {
				checkbox.checked = true;
			});
		else
			checkboxes.forEach(function(checkbox) {
				checkbox.checked = false;
			});

	});
});
