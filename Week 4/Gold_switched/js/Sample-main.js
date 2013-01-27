
 $('#home').on('pageinit', function(){
	//code needed for home page goes here
});	
		
$('#additem').on('pageinit', function(){
	
		var aiform = $('#additemform'),
			aierrorslink = $('#aierrorslink')
		;
		
		 aiform.validate ({
			invalidHandler: function(form, validator) {
				aierrorslink.click();
				var html ='';
				for(var key in validator.submitted){
					var label =	$('label[for^="'+ key +'"]').not('[generated]');
					var legend = label.closest('fieldset').find('.ui-controlgroup-label');	
					var fieldName = legend.length ? legend.text() : label.text();
					html += '<li>' + fieldName +'</li>';
				};
				$("#additemerrors ul").html(html);
			},
			submitHandler: function(){
				var data = aiform.serializeArray();
				storeData(data);
		}
	});

});

	
//Find value of selected radio button
	function getSelectedRadio(){
		var radios = $("#sex");
		for(var i=0; i<radios.length; i++){
			if(radios[i].checked){
				sexValue = radios[i].value;
			}
		}
}

var storeData = function (key){
		//If there is no key, generate a new key for the brand new item
		if(!key){
		var id 				= Math.floor(Math.random()*100000001);	
		}else{
			//Set the id to the existing key of the item we are editing so it replaces the existing data and doesn't create new data.
			//This key is the same key that has been passed from the editSubmit event handler.
			//to the validate function and then passed here to the saveData function.
			id = key;
		}

		//Find value of radio button
		getSelectedRadio();

		//Gather form field values and store in an object
		//Object properties contain an array with the form label and input value
		var item 				= {};
			item.fname			= ["First Name:", $('#fname').value];
			item.lname			= [ "Last Name:", $('#lname').value];
			item.email			= [ "Email:", $('#email').value];
			item.telephone		= [ "Telephone:", $('#telephone').value];
			item.address		= [ "Address:", $('#address').value];
			item.city			= ["City:" , $('#city').value];
			item.state			= ["State:", $('#state').value];
			item.zip			= [ "Zip:", $('#zip').value];
			item.occasion		= ["Occasion:", $('#occasion').value];
			item.date			= ["Date:", $('#date').value];
			item.sex			= ["Sex:", sexValue];
			item.spend			= ["Spend:", $('#Maxspend').value];
			item.comments		= ["Comments:", $('#comments').value];				
		//Save data into local storage. Use stringify to convert objects into strings.
		localStorage.setItem(id, JSON.stringify(item));		
		alert("The Special Occasion is saved!");		
	};


//Reset link to clear page		
Reset = function() {
    var clearpage = $('#additem')[0].reset();
};

	

	

