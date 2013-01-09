//	Michele Laramore
//	Activity 4
//	Visual Frameworks(VFW)
//	Mobile Development
//	Full Sail University

//Wait until the DOM is ready.
window.addEventListener("DOMContentLoaded", function(){

	//getElementByIdFunction
	function $(x){
		var theElement = document.getElementById(x);
		return theElement;
	}

	//Variable defaults 	

	var theStates = 			["--Which State?--", "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware",
								 "District of Columbia", "Florida", "Georgia", "Hawaii","Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", 
								 "Louisiana","Maine", "Maryland","Massachusetts","Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska",
								 "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma",
								 "Oregon","Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee","Texas", "Utah", "Vermont",
								 "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"],	
	    theOccasion = ["--Which Special Occasion?--", "Birthday", "Anniversary", "Graduation"],
		sexValue,
		errMsg = $('errors');


		listStates();
		listOccasions();


	//Dynamically create select field, create an array and populate select field with array
	 function listStates(){
		 var thisTag = document.getElementsByTagName("form"),
		 	selectLi = $('selectSt'),
			createSelect = document.createElement('select');
			createSelect.setAttribute("id", "states");
		for(var i=0, j=theStates.length; i<j; i++){
			var createOption = document.createElement('option');
			var optContent = theStates[i];
			createOption.setAttribute("value", optContent);
			createOption.innerHTML = optContent;
			createSelect.appendChild(createOption);
		}
		selectLi.appendChild(createSelect); 
	}

	function listOccasions(){
		var formTag = document.getElementsByTagName("form"),
			selectLi = $('selectOc'),
			makeSelect = document.createElement('select');
			makeSelect.setAttribute("id", "occasions");
		for(var i=0, j=theOccasion.length; i<j; i++){
			var makeOption = document.createElement('option');
			var optText = theOccasion[i];
			makeOption.setAttribute("value", optText);
			makeOption.innerHTML = optText;
			makeSelect.appendChild(makeOption);
		}
		selectLi.appendChild(makeSelect);
	}


	//Find value of selected radio button
	function getSelectedRadio(){
		var radios = document.forms[0].sex;
		for(var i=0; i<radios.length; i++){
			if(radios[i].checked){
				sexValue = radios[i].value;
			}
		}
}

	function toggleControls(n){
		//switch display from form to form data display page. Add link to addNew data so you can switch back to form.
		switch(n){
			case "on":
			if(localStorage.length === 0){
				alert("There is no data.");
			}
			//Write data from local storage to the browser.
				$('spOccForm').style.display = "none";
				$('clear').style.display = "inline";
				$('displayLink').style.display = "none";
				$('addNew').style.display = "inline";
				break;	
			case "off":
				$('spOccForm').style.display = "block";
				$('clear').style.display = "inline";
				$('displayLink').style.display = "inline";
				$('addNew').style.display = "none";	
				$('items').style.display = "none";		
				break;
			default:
				return false;
		}
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

	function getData(){
		toggleControls("on");
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

	//Get the image for the right category
	function getImage(catName, makeSubList){
		var imageLi = document.createElement('li');
		makeSubList.appendChild(imageLi);
		var newImg = document.createElement('img');
		var setSrc = newImg.setAttribute("src", "images/"+ catName +".png");
		imageLi.appendChild(newImg);
	}

	//Auto Populate Local Storage
	function autoFillData(){
		//The actual JSON OBJECT required for this to work is coming from our json.js file which is loaded from our HTML page.
		//Store the JSON OBJECT in local storage.
		for(var n in json){
			var id = Math.floor(Math.random()*100000001);	
				localStorage.setItem(id, JSON.stringify(json[n]));
		}	
	}

	//Make Item Links
	//Create the edit and delete links for each stored item when displayed

	function makeItemLinks(key, linksLi){
		//add edit single item link
		var editLink = document.createElement('a');
	    editLink.href ="#";
		editLink.key = key;
		var editText = "Edit Data";
		editLink.addEventListener("click", editItem);
		editLink.innerHTML = editText;
		linksLi.appendChild(editLink);

		//add break tag
		var breakTag = document.createElement('br');
		linksLi.appendChild(breakTag);


		//add delete single item link
		var deleteLink = document.createElement('a');
	    deleteLink.href = "#";
		deleteLink.key = key;
		var deleteText = "Delete Data";
		deleteLink.addEventListener("click", deleteItem);
		deleteLink.innerHTML = deleteText;
		linksLi.appendChild(deleteLink);

	}

	//Edit single item
	function editItem(){
		//grab data from item in local storage
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);

		//Show the form
		toggleControls("off");		

		//populate the form fields with current localStorage values.
		$('fname').value = item.fname[1];
		$('lname').value = item.lname[1];
		$('email').value = item.email[1];
		$('telephone').value = item.telephone[1];
		$('address').value = item.address[1];
		$('city').value = item.city[1];
		$('states').value = item.states[1];
		$('zip').value = item.zip[1];
		$('occasions').value = item.occasions[1];
		$('date').value = item.date[1];
		var radios = document.forms[0].sex;
		for(var i = 0; i<radios.length; i++){
			if (radios[i].value === "Male" && item.sex[1] == "Male"){
				radios[i].setAttribute("checked", "checked");
			}else if(radios[i].value === "Female" && item.sex[1] == "Female"){
				radios[i].setAttribute("checked", "checked");	
			}
		}
		$('spend').value = item.spend[1];
		$('comments').value = item.comments[1];		
		//Remove initial listener from the input 'save data' button.
		save.removeEventListener("click", saveData);
		//Change Submit Button value to Edit Button
		$('submit').value = "Edit Data";
		var editSubmit = $('submit'); 
		//Clear items in HTML cache
		items.innerHTML = ""; 
		//Save the key value established in this function as a property of the editSubmit event
		//so we can use that value when we save the data we edited
		editSubmit.addEventListener("click", validate);
		editSubmit.key = this.key;			
	}

	function deleteItem(){
		var ask = confirm("Are you sure you want to delete this record?");
		if(ask){
			localStorage.removeItem(this.key);
			alert("Record was deleted!");
			window.location.reload();
		}else{
			alert("Record was NOT deleted.");
		}
	}

	function clearData(){
		//clear data from local storage.
		if(localStorage.length === 0){
			alert("There is no data to clear.");
		}else{
			localStorage.clear();
			alert("All data is cleared.");
			window.location.reload;
			return false;
		}		
	}


	function validate(e){
		//Define the elements we want to check
		var getFname 		= $('fname');
		var getLname	 	= $('lname');
		var getEmail 		= $('email');
		var getTelephone 	= $('telephone');
		var getState        = $('states');
		var getZip   		= $('zip');
		var getOccasion     = $('occasions');
		

		//Reset Error Messages
		errMsg.innerHTML = "";
		getFname.style.border = "1px solid black";
		getLname.style.border = "1px solid black";
		getEmail.style.border ="1px solid black";
		getTelephone.style.border = "1px solid black";
		getState.style.border = "1px solid black";
		getZip.style.border = "1px solid blak";
		getOccasion.style.border = "1px solid black";
		
		//Get Error messages
		var messageAry = [];

		//First Name Validation
		if(getFname.value ===""){
			var fNameError = "Please enter a first name.";
			getFname.style.border = "1px solid red";
			messageAry.push(fNameError);			
		}

		//Last Name Validation
		if(getLname.value ===""){
			var lNameError = "Please enter a last name.";
			getLname.style.border = "1px solid red";
			messageAry.push(lNameError);			
		}

		//Email Validation
		var re = /^\w+([\.\-]?\w+)*@\w+([\.\-]?\w+)*(\.\w{2,3})$/;
		if(!(re.exec(getEmail.value))){
			var emailError = "Please enter a valid email address.";
			getEmail.style.border ="1px solid red";
			messageAry.push(emailError);
		}

		//Telephone Validation
		var phone = /^\d{3}-\d{3}-\d{4}$/;
		if(!(phone.exec(getTelephone.value))){
			var phoneError = "Please enter a valid telephone number.";
			getTelephone.style.border = "1px solid red";
			messageAry.push(phoneError);
		}

		//State Validation
		if(getState.value === "--Which State?--"){
			var stateError = "Please choose a state.";
			getState.style.border = "1px solid red";
			messageAry.push(stateError);	
		}	

		//Zip Code Validation
		var zip = /^\d{5}(?:[\-\s]\d{4})?$/;
		if(!(zip.exec(getZip.value))){
			var zipError = "Please enter a valid zip code.";
			getZip.style.border = "1px solid red";
			messageAry.push(zipError);
		}

		//Occasion Validation
		if(getOccasion.value === "--Which Special Occasion?--"){
			var occasionError = "Please choose an occasion.";
			getOccasion.style.border = "1px solid red";
			messageAry.push(occasionError);	
		}	


		//If there were errors, display them on the screen
		if(messageAry.length >=1){
			for(var i = 0, j=messageAry.length; i<j; i++){
				var txt = document.createElement('li');
				txt.innerHTML = messageAry[i];
				errMsg.appendChild(txt);			
		}	
		e.preventDefault();
		return false;				
	}else{
		//If all is good, save the data! Save the key value (which came from our editData function ).
		//This key value was passed through the editSubmit eventListener as a property.
		saveData(this.key);	
	}
}


//Set Link and Submit Click Events

		var displayLink = $('displayLink');
		displayLink.addEventListener("click", getData);
		var clearLink = $('clear');
		clearLink.addEventListener("click", clearData); 
		var save = $('submit');
		save.addEventListener("click", validate);
});
