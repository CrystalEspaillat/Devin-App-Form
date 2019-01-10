$(document).ready(function() {

  //On submit 
  $("form").parsley().on("form:submit", () => {

  // $(".submit").on("click", (event) => {

    // prevent page from refreshing
    event.preventDefault();

    // SHow alerts when inputs are wrong
    $(".alert").show();

    // Collect form values
    let name = $("#full-name").val().trim();
    let email = $("#email").val().trim();
    let plan =  $('input[name="plan"]:checked').val();
    let struggle = $('textarea#struggle').val();

    // Test
      console.log("name is: " + name);
      console.log("email is: " + email);
      console.log("plan is: " + plan);
      console.log("struggle is: " + struggle);

      let newApplication = {
          fullname: name,
          email: email,
          plan: plan,
          struggle: struggle
      }

      $.post("/send", newApplication, data => {
        console.log(newApplication);
        window.location.replace('../thanks');
      }); 
      
  });

});