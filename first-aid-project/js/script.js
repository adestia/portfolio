$(document).ready(function() {

    var currentUser = "";

    // update name in website if there is a cookie stored for the users name
    if (getCookie("username") != null){
        currentUser = " " + getCookie("username");
        $(".name").html(currentUser).removeClass("hidden");
    } 

    /* IF THERE IS JAVASCRIPT REMOVE DEFAULTS */
    $(".jsavail").removeClass("hidden");
    $(".jsnotavail").css("display", "none");
    $("#tsunade-speech").html("Keeping a first aid kit with you will help you feel prepared if someone around you gets hurt. I like to keep a couple of things handy at all times. Check out my first aid kit below by clicking to open it!")


    // redirects the user to a form input page if they have JS - regularly links to topic selection page
    $("#enter").attr("href", "welcome.html")

    // actions to be taken if submit button pressed
    // storing the users name for use within the website

    $("#name-form").submit(function(event) {

        // set username
        userName = $("#form-nickname").val();

        if (userName == "") {
            // no name entered - indicate to user to enter a name
            $("#form-nickname").addClass("empty").attr("placeholder", "Please enter your name");
        } else {
            // name entered - update name to be shown on site
            $("#say-hi").removeClass("hidden");
            
            document.cookie = "username=" + userName + ";";
            $(".name").html(" " + getCookie("username"));

            // clear form if user goes back
            $("#form-nickname").val("");

            // hide the form and intro text
            $("#ask-name").hide();
            $("#name-form").hide();

        }
        
        event.preventDefault();
    });

    // indicate user has edited the name box after error
    $("#form-nickname").keydown(function() {
        $("#form-nickname").removeClass("empty");
    });


    // opening first aid kit
    $("#first-aid-kit-image").click(function(event) {
        $(this).addClass("hidden");
        $("#first-aid-kit").css("display", "initial");
        event.preventDefault();
    });

    // first aid kit: pop up box

    // if user clicks close, close description
    $("#close").click(function(event){
        $("#description-box").css("display", "none");
        event.preventDefault();
    });

    //clicking an item in the first aid kit shows a pop up box
    $(".kit-item").parent().attr("href", "").click(function(event) {

        $("#description-box").css("display", "block");

        // get id of the current kit item clicked
        var kitItemID = $(this).find("figure").attr("id");

        $(function(){

            // use id to get matching description
            if (kitItemID == "item-one"){
                $('#first-aid-kit-desc').html("<h2>Bandage Wrap / Gauze</h2><p>Bandage wrap is used to cover a large area. For example, you would use bandage wrap to create a sling for a broken arm, or to cover a large cut. A lot of Medical Ninja refer to bandage wrap as gauze, but don't worry they mean the same thing!</p>");

            } else if (kitItemID == "item-two"){
                $('#first-aid-kit-desc').html("<h2>Bandaids</h2><p>Bandaids are a staple in every first aid kit. They are best used for little cuts, blisters or scars, like those from a splinter. They make sure that the injury is protected from more harm! Anyone can use a bandaid, just peel off the back covering and stick it onto the skin, making sure the non-sticky part cover the wound. Make sure to replace bandaids if they get too old and lose their stickiness!</p>");

            } else if (kitItemID == "item-three"){
                $('#first-aid-kit-desc').html("<h2>Gloves</h2><p>As a Medical Ninja, we must always make sure we keep our hands clean to keep us, and the patient safe. Remember, dirt and germs going into injuries can cause an infection. Gloves are perfect for one-time use! If you don't have gloves with you, make sure you keep some soap and water or hand sanitizer to make sure your hands are clean.</p>");

            } else if (kitItemID == "item-four"){
                $('#first-aid-kit-desc').html("<h2>Tweezers</h2><p>Not only are tweezers helpful when plucking out hairs, they can also be used for removing bee stings and splinters! If a window is broken and a small piece of glass gets stuck in your skin, our hands would be too big to grab onto the glass. It also very dangerous, as we can get hurt too! I can always rely on my tweezers save the day.</p>");

            } else if (kitItemID == "item-five"){
                $('#first-aid-kit-desc').html("<h2>Scissors</h2><p>When keeping bandage wrap in our first aid kit, we need to also bring scissors! This is because we dont want to waste the bandage wrap when the injury is already covered. Scissors can also come in handy when you need to get to an injury, but the persons clothing is in the way.</p>");

            }
        });

        event.preventDefault();
    });


    // test your knowledge: first aid kit page
    $("#tweezers").click(function(event) {
        $("#tweezers:hover").css("filter", "drop-shadow(0 0 4mm green)");
        $("#tweezers-chosen").removeClass("hidden");

        event.preventDefault();

    });

    $("#gauze").click(function(event) {
        $("#gauze:hover").css("filter", "drop-shadow(0 0 4mm red)");
        $("#gauze-chosen").removeClass("hidden");

        event.preventDefault();

    });

    $("#bandaid").click(function(event) {
        $("#bandaid:hover").css("filter", "drop-shadow(0 0 4mm green)");
        $("#bandaid-chosen").removeClass("hidden");

        event.preventDefault();

    });
    
    // bandage wrapping quiz
    $("#bandage-quiz").submit(function(event) {

        // get the users answers
        var questionOne = $("input[name=bandage-type]:checked").val();
        var questionTwo = $("input[name=direction-wrap]:checked").val();
        var questionThree = $("input[name=tof]:checked").val();


        // if any not answered, highlight question
        if (questionOne == undefined || questionOne == ""){
            $("label[for=bandage-type]").addClass("empty");
        }

        if (questionTwo == undefined || questionTwo == ""){
            $("label[for=direction-wrap]").addClass("empty");
        }

        if (questionThree == undefined || questionThree == ""){
            $("label[for=tof]").addClass("empty");
        }


        // all entered so validate answers

        if (questionOne == "roller"){
            result(1, 2, true);
        } else {
            result(1, 2, false);
        }

        if (questionTwo == "all"){
            result(3, 4, true);
        } else {
            result(3, 4, false);  
        }

        if (questionThree == "false"){
            result(5, 6, true);
        } else {
            result(5, 6, false);  
        }

        // check answers are correct
        if (questionOne == "roller" && questionTwo == "all" && questionThree == "false"){
            
            $("#submit-answers").hide();
            $("#attempt").html("Congratulations" + currentUser + ", you're a pro!" + " Luckily no one needs bandage <br> wrapping, but if they did you'd be our first pick to help.").removeClass("hidden");
            $("#attempt-charac").removeClass("hidden");

        } else {
            $("#attempt").html("Try again. You can do it!").removeClass("hidden");

        }

        event.preventDefault();
       
    });


    // indicate user has edited the answer box after incorrect answer
    $("input[name=bandage-type]").click(function(event) {
        removeHighlight(1, 2, "bandage-type")
        $("#attempt").addClass("hidden");
    });

    $("input[name=direction-wrap]").click(function(event) {
        removeHighlight(3, 4, "direction-wrap")
        $("#attempt").addClass("hidden");
    });

    $("input[name=tof]").click(function(event) {
        removeHighlight(5, 6, "tof")
        $("#attempt").addClass("hidden");
    });


    // change image when applying pressure via clicks
    var click = 0;
    $("#pressure").click(function(event) {
        click++;
        if (click == 1){
            $(this).attr("src", "images/finger-red-smaller.png");
            $(this).attr("alt", "Irritated finger.");

        } else if (click == 2){
            $(this).attr("src", "images/finger-red-smallest.png");
            $(this).attr("alt", "Slightly irritated finger.");
            $("#yay").removeClass("hidden");
        }

        event.preventDefault();

    });

}); 

// Functions

/*
 * Remove the incorrect box highlight from the question label and the WRONG result
 */
function removeHighlight(n1, n2, name){
    $("label[for=" + name + "]").removeClass("empty");
    $("#bandage-quiz p:nth-of-type(" + n1 + ").correct").addClass("hidden");
    $("#bandage-quiz p:nth-of-type(" + n2 + ").wrong").addClass("hidden");
}

/*
 * Show the user if their answer is correct of not by showing a p element
 */
function result(n1, n2, correct){  

    if (correct) {
        $("#bandage-quiz p:nth-of-type(" + n1 +").correct").removeClass("hidden");
        $("#bandage-quiz p:nth-of-type(" + n2 +").wrong").addClass("hidden");
    } else {
        $("#bandage-quiz p:nth-of-type(" + n1 +").correct").addClass("hidden");
        $("#bandage-quiz p:nth-of-type(" + n2 +").wrong").removeClass("hidden");
    }
    
}

/*
 * Return the value stored in the cookie
 */
function getCookie(cookieName){

    var search = "; " + cookieName + "=";
    var cookieString = document.cookie;
    var singleCookie = cookieString.split("; ");

    for (i = 0; i < singleCookie.length; i++){

        var cookieNameAndValue = singleCookie[i].split("=");
        var singleCookieName = cookieNameAndValue[0];
        var cookieValue = cookieNameAndValue[1];

        if (singleCookieName == cookieName){
            return cookieValue;
        }
    }
}


/*
 * Dragging an object into a div
 */

 function dragObject(event) {

     // get the id of the object that is being dropped
     event.dataTransfer.setData("text", event.target.id);
 }

/*
 * Mouseleave when object above a div
 */
 function dropObject(event) {
     event.preventDefault();
     var objectID = event.dataTransfer.getData("text");

     // putting the object with correct id into the div
     event.target.appendChild(document.getElementById(objectID));

    if (objectID == "stinger-to-drag") {
        $("#good").removeClass("hidden");

    } else if (objectID == "water-droplet"){
        $("#nice").removeClass("hidden");

    } else if (objectID == "ice-cubes"){
        $("#awesome").removeClass("hidden");
    
 }
}
 
/*
 * Signify that the mouse has returned from a click
 */
 function endDrop(event) {
     event.preventDefault();

 }
