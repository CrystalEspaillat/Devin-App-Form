$(document).ready(() => {

  //On submit 
  $("form").parsley().on("form:submit", () => {

  // $(".submit").on("click", (event) => {

    // prevent page from refreshing
    event.preventDefault();

    // SHow alerts when inputs are wrong
    $(".alert").show();

    // Collect form values
    let firstName = $("#first-name").val().trim();
    let lastName = $("#last-name").val().trim();
    let email = $("#email").val().trim();
    let plan =  $('input[name="plan"]:checked').val();
    let struggle = $('textarea#struggle').val();

    // Test
      console.log("name is: " + firstName + " " + lastName);
      console.log("email is: " + email);
      console.log("plan is: " + plan);
      console.log("struggle is: " + struggle);

      let newApplication = {
          firstname: firstName,
          lastname: lastName,
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