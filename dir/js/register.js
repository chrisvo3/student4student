function LoadDDL() {
    var option = '';
    for (var i = 0; i < universities.length; i++) {

        option += '<option value="' + universities[i].name + '">' + universities[i].name + ", " + universities[i].state_code + '</option>';
    }
    $('#ddlUniversities').append(option);

    $('#ddlUniversities').dropdown();
}

function popualteLink() {
    var value = $("#ddlUniversities option:selected").text();
    for (var i = 0; i < universities.length; i++) {
        var temp = universities[i];
        if (temp.name == value.split(', ')[0] && temp.state_code == value.split(', ')[1]) {
            document.getElementById("schoolPortal").innerHTML = "Go to school website "+temp.website;
            $("#schoolPortal").attr("href", temp.website);
        }
    }
}
function register() {
    
    var un = document.getElementById("un").value;
    var pw = document.getElementById("pw").value;
    var repw = document.getElementById("repw").value;
    var first = document.getElementById("first").value;
    var middle = document.getElementById("middle").value;
    var last = document.getElementById("last").value;
    var email = document.getElementById("email").value;
    var university = document.getElementById("ddlUniversities").value;


    if (un != "" && un != undefined && pw != "" && pw != undefined && repw != "" && repw != undefined &&
        first != "" && first != undefined && last != "" && last != undefined &&
        email != "" && email != undefined && university != "" && university != undefined) {

        //alert("button works");

        //userID from YYMMDDHHMMSS
        var d = new Date();
        var userID = d.getTime();
        var fullName = first + " " + middle + " " + last;
        var userData = userID + "|sep|" + fullName + "|sep|" + email + "|sep|" + un + "|sep|" + pw + "|sep|" + university;

        //check if eddu
        var temp = email.split('@');
      
        if (temp[1].split('.')[temp[1].split('.').length - 1] == "edu") {
                //alert("this email is school email");

                //update into json
                $.ajax({
                    url: server + "api/studenttostudentapi/CreateUser/abc",
                    type: 'POST',
                    data: userData,
                    async: false,
                    cache: false,
                    timeout: 30000,
                    success: function (result) {

                        if (result == "exists") {
                            alert("the user is already exist");
                        }
                        else if (result == "good") {
                            //do something not to crash
                            document.getElementById("regName").innerHTML = fullName;
                            document.getElementById("regEmail").innerHTML = email;
                            $("#regForm").hide();
                            $("#regSuccess").css('visibility', 'visible');

                            var msg = " Hello there validate your email addresss by clicking on this link\n http://localhost:51623/verifyUser.html?"+email;
                            var data = "2|sep|" + email + "|sep|student4student@student4student.com|sep|student4student@student4student.com|sep|Verify Email Address|sep|" + msg;

                            var url = 'http://musicmaestromoe.azurewebsites.net/api/MailerAPI/sendEmail';

                            $.post(url, data, function (res) {
                                if (res == "good") {
                                    //$rootScope.ShowToast("✔ Thank you for your message!", "limegreen");
                                }
                                else {
                                //    $rootScope.ShowToast("Sorry, something went wrong. Try again", "darkred");
                                }
                            });

                        }
                        else {
                            alert("something wrong");
                        }

                    }
                }); //end data pushing
            }
            else {
                alert("Please make sure your email is a school email");
            }
        } //if email is valid

    else {
        alert("Please fill out form and make sure you read our term and condition");
    } //end else if inputs empty
   
} //end register function

