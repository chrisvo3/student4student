var server = "https://student4student.azurewebsites.net/";
var Users = [];
var Posts = [];
var isLoggedIn = false;
var userLoggedIn = {};
var universities = [];



function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function LoadPage(htmlPage) { 
     $("#mainBody").empty();
    $("#mainBody").load(htmlPage);
    if(htmlPage == "dir/html/home.html"){
        cataLoad();
    }
    if (htmlPage == "dir/html/register.html") {
        LoadDDL();
    }
    if (htmlPage == "dir/html/myprofile.html") {
        cataLoad();
    }
  
}

function LoadNavbar() {
    $("#navbar").load('dir/html/navbar.html');
}

function GetFiles(files, callBack) {
    $.getJSON(server + files[0]).done(function (data){
     	Users = data;
     	console.log(Users);
     	$.getJSON(server + files[1]).done(function (data){
	     	Posts = data;
	     	console.log(Posts);
	     	callBack();
	     	$.getJSON(server + "universities.json").done(function (data) {
	     	    universities = data;
	     	    console.log(universities);
	     	});
     	});
    });
}

function PostModel(functionName, data) {
	 $.ajax({
        url: server + "api/studenttostudentapi/" + functionName + "/abc",
        type: 'POST',
        data: data,
        async: false,
        cache: false,
        timeout: 30000,
        error: function(){
            return true;
        },
        success: function(msg){ 
        	console.log(msg);
            return msg 
        }
    });
}

$(document).ready(function() {
    LoadNavbar();
    if (!location.href.split('/')[3].startsWith("verifyUser.html")) {
        LoadPage('dir/html/home.html');

  }

});