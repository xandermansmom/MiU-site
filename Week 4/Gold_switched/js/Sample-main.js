
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
				storeData(this.key);
		}
	});
});


//Auto Populate Local Storage
	function autoFillData(){
		//The actual JSON OBJECT required for this to work is coming from our json.js file which is loaded from our HTML page.
		//Store the JSON OBJECT in local storage.
		for(var n in json){
			var id = Math.floor(Math.random()*100000001);	
				localStorage.setItem(id, JSON.stringify(json[n]));
		}	
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
	

var storeData = function(key){
		//If there is no key, generate a new key for the brand new item
		if(!key){
		var id 				= Math.floor(Math.random()*100000001);	
		}else{
			//Set the id to the existing key of the item we are editing so it replaces the existing data and doesn't create new data.
			//This key is the same key that has been passed from the editSubmit event handler.
			//to the validate function and then passed here to the saveData function.
			id = key;
		}
		
		//Gather form field values and store in an object
		//Object properties contain an array with the form label and input value
		var item 				= {};
			item.fname			= ["First Name", $('#fname').val()];
			item.lname			= [ "Last Name", $('#lname').val()];
			item.email			= [ "Email", $('#email').val()];
			item.telephone		= [ "Telephone", $('#telephone').val()];
			item.address		= [ "Address", $('#address').val()];
			item.city			= ["City", $('#city').val()];
			item.state			= ["State", $('#state').val()];
			item.zip			= [ "Zip", $('#zip').val()];
			item.occasion		= ["Occasion", $('#occasion').val()];
			item.date			= ["Date", $('#date').val()];
			item.radio			= ["Sex", $("input:radio[name=Sex]:checked").val()];
			item.spend			= ["Spend", $('#maxSpend').val()];
			item.comments		= ["Comments", $('#comments').val()];				
		//Save data into local storage. Use stringify to convert objects into strings.
		localStorage.setItem(id, JSON.stringify(item));		
		alert("The Special Occasion is saved!");		
	};

	
	
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

function clearLocal(){
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
	
	
	//Reset link to clear page		
	Reset = function() {
    var clearpage = $('#additem')[0].reset();
};



	

	

