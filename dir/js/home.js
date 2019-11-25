function cataLoad() { 
	GetFiles(["Users.json", "Posts.json"], function() {
	    $("#cataCards").empty();

	    for(i = 0; i < Posts.length; i++){
	    	var card = document.createElement("a");
			card.className = "ui centered raised black card homePostCard";
			card.id = i;
			var cataDiv = document.getElementById("cataCards");
			cataDiv.appendChild(card);

			var image = document.createElement("div");
			image.className = "image";
			card.appendChild(image);

			var imageSRC = document.createElement("img");
			imageSRC.src = "" + Posts[i].imageURL;
			image.appendChild(imageSRC);

			var content = document.createElement("div");
			content.className = "content Acard";
			card.appendChild(content);

			var header = document.createElement("div");
			header.className = "header";
			var headerText = document.createTextNode("" + Posts[i].title);
			header.appendChild(headerText);
			content.appendChild(header);

			var meta = document.createElement("div");
			meta.className = "meta";
			content.appendChild(meta);

			var category = document.createElement("a");
			var catText = document.createTextNode("" + Posts[i].category.charAt(0).toUpperCase() + Posts[i].category.slice(1));
			category.appendChild(catText);
			meta.appendChild(category);

			var description = document.createElement("div");
			description.className = "description";
			var descText = document.createTextNode("" + Posts[i].description);
			description.appendChild(descText);
			content.appendChild(description);

			var extracontent = document.createElement("div");
			extracontent.className = "extra content Acard";
			card.appendChild(extracontent);

			var date = document.createElement("span");
			date.className = "right floated";
			var dateText = document.createTextNode("" + Posts[i].datePosted);
			date.appendChild(dateText);
			extracontent.appendChild(date);

			var price = document.createElement("span");
			price.className = "left floated";
			var priceText = document.createTextNode("$" + Posts[i].price);
			price.appendChild(priceText);
			extracontent.appendChild(price);
		}

	    $('.homePostCard').on('click', function () {

		    $('.ui.modal.homeModal').modal('show');
		    var thisPost = $(this).attr('id');
		    var sellerUser = [];
		    for (var i = 0; i < Users.length; i++) {
		        if (Users[i].userID == Posts[thisPost].sellerID) {
		            sellerUser = Users[i];
		            break;
		        }
		    }
		    document.getElementById("itemName").innerHTML = Posts[thisPost].title + " - $" + Posts[thisPost].price;
		    document.getElementById("sellerUsername").innerHTML = sellerUser.username +" ";
		    document.getElementById("description").innerHTML = Posts[thisPost].description;
		    document.getElementById("campus").innerHTML = "From: " + sellerUser.university;
		    $(".sellerID").attr("id", sellerUser.userID);
		    $(".itemImage").attr('src', Posts[thisPost].imageURL);
		    $(".sellerImg").attr('src', sellerUser.profileImageURl);
		   
		    
		    $("#userLink").click(function () {
		        var userID = $(".sellerID").attr("id");
		        setCookie('userID', userID);
		        LoadPage("dir/html/viewprofile.html");
		        $(".homeModal").modal('hide all');
		    })

		});


			//var modalDiv = document.getElementById("cataCardDetail");
			//$( "#cataCardDetail" ).empty();

			//var closeIcon = document.createElement("i");
			//closeIcon.className = "close icon";
			//modalDiv.appendChild(closeIcon);

			//var modHeader = document.createElement("div");
			//modHeader.className = "header";
			//var modHeaderText = document.createTextNode("Product Details:");
			//modHeader.appendChild(modHeaderText);
			//modalDiv.appendChild(modHeader);
			
			//var imgContent = document.createElement("div");
			//imgContent.className = "image content";
			//modalDiv.appendChild(imgContent);

			//var modImageDiv = document.createElement("div");
			//modImageDiv.className = "ui small image";
			//imgContent.appendChild(modImageDiv);

			//var modImage = document.createElement("img");
			//modImage.class = "ui small image";
			//modImage.src = "" + Posts[thisPost].imageURL;
			//modImageDiv.appendChild(modImage);

			//var modDesc = document.createElement("div");
			//modDesc.className = "description";
			//imgContent.appendChild(modDesc);

			//var modDescHeader = document.createElement("div");
			//modDescHeader.className = "ui header";
			//var modDescHeaderText = document.createTextNode("$" + Posts[thisPost].price);
			//modDescHeader.appendChild(modDescHeaderText);
			//modDesc.appendChild(modDescHeader);

			//var modDescHeader = document.createElement("div");
			//modDescHeader.className = "ui header";
			//var modDescHeaderText = document.createTextNode("" + Posts[thisPost].title);
			//modDescHeader.appendChild(modDescHeaderText);
			//modDesc.appendChild(modDescHeader);

			//var modDescP = document.createElement("p");
			//var modDescPText = document.createTextNode("" + Posts[thisPost].description);
			//modDescP.appendChild(modDescPText);
			//modDesc.appendChild(modDescP);

		
			//var modAct = document.createElement("div");
			//modAct.className = "actions";
			//modalDiv.appendChild(modAct);

			//var modBlackButt = document.createElement("div");
			//modBlackButt.className = "ui black deny button";
			//var backIcon = document.createElement("i");
			//backIcon.className = "reply icon";
			//modBlackButt.appendChild(backIcon);
			//var modBlackButtText = document.createTextNode("Go Back");
			//modBlackButt.appendChild(modBlackButtText);
			//modAct.appendChild(modBlackButt);

			//var modGreenButt = document.createElement("div");
			//modGreenButt.className = "ui positive right labeled icon button";
			//var modGreenButtText = document.createTextNode("I Want This");
			//modGreenButt.appendChild(modGreenButtText);
			//var checkIcon = document.createElement("i");
			//checkIcon.className = "checkmark icon";
			//modGreenButt.appendChild(checkIcon);
			//modAct.appendChild(modGreenButt);





		    // GET USER INFO 
		
	});	
}

function search() {

     $.ajax({
        url: 'https://student4student.azurewebsites.net/posts.json',
        type: 'GET',
        dataType: "json",
        success: displayAll
    });

        function displayAll(data){
            var matches = [];
            var input = document.getElementById("searchInput").value;
            input = input.toUpperCase();
            for (var i = 0; i < data.length; i++) {
                if (data[i].title.toUpperCase().indexOf(input) > -1) {
                	matches.push(data[i]);
                }
            }

            if (matches.length == 0) {
            	document.getElementById("home").innerHTML = "Sorry there are no posts matching " + input;
            }
            else {
                buildResults(matches);
        	}
        }
    }

function sortBy() {

	 $.ajax({
        url: 'https://student4student.azurewebsites.net/posts.json',
        type: 'GET',
        dataType: "json",
        success: displayAll
    });

        function displayAll(data){
            var allPosts = [];
            var option = $('#selectSort').dropdown('get value');
            for (var i = 0; i < data.length; i++) {
            	allPosts.push(data[i]);
            }

        if (option === "priceAsc") {
        	var allPosts = sortByNum(allPosts, 'price');
        } else if (option === "priceDesc") {
        	var allPosts = sortByNum(allPosts, 'price');
        	allPosts.reverse();
        } else if (option === "asc") {
        	var allPosts = sortByKey(allPosts, 'title');
        } else if (option === "desc") {
        	var allPosts = sortByKey(allPosts, 'title');
        	allPosts.reverse();
        }

        buildResults(allPosts);
        }
}

function sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}

function sortByNum(array, key) {
        return array.sort(function(a, b) {
        	var x = a[key]; var y = b[key];
        	return (x - y);
        });
}

function filterBy() {

      $.ajax({
        url: 'https://student4student.azurewebsites.net/posts.json',
        type: 'GET',
        dataType: "json",
        success: displayAll
    });

        function displayAll(data){
            var filterPosts = [];
            var filter = $('#selectFilter').dropdown('get value');

            for (var i = 0; i < data.length; i++) {
                if (data[i].category.indexOf(filter) > -1 || data[i].university.indexOf(filter) > -1) {
                    filterPosts.push(data[i]);
                }
            }

            if (filterPosts.length == 0) {
                document.getElementById("home").innerHTML = "Sorry there are no posts matching " + filter;
            }
            else {
            	buildResults(filterPosts);
            }
        }
    }

function buildResults(array) {
	$("#cataCards").empty();
                for (i = 0; i < array.length; i++) {
                    var card = document.createElement("a");
                    card.className = "ui centered raised blue card postCard";
               
                    card.id = array[i].postID;
                    var cataDiv = document.getElementById("cataCards");
                    cataDiv.appendChild(card);

                    var image = document.createElement("div");
                    image.className = "image";
                    card.appendChild(image);

                    var imageSRC = document.createElement("img");
                    imageSRC.src = "" + array[i].imageURL;
                    image.appendChild(imageSRC);

                    var content = document.createElement("div");
                    content.className = "content";
                    card.appendChild(content);

                    var header = document.createElement("div");
                    header.className = "header";
                    var headerText = document.createTextNode("" + array[i].title);
                    header.appendChild(headerText);
                    content.appendChild(header);

                    var meta = document.createElement("div");
                    meta.className = "meta";
                    content.appendChild(meta);

                    var category = document.createElement("a");
                    var catText = document.createTextNode("" + array[i].category.charAt(0).toUpperCase() + array[i].category.slice(1));
                    category.appendChild(catText);
                    meta.appendChild(category);

                    var description = document.createElement("div");
                    description.className = "description";
                    var descText = document.createTextNode("" + array[i].description);
                    description.appendChild(descText);
                    content.appendChild(description);

                    var extracontent = document.createElement("div");
                    extracontent.className = "extra content";
                    card.appendChild(extracontent);

                    var date = document.createElement("span");
                    date.className = "right floated";
                    var dateText = document.createTextNode("" + array[i].datePosted);
                    date.appendChild(dateText);
                    extracontent.appendChild(date);

                    var price = document.createElement("span");
                    price.className = "left floated";
                    var priceText = document.createTextNode("$" + array[i].price);
                    price.appendChild(priceText);
                    extracontent.appendChild(price);
                }
}

function loadDropDowns() {

    $('#selectFilter').dropdown();
    $('#selectSort').dropdown();

}




