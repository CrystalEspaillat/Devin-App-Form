// Collect form values
let name = $("#full-name").val().trim();
let email = $("#email").val().trim();
let plan = $("#plan").val();

//Save the radio values
let age = $('input[name="age"]:checked').val();
let exercise =  $('input[name="exercise"]:checked').val();

// Save the textarea value
let struggle = $('textarea#struggle').val();

// Save rating radio value:
let rating= 0;
for (i=1; i<=$(".rb").length; i++) {
    let rbValue = $(".rb-tab-active").attr("data-value");
    rating = parseInt(rbValue);
  };


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

  // Test
    // console.log("their name is: " + name);
    // console.log("their email is: " + email);
    // console.log("their plan is: " + plan);
    // console.log("their age is: " + age);
    // console.log("their exercise is: " + exercise);
    // console.log("their struggle is: " + struggle);
    // console.log("their rating is: " + rating);

    let newApplication = {
        fullname: name,
        email: email,
        plan: plan,
        age: age,
        exercise: exercise,
        struggle: struggle,
        rating: rating
    }

    $.post("/send", newApplication => {
      console.log(newApplication);
      
    }); 

    // return false; // avoid submitting when form isnt correct

});