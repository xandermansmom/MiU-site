
$('#home').on('pageinit', function(){

function validate(){
        var parseaiForm = function(data){
            storeaddItem(data);
        };
        $('#additemform').on('pageinit', function () {
            var adForm = $("#createItemForm");
            adForm.validate({
                invalidHandler: function(form, validator){},
                submitHandler: function(){
                    var data = adForm.serializeArray();
                    parseaiForm(data);
                }
            });
        });
    }

function saveData(key){
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
			item.fname			= ["First Name:", $('fname').value];
			item.lname			= [ "Last Name:", $('lname').value];
			item.email			= [ "Email:", $('email').value];
			item.telephone		= [ "Telephone:", $('telephone').value];
			item.address		= [ "Address:", $('address').value];
			item.city			= ["City:" , $('city').value];
			item.states			= ["State:", $('states').value];
			item.zip			= [ "Zip:", $('zip').value];
			item.occasions		= ["Occasion:", $('occasions').value];
			item.date			= ["Date:", $('date').value];
			item.sex			= ["Sex:", sexValue];
			item.spend			= ["Spend:", $('spend').value];
			item.comments		= ["Comments:", $('comments').value];				
		//Save data into local storage. Use stringify to convert objects into strings.
		localStorage.setItem(id, JSON.stringify(item));		
		alert("The Special Occasion is saved!");		
	}


//Reset link to clear page		
	$('#additem')[0].reset();
		
});
