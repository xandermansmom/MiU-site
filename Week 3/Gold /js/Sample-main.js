var parseaiForm = function(data){
};

$('#home').on('pageinit', function(){
	
$('#additem').on('pageinit', function(){
	
var aiform = $('#additemform'),
		aierrorslink =$('#aierrorslink')
		;
	
	aiform.validate({
		invalidHandler: function(form, validator){
			aierrorslink.click();
			var html = '';
			for (var key in validator.submitted) {
					var label =	$('label[for^="' + key + '"]').not('[generated]');
					var legend = label.closest('fieldset').find('.ui-controlgroup-label');
					var fieldName = legend.length ? legend.text() : label.text();
					html += '<li>'+ fieldName +'</li>';
				};
				$("#additemerrors ul").html(html);
		},
		submitHandler: function(){
			var data=aiform.serializeArray();
			parseaiForm(data);
		}
	});
	
});


//Reset link to clear page		
	$('#additem')[0].reset();
		
});
