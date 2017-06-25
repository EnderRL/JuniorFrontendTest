describe("The script", function() {

  it("should be able to show an error", function() {
  	var error = document.getElementById("errorContainer"); 
    showError();
    expect(error.style.display).toEqual("block");
  });

  it("should be able to hide an error", function(){
  	var error = document.getElementById("errorContainer"); 
    hideError();
    expect(error.style.display).toEqual("none");
  });

  it("should be able to show the bio and repo section ", function(){
  	showInfo();
  	var bioInfo = document.getElementById("bioInfo"); 
  	var reposInfo = document.getElementById("reposContainer"); 
    expect(bioInfo.style.display).toEqual("block");
    expect(reposInfo.style.display).toEqual("block");
  });

  it("should be able to hide the bio and repo section ", function(){
  	hideInfo();
  	var bioInfo = document.getElementById("bioInfo"); 
  	var reposInfo = document.getElementById("reposContainer"); 
    expect(bioInfo.style.display).toEqual("none");
    expect(reposInfo.style.display).toEqual("none");
  });

  it("should be able to fill the bio section with JSON data", function(){
  	  var bioJSON = {
  			"login": "testlogin",
  			"avatar_url": "profilePicMock.png",
  			"name": "Test Full Name",
  			"bio": "This is a test bio."
		}

  	  fillBioSection(bioJSON);
  	  var auxString = document.getElementById("profilePic").src;
  	  auxString = auxString.slice(auxString.length - 18, auxString.length);
  	  expect(auxString).toEqual("profilePicMock.png");
      expect(document.getElementById("fullName").innerHTML).toEqual("Test Full Name");
      expect(document.getElementById("userName").innerHTML).toEqual("@testlogin");
      expect(document.getElementById("bio").innerHTML).toEqual("This is a test bio.");
  });

  it("should be able to fill the repo section with JSON data", function(){
  	var repoJSON = [ { "name": "Test Repo", "stargazers_count": 42, "forks_count": 42 } ];
  	fillRepoSection(repoJSON);
  	var reposList = document.getElementById("reposInfo").childNodes;
  	var forkDiv = reposList[0].childNodes[0];
  	var starDiv = reposList[0].childNodes[1];
  	var nameDiv = reposList[0].childNodes[2];
  	var auxForkString = forkDiv.innerHTML;
  	auxForkString = auxForkString.substr(0,auxForkString.indexOf('<'));
  	var auxStarString = starDiv.innerHTML;
  	auxStarString = auxStarString.substr(0,auxStarString.indexOf('<'));
  	expect(auxForkString).toEqual("42");
  	expect(auxStarString).toEqual("42");
  	expect(nameDiv.innerHTML).toEqual("Test Repo");
  });

  it("should be able to clear the bio section", function(){
  	clearBioSection();
  	expect(document.getElementById("profilePic").style.display).toEqual("none");
    expect(document.getElementById("fullName").innerHTML).toEqual("");
    expect(document.getElementById("userName").innerHTML).toEqual("");
    expect(document.getElementById("bio").innerHTML).toEqual("");
  });

  it("should be able to clear the repo section", function(){
  	clearRepoSection();
  	var reposList = document.getElementById("reposInfo");
  	expect(reposList.childNodes.length).toEqual(0);
  });

  
});

