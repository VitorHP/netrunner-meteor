Template.registerHelper("debug", function(optionalValue) { 
  console.log("Current Context");
  console.log("====================");
  console.log(this);

  if (optionalValue) {
    console.log("Value"); 
    console.log("===================="); 
    console.log(optionalValue); 
  } 
});

Helper = {}

Helper.log = function (data) {
  console.log("#########################")
  console.log(data)
  console.log("#########################")
}

