function searchUser() {
	var form = document.getElementById("myForm");
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
    	if (this.readyState == 4 && this.status == 200) {
        	var myJSON = JSON.parse(this.responseText);
        	var items = myJSON.items;
        	if(myJSON.total_count == 0 || items[0].login.toLowerCase() != 
        								  form[0].value.toLowerCase()) {
        		displayErrorMessage();
        	} else {
        		showUserInfo(form[0].value);
        	}
    	}
	};
	var userInfo = "https://api.github.com/search/users?q=" + form[0].value;
	xmlhttp.open("GET", userInfo, true);
	xmlhttp.send();
	return false;
}

function displayErrorMessage() {
	var bioSection = document.getElementById("bioInfo");
	bioSection.style.display = "none";
	var repoSection = document.getElementById("reposContainer");
	repoSection.style.display = "none";
	var error = document.getElementById("errorContainer");
    error.style.display = "block";
}

function showUserInfo(username) {
	var biourl = "https://api.github.com/users/" + username;
	showBioInfo(biourl);
	var repourl = biourl + "/repos";
	showRepoInfo(repourl);

	var bioSection = document.getElementById("bioInfo");
	bioSection.style.display = "block";
	var repoSection = document.getElementById("reposContainer");
	repoSection.style.display = "block";
	var error = document.getElementById("errorContainer");
    error.style.display = "none";
	return false;
}

function showBioInfo(biourl) {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
    	if (this.readyState == 4 && this.status == 200) {
        	var myJSON = JSON.parse(this.responseText);
        	document.getElementById("profilePic").src = myJSON.avatar_url;
        	document.getElementById("fullName").innerHTML = myJSON.name;
        	document.getElementById("userName").innerHTML = "@" + myJSON.login;
        	document.getElementById("bio").innerHTML = myJSON.bio;        	
    	}
	};
	xmlhttp.open("GET", biourl, true);
	xmlhttp.send();
}

function showRepoInfo(repourl){
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
    	if (this.readyState == 4 && this.status == 200) {
        	var myJSON = JSON.parse(this.responseText);
        	var reposList = document.getElementById("reposInfo");
        	reposList.style.paddingRight = reposList.offsetWidth -
        								   reposList.clientWidth +
        								   "px";
			while (reposList.firstChild) {
    			reposList.removeChild(reposList.firstChild);
			}
        	for (var index in myJSON) {
        		var elem = document.createElement('li');
        		elem.className = 'repo';

        		var nameDiv = document.createElement('div');
        		nameDiv.innerHTML = myJSON[index].name;
        		nameDiv.className = "repoName";

        		var starDiv = document.createElement('div');
        		starDiv.innerHTML = myJSON[index].stargazers_count;
        		starDiv.className = "iconContainer";
        		var starIcon = document.createElement('img');
        		starIcon.src = "starIcon.svg";
        		starIcon.className = "imgIcon";
        		starIcon.alt = "starIcon";
        		starDiv.appendChild(starIcon);

        		var forkDiv = document.createElement('div');
        		forkDiv.innerHTML = myJSON[index].forks_count;
        		forkDiv.className = "iconContainer";
        		var forkIcon = document.createElement('img');
        		forkIcon.src = "forkIcon.svg";
        		forkIcon.className = "imgIcon";
        		forkIcon.alt = "forkIcon";
        		forkDiv.appendChild(forkIcon);

        		elem.appendChild(forkDiv);
        		elem.appendChild(starDiv);
        		elem.appendChild(nameDiv);

        		reposList.appendChild(elem);
        		reposList.appendChild(document.createElement('hr'));
        	}
    	}
	};
	xmlhttp.open("GET", repourl, true);
	xmlhttp.send();
}