  $(document)
    .ready(function() {
      
    })
  ;


  function submit() {

     var data = email.value + "|sep|" + password.value;
     $("#loading").show();
     $.ajax({
        url: server + "api/studenttostudentapi/LoginUser/abc",
        type: 'POST',
        data: data,
        async: false,
        cache: false,
        timeout: 30000,
        error: function(){
            return true;
        },
        success: function(result){ 

            if (result != null) {
             userLoggedIn = result;
             if (userLoggedIn.isVerified == "true") {
              if(userLoggedIn.ban == "1"){
                alert("Your account has been banned");
                return;
              }
              isLoggedIn = true;
              $("#loading").hide();
              document.getElementById("username").innerHTML = userLoggedIn.username;
              $(".loginMenu").css('display', 'flex');
              $(".loginLink").css('display', 'none');
              for (var i = 0; i < Users.length; i++) {
                  if (Users[i].userID == userLoggedIn.userID) {
                      console.log(Users[i]);
                      setCookie('user', JSON.stringify(Users[i]), 100);
                      break;
                  }
              }

              LoadPage("dir/html/home.html");
                } else {
                  $("#loading").hide();
                  $("#loginForm").hide();
                  $("#loginVerify").css('visibility', 'visible');
               
                  document.getElementById("verify").innerHTML = "<br/>" + email.value;
                }
                } else {
                  $("#loading").hide();

                  alert("Username and password not found");
                }

                  }

    });

 

  }