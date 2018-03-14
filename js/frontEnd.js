// JavaScript Document


var modal = document.getElementById('myModal');
var confModal = document.getElementById('confModal');


// Get the button that opens the modal
var btn = $('.marketrCta');

var bClose = document.getElementsByClassName("closeButtonB")[0];

// When the user clicks the button, open the modal 

// When the user clicks on <span> (x), close the modal




// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}




const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


var pt = 'https://api.buzzsumo.com/search/influencers.json?'
var t = '&api_key=3gtlU0KPIQcOuF5P4mRh_temp';

var jsonp = '&callback=?';

var urlBs1;
var urlBs2;

var tofuDef = 'More to come in this description box...it will include information on each metric, as well as links for more reading, etc.';
var mofuDef = 'More to come in this description box...it will include information on each metric, as well as links for more reading, etc.';
var bofuDef = 'More to come in this description box...it will include information on each metric, as well as links for more reading, etc.';


$('.tofu > span > .tooltiptext').html(tofuDef)
$('.mofu > span > .tooltiptext').html(mofuDef)
$('.bofu > span > .tooltiptext').html(bofuDef)




//autocomplete
var influencerTopics = ["lifestyle",
                        "basketball",
                        "personal finance",
                        "education",
                        "sports",
                        "football",
                        "soccer",
                        "college",
                        "student",
                        "social",
                        "music",
                        "fitness",
                        "baseball",
                        "hockey",
                        "shoes",
                        "fashion",
                        "coffee",
                        "beverages",
                        "nightlife",
                        "travel",
                        "animals",
                        "adventure",
                        "finance",
                        "foodk",
                        "drink",
                        "skincare",
                        "cosmetics",
                        "arts",
                        "crafts",
                        "animals",
                        "pets",
                        "organic food",
                        "agriculture",
                        "farming",
                        "startups",
                        "entrepreneurship",
                        "comedy",
                        "personal development",
                        "business",
                        "marketing",
                        "content marketing",
                        "social media",
                        "cars",
                        "automobiles",
                        "trucks"
                        ];
/////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////influencer form validation//////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

function validateForm() {
  var x = $('#topic:last-child').val();
  if (x == "" && $('.keywords > input').length > 1) {
      alert("Delete all empty form fields before moving on.");
      return false;
  } else if (x == "" && $('.keywords > input').length == 1) {
      alert("Please fill out at least one keyword before moving on.");
      return false;
  }
}


function youCompleteMe () {
    $('.keywords > input').autocomplete({source: influencerTopics, change: function (event, ui) {
                                        if(!ui.item){
                                            alert("Please select on option from our list.")
                                            //http://api.jqueryui.com/autocomplete/#event-change -
                                            // The item selected from the menu, if any. Otherwise the property is null
                                            //so clear the item for force selection
                                            $("input").val("");
                                        }

                                    }});
}

//////////////////////////////////////////////////////////////////

$(document).ready(function(){
  youCompleteMe();
})


function shake() {
    $('.keywords > input').css("border", "2px solid red");
    $('.keywords > input').css({"animation": "shake 0.82s cubic-bezier(.36,.07,.19,.97) both", "transform": "translate3d(0, 0, 0)", "backface-visibility": "hidden", "perspective": "1000px"});
}





$('.add').click(function(){
   if ($('.keywords > input').length == 3) {
    alert("Sorry, we can only support up to 3 keywords at the moment.")
  } else {
    $(".keywords").append("<input type='text' id='topic' name='topic' placeholder='one keyword that describes your perfect influencer'>")
    youCompleteMe();
  }
})

$('.remove').click(function(){
  if ($('.keywords > input').length > 1){
    $('.keywords input').last().remove();  
    $('keywords br').last().remove();
    youCompleteMe();
  } else {
    shake();
  }
})



//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
/////////////////////influencer search////////////////////////
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////

var acceptedInfluencersArray = [];

function removeDuplicates(arr){
    let unique_array = []
    for(let i = 0;i < arr.length; i++){
        if(unique_array.indexOf(arr[i]) == -1){
            unique_array.push(arr[i])
        }
    }
    return unique_array;
}

var newModalH1 = '<h1 style="text-align:center;border-bottom: 3px solid white;padding-bottom: 1%;">Your message is on its way!</h1>';
var newModalP = "<p style='text-align:center;'>We'll be in touch with you within 24 hours. Thank you for your interest!</p>";
var newModalButtons = "<div class='modalButtonsContainer'><button onclick='printThisPage()' class='infLink' class='modalButtonA print'>Print this page</button><br><br><a onclick='closeThis()' class='modalButtonB closeButtonB'>Close this page and keep looking around.</a></div>";

$(".infCta").click(function(){
  if (acceptedInfluencersArray.length == 0){
    alert("You need to select some influencers first!");
    return false;
  } else {
    $('.modal-content > h1').html(newModalH1);
    $('.modal-content > p').html(newModalP);
    $('.modalButtonsContainer').html(newModalButtons);
    myModal.style.display = "block";
    
    emailjs.send("default_service","new_influencer_submission",{
      array: acceptedInfluencersArray
    });
  }

})


$('.closeButtonB').click(function(){
    $('.modal').css('display', 'none');
    console.log('it should be closed now.')
})
function printThisPage(){
  myModal.style.display = "none";
  window.print();
}

function closeThis(){
  myModal.style.display = "none";
}

function sendMarketrInquiry(){
  emailjs.send("default_service","new_marketr_submission",{
    email: $('.emailHidden').text(),
    password: $('.nameHidden').text()
  })

  $('.modal-content > h1').html(newModalH1);
  $('.modal-content > p').html(newModalP);
  $('.modalButtonsContainer').html(newModalButtons)
}

$(".marketrCta").click(function(){
  if ($('.forInactive').hasClass('inactive')){
    modal.style.display = "block";
  } else {
    modal.style.display = "block";
    sendMarketrInquiry();
  }

})



function changeSelected(val){
  var f = $("input:checkbox:checked");
  var n = f.length;
  $('.marketrCta').html("Interested in speaking with<br>somebody at Marketr<br>about this plan and these influencers?")
  $('.infCta').html("I'm only interested in the influencers <br>(" + n + " selected)");

  if (acceptedInfluencersArray.indexOf(val) == -1){
    acceptedInfluencersArray.push(val);
    $('.acceptedInfluencersContainer').html("<p class='fade-in'>@" + val + " added to your list.");
  } else {
    var index = acceptedInfluencersArray.indexOf(val);
    acceptedInfluencersArray.splice(index);
    $('.acceptedInfluencersContainer').html("<p class='fade-in'>@" + val + " removed from your list.");
  }

/*  if (acceptedInfluencersArray.indexOf(val) == -1) {
    acceptedInfluencersArray.push(f.last().val());
  } else {
    acceptedInfluencersArray.splice(f.last().val());
  }*/
  var count = 0;

  var acceptedInfluencersArrayNoDuplicates = removeDuplicates(acceptedInfluencersArray);

}








$('#infSubmit').submit(function(event){
    //$('.results > p').remove();
    event.preventDefault();
    validateForm();
    $('.infResults').empty();
    
    $('#infSubmit > svg').removeClass('inactive');
    
    var count = 1;
    var timer = 6500;

    setTimeout(function(){
      $('#infSubmit > svg').addClass('inactive');
      $('.forInactive').removeClass('inactive');
      $('.infCta').removeClass('inactive');
      $('.acceptedInfluencersContainer').removeClass('inactive');
      if ($('forInactive').is(':empty')){
        console.log('hang on');
      }
    }, timer)



    var locationRaw = $('#location').val();
    var topicRaw = $('#topic').val();



    if ($('.keywords > input').length == 1){
      var inputs1 = $('.keywords > input:nth-child(1)').val().toLowerCase();
      var inputsNoSpaces = inputs1.replace(/\s+/g, '');
      var qForUrl = 'q=' + inputsNoSpaces + '&';
      urlBs1 = pt + qForUrl + 'result_type=relevancy&person_types=influencer,blogger&ignore_broadcasters=true&must_have_instagram_profile=true' + t + jsonp;

      $.getJSON(urlBs1, function(data, err){      
          for (var i=0; data.results.length > i; i++){
            var qualification = (data.results[i].num_followers > 5000 && data.results[i].num_followers < 800000 && data.results[i].num_following <= (.5*data.results[i].num_followers))
            if (qualification) {
              var input = "<div class='resultContainer'><h3 for='infSelect'>Add this influencer to your list:</h3><br><input onchange='changeSelected(this.value)' type='checkbox' id='infSelect' name='infSelect' value='" + (data.results[i].username) + "'><br><img class='infImages' src='" + data.results[i].image + "'><h3 style='text-align:left !important;'>" + data.results[i].name  + "</h3><p><strong>Twitter Profile</strong>: @" + data.results[i].username + " | <strong>Instagram profile</strong>: @" + data.results[i].instagram_username + "<br>Twitter Followers: <strong>" + numberWithCommas(data.results[i].num_followers) + "</strong></p><a target='_blank' href='https://instagram.com/" + data.results[i].instagram_username + "'>View Instagram Profile</a><br><br><a target='_blank' href='https://twitter.com/@" + data.results[i].username + "'>View Twitter Profile</a></div><br><br> ";
              $('.infResults').append(input);
            }        
          }
      }) //end of getjson
    }//end of 1 input





    else if ($('.keywords > input').length == 2) {
      var inputs1 = $('.keywords > input:nth-child(1)').val().toLowerCase();
      var inputs2 = $('.keywords > input:nth-child(2)').val().toLowerCase();
      var inputsNoSpaces1 = inputs1.replace(/\s+/g, '');
      var qForUrl1 = 'q=' + inputsNoSpaces1 + '&';

      var inputsNoSpaces2 = inputs2.replace(/\s+/g, '');
      var qForUrl2 = 'q=' + inputsNoSpaces2 + '&';

      urlBs1 = pt + qForUrl1 + qForUrl2 + 'result_type=reply_ratio&person_types=influencer,blogger,journalist&ignore_broadcasters=true&must_have_instagram_profile=true' + t + jsonp;

      $.getJSON(urlBs1, function(data, err){
        for (var i=0; data.results.length > i; i++){
          var qualification = (data.results[i].num_followers > 5000 && data.results[i].num_followers < 800000)
          if (qualification) {
            console.log(data.results[i].username);
            var input = "<div class='resultContainer'><h3 for='infSelect'>Add this influencer to your list:</h3><br><input onchange='changeSelected(this.value)' type='checkbox' id='infSelect' name='infSelect' value='" + (data.results[i].username) + "'><br><img class='infImages' src='" + data.results[i].image + "'><h3 style='text-align:left !important;'>" + data.results[i].name  + "</h3><p><strong>Twitter Profile</strong>: @" + data.results[i].username + " | <strong>Instagram profile</strong>: @" + data.results[i].instagram_username + "<br>Twitter Followers: <strong>" + numberWithCommas(data.results[i].num_followers) + "</strong></p><a target='_blank' href='https://instagram.com/" + data.results[i].instagram_username + "'>View Instagram Profile</a><br><br><a target='_blank' href='https://twitter.com/@" + data.results[i].username + "'>View Twitter Profile</a></div><br><br> ";
            $('.infResults').append(input);
          }
        }
      })

    }//end of 2 inputs




    else if ($('.keywords > input').length == 3) {
      var inputs1 = $('.keywords > input:nth-child(1)').val().toLowerCase();
      var inputs2 = $('.keywords > input:nth-child(2)').val().toLowerCase();
      var inputs3 = $('.keywords > input:nth-child(3)').val().toLowerCase();
      var inputsNoSpaces1 = inputs1.replace(/\s+/g, '');
      var qForUrl1 = 'q=' + inputsNoSpaces1 + '&';

      var inputsNoSpaces2 = inputs2.replace(/\s+/g, '');
      var qForUrl2 = 'q=' + inputsNoSpaces2 + '&';

      var inputsNoSpaces3 = inputs3.replace(/\s+/g, '');
      var qForUrl3 = 'q=' + inputsNoSpaces3 + '&';

      urlBs1 = pt + qForUrl1 + qForUrl2 + qForUrl3 + 'result_type=reply_ratio&person_types=influencer,blogger,journalist&ignore_broadcasters=true&must_have_instagram_profile=true' + t + jsonp;


      $.getJSON(urlBs1, function(data, err){      
          for (var i=0; data.results.length > i; i++){          
            var qualification = (data.results[i].num_followers > 5000 && data.results[i].num_followers < 800000)
            if (qualification) {
                var input = "<div class='resultContainer'><h3 for='infSelect'>Add this influencer to your list:</h3><br><input onchange='changeSelected(this.value)' type='checkbox' id='infSelect' name='infSelect' value='" + (data.results[i].username) + "'><br><img class='infImages' src='" + data.results[i].image + "'><h3 style='text-align:left !important;'>" + data.results[i].name  + "</h3><p><strong>Twitter Profile</strong>: @" + data.results[i].username + " | <strong>Instagram profile</strong>: @" + data.results[i].instagram_username + "<br>Twitter Followers: <strong>" + numberWithCommas(data.results[i].num_followers) + "</strong></p><a target='_blank' href='https://instagram.com/" + data.results[i].instagram_username + "'>View Instagram Profile</a><br><br><a target='_blank' href='https://twitter.com/@" + data.results[i].username + "'>View Twitter Profile</a></div><br><br> ";
                $('.infResults').append(input);
            } else {
              console.log("error")
            }
          }
      })//end of getjson
    }//end of 3 keyword definition


})//end of influencer submission


