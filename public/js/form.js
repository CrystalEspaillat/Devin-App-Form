$(document).ready(() => {

let marketingPref = "yes";

// Show marketing message change on check.
$("#marketing").change(() => {
  if ($('input[name="marketing"]:checked').length > 0) {

    $("#marketing-msg").text("Keep me updated on promos.");
    marketingPref = "yes";
    console.log(marketingPref);

  } else {
    $("#marketing-msg").text("I don't want good deals.");
    marketingPref = "no";
    console.log(marketingPref);
  }
});

  //On submit 
  $("form").parsley().on("form:submit", () => {

  // $(".submit").on("click", (event) => {

    // prevent page from refreshing
    event.preventDefault();

    // Show alerts when inputs are wrong
    $(".alert").show();

    // Collect form values
    let firstName = $("#first-name").val().trim();
    let lastName = $("#last-name").val().trim();
    let email = $("#email").val().trim();
    let plan =  $("input[name='plan']:checked").val();
    let struggle = $("textarea#struggle").val();
    let marketing = marketingPref;

    // Test
      console.log("name is: " + firstName + " " + lastName);
      console.log("email is: " + email);
      console.log("plan is: " + plan);
      console.log("marketing: " + marketing);
      console.log("struggle is: " + struggle);

      let newApplication = {
          firstname: firstName,
          lastname: lastName,
          email: email,
          plan: plan,
          marketing: marketing,
          struggle: struggle
      }

      $.post("/send", newApplication, data => {
        console.log(newApplication);
        window.location.replace('../thanks');
      }); 
      
  });

});