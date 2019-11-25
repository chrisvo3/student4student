function openMessModal() {

	$('.ui.modal.MessModal').modal('show');
}

function openRateModal() {

    $('.ui.modal.RateModal').modal('show');
}

function sendMess() {
        var MessSend = document.getElementById("messageInput").value;
        if (MessSend == "" && MessSend == undefined) {
            alert('Message cant be empty');
            return;
        }
        else {
        	var senderID = JSON.parse(getCookie('user')).userID;
        	var receiverID = getCookie('userID');
        	var convoID = '';	
        	$.get(server + 'Convos.json', function (data) {
        		for (var i = 0; i < data.length; i++) {
        			if ((data[i].recID == receiverID && data[i].senderID == senderID) || (data[i].recID == senderID && data[i].senderID == receiverID)) {
        				convoID = data[i].convoID;
        				break;
        			}
        		}
 			var data = convoID + "|" + MessSend + "|" + senderID;
            $.ajax({
                url: server + "api/studenttostudentapi/CreateNewMessage/abc",
                type: 'POST',
                data: data,
                async: false,
                cache: false,
                success: function (result) {

                    if (result == "good") {

                       alert("message sent");
                        

                    } else {
                        alert("message not ssent");


                    }

                }
            });



        	});
 
           
        }
    }

    function sendRate(){
        var ratingInput = $('.rateUser').rating("get rating");
        var userID = getCookie('userID');
   
        $.ajax({
                url: server + "api/studenttostudentapi/CreateRating/abc",
                type: 'POST',
                data: userID + "|" + ratingInput,
                async: false,
                cache: false,
                success: function (result) {
                    console.log(result);
                                        if (result == "good") {

                       alert("rating sent");
                       LoadPage("dir/html/viewprofile.html");
                       ViewUserProfile();

                    } else {
                        alert("rating not sent");


                    }

                }
            });

    }
