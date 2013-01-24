	
function validate(){
  var add = function(data){
  storeData(data);
  };
  $('#additem').on('pageinit', function(){
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