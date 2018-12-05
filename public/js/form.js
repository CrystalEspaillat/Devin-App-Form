//Switcher function for rating:
$(".rb-tab").click(() => {
  //Spot switcher:
  $(this).parent().find(".rb-tab").removeClass("rb-tab-active");
  $(this).addClass("rb-tab-active");
});

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
  let plan = $("#plan").val();
  let age = $('input[name="age"]:checked').val();
  let exercise =  $('input[name="exercise"]:checked').val();
  let struggle = $('textarea#struggle').val();
  let rating= 0;
  for (i=1; i<=$(".rb").length; i++) {
      let rbValue = $(".rb-tab-active").attr("data-value");
      rating = parseInt(rbValue);
  };

  // Test
    console.log("name is: " + name);
    console.log("email is: " + email);
    console.log("plan is: " + plan);
    console.log("age is: " + age);
    console.log("exercise is: " + exercise);
    console.log("struggle is: " + struggle);
    console.log("rating is: " + rating);

    let newApplication = {
        fullname: name,
        email: email,
        plan: plan,
        age: age,
        exercise: exercise,
        struggle: struggle,
        rating: rating
    }

    $.post("/send", newApplication, data => {
      console.log(newApplication);
      
    }); 

    // return false; // avoid submitting when form isnt correct

});