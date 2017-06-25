/*Takes the user input from the form and searches for it via
Github API. If such an username exists, it displays said user
info. Else, it shows an error message.*/
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
                displayUserInfo(form[0].value);
            }
        }
    };
    var userInfo = "https://api.github.com/search/users?q=" + form[0].value + " in:login";
    xmlhttp.open("GET", userInfo, true);
    xmlhttp.send();
    return false;
}

/*Makes the user information section visible*/
function showInfo() {
    document.getElementById("bioInfo").style.display = "block";
    document.getElementById("reposContainer").style.display = "block";
}

/*Hides the user information section*/
function hideInfo() {
    document.getElementById("bioInfo").style.display = "none";
    document.getElementById("reposContainer").style.display = "none";
}

/*Makes the error section visible*/
function showError() {
    document.getElementById("errorContainer").style.display = "block";
}

/*Hides the error section*/
function hideError() {
    document.getElementById("errorContainer").style.display = "none";
}

/*Displays an error message*/
function displayErrorMessage() {
    hideInfo();
    showError();
    clearUserInfo();
}

/*Displays the user information*/
function displayUserInfo(username) {
    var biourl = "https://api.github.com/users/" + username;
    displayBioInfo(biourl);
    var repourl = biourl + "/repos";
    displayRepoInfo(repourl);

    hideError();
    showInfo();
    return false;
}

/*Displays the Github bio information for the searched user*/
function displayBioInfo(biourl) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var myJSON = JSON.parse(this.responseText);
            fillBioSection(myJSON);         
        }
    };
    xmlhttp.open("GET", biourl, true);
    xmlhttp.send();
}

/*Clears the user information section*/
function clearUserInfo() {
    clearBioSection();
    clearRepoSection();
}

/*Clears the bio section, removing all the information in it*/
function clearBioSection(){
    document.getElementById("profilePic").style.display = "none";
    document.getElementById("fullName").innerHTML = "";
    document.getElementById("userName").innerHTML = "";
    document.getElementById("bio").innerHTML = ""; 
}

/*Clears the repository section, removing all the information in it*/
function clearRepoSection(){
    var reposList = document.getElementById("reposInfo");
    while (reposList.firstChild) {
        reposList.removeChild(reposList.firstChild);
    }
}

/*Fills the bio section with JSON data*/
function fillBioSection(myJSON){
    document.getElementById("profilePic").src = myJSON.avatar_url;
    document.getElementById("profilePic").style.display = "block";
    document.getElementById("fullName").innerHTML = myJSON.name;
    document.getElementById("userName").innerHTML = "@" + myJSON.login;
    document.getElementById("bio").innerHTML = myJSON.bio;  
}

/*Displays the searched user's Github repositories*/
function displayRepoInfo(repourl){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var myJSON = JSON.parse(this.responseText);
            fillRepoSection(myJSON);
        }
    };
    xmlhttp.open("GET", repourl, true);
    xmlhttp.send();
}

/*Fills the repository list with JSON data*/
function fillRepoSection(myJSON) {
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