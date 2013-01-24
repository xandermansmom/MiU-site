	
function validate(){
  var add = function(data){
  storeData(data);
  };
 $('#addItem').on('pageinit', function(){

  var aiform = $("#additemform");
  aiform.validate({
  invalidHandler: function(form, validator){},
  submitHandler: function(){

  var data = aiform.serializeArray();
  parseaiform(data);
  }
  })
  });
  }
  
  //Reset link to clear page		
	$('#additem')[0].reset();

		
