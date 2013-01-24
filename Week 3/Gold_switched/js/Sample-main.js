

$('#additemform').bind('pageinit', function() {
    var aiform = $('#additemform');
    aiform.validate();
});



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
			item.states			= ["State:", $('state').value];
			item.zip			= [ "Zip:", $('zip').value];
			item.occasions		= ["Occasion:", $('occasion').value];
			item.date			= ["Date:", $('date').value];
			item.sex			= ["Sex:", sexValue];
			item.spend			= ["Spend:", $('Maxspend').value];
			item.comments		= ["Comments:", $('comments').value];				
		//Save data into local storage. Use stringify to convert objects into strings.
		localStorage.setItem(id, JSON.stringify(item));		
		alert("The Special Occasion is saved!");		
	}

function getData(){
		if(localStorage.length === 0){
			alert("There is no data in local storage so default data was added.");
			autoFillData();
		}	
	//Write data from local storage to the browser		
	var makeDiv = document.createElement('div');
	makeDiv.setAttribute("id", "items");
	var makeList = document.createElement('ul');
	makeDiv.appendChild(makeList);
	document.body.appendChild(makeDiv);
	$('items').style.display = "block";		
	for(var i=0, len=localStorage.length; i<len; i++){
		var makeLi = document.createElement('li');
		var linksLi = document.createElement('li');
		makeList.appendChild(makeLi);
		var key = localStorage.key(i);
		var value = localStorage.getItem(key);		
		//Convert the string in local storage back into an object using JSON.parse method
		var obj =JSON.parse(value);	
		var makeSubList = document.createElement('ul');
		makeLi.appendChild(makeSubList);
		getImage(obj.occasions[1], makeSubList);
		for(var n in obj){
			var makeSubLi = document.createElement('li');
			makeSubList.appendChild(makeSubLi);
			var optSubText = obj[n][0]+" "+obj[n][1];
			makeSubLi.innerHTML = optSubText;
			makeSubList.appendChild(linksLi);
			}
			makeItemLinks(localStorage.key(i), linksLi);//Create edit and delete links for each list item in local storage
		}
	}


//Reset link to clear page		
Reset = function() {
    var clearpage = $('#additem')[0].reset();
};


	

	

