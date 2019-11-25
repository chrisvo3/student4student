$(document).ready(function () {
    $('ui form');


     
    });
function AddZero(num) {
    return (num >= 0 && num < 10) ? "0" + num : num + "";
}

function GetFormattedDate() {
    var now = new Date();
    var hours = now.getHours();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    return [[
        AddZero(now.getMonth() + 1),
        AddZero(now.getDate()),
        now.getFullYear()].join("/"),
        [AddZero(hours),
        AddZero(now.getMinutes())].join(":"),
        now.getHours() >= 12 ? "PM" : "AM"].join(" ");
}


function CreatePost() {
    var title = document.getElementsByName("title")[0].value;
    var price = document.getElementsByName("price")[0].value;
    var category = document.getElementsByName("category")[0].value;
    var description = document.getElementsByName("description")[0].value;
    var postID = new Date().getTime();
    var sellerID = userLoggedIn.userID;
    var datePosted = GetFormattedDate();
    var imgURL = "https://student4student.azurewebsites.net/images/" + postID + ".png";
    var userLoggedIn = JSON.parse(getCookie('user'));
    var university = userLoggedIn.university;
    var data = postID + "|sep|" + title + "|sep|" + imgURL + "|sep|" + price + "|sep|" + sellerID + "|sep|" + description + "|sep|" + category + "|sep|" + datePosted + "|sep|"+university; 

    var files = $("#memberUpload").get(0).files;
    $("#loading").show();
    if (files[0] != undefined) {
        var fu = "#memberUpload";
        var imgName = postID + ".png";
        
        UploadImages(fu, imgName);
    }

    $.ajax({
        url: server + "api/studenttostudentapi/CreatePost/abc",
        type: 'POST',
        data: data,
        async: false,
        cache: false,
        success: function (result) {

            if (result == "good") {
                $("#loading").hide();

                alert("post created");

            } else {
                $("#loading").hide();

                alert("error, post not created");
            }

        }
    });


}


function TriggerFileUploadCreatePost(){

    $("#memberUpload").trigger("click");
    
}


function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            
            $('#postImg').attr('src', e.target.result);

            $('#postImg').hide();
            $('#postImg').fadeIn(650);

        }

        reader.readAsDataURL(input.files[0]);
    }
}



function UploadImages(fu, name) {

    files = $(fu).get(0).files;

    if (files[0] != undefined) {
        var data = new FormData();


        data.append("name", name);

        data.append("UploadedImage", files[0]);


        var ajaxRequest = $.ajax({
            type: "POST",
            url: server + "api/studenttostudentapi/UploadImage/post",
            contentType: false,
            processData: false,
            data: data
        });

        ajaxRequest.done(function (xhr, textStatus) {
            if (xhr == "good") {
            }
            else {
                alert("error uploading image");

            }
        });


    }
   
}