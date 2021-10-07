let darkMode = () =>{
    mode = document.getElementById("body");
    mode.classList.add("dark-mode");
}
let lightMode = () =>{
    mode = document.getElementById("body");
    mode.classList.remove("dark-mode");
}




 searchUser = () => {

   let username = document.getElementById("github-search").value;
   let errorMsg = document.getElementById("error");
   errorMsg.style.display = "none";
   if (username == ""){
       
       errorMsg.innerHTML = "Enter username";
       errorMsg.style.display = "flex";
    }
   else{
        const xhttp = new XMLHttpRequest()
        xhttp.onload = () =>{
            let data = JSON.parse(xhttp.response)
            
            if(xhttp.status == 404){
                errorMsg.innerHTML = "Not Found";
                errorMsg.style.display = "flex";
            }
            else{
                console.log(data);

                document.getElementById("avatar").src = data.avatar_url;

                let name = document.getElementById("name")
                name.innerHTML = data.name == null?"No Name":data.name;
                
                let username = document.getElementById("username")
                username.innerHTML = "@"+data.login
                
                let timeJoined = document.getElementById("joined")
                timeJoined.innerHTML ="Joined "+ data.created_at.toLocaleString('en-US');
                
                let bio = document.getElementById("bio")
                bio.innerHTML = data.bio == null? "No bio":data.bio;

                document.getElementById("repos").innerHTML = data.public_repos;
                document.getElementById("followers").innerHTML = data.followers
                document.getElementById("follows").innerHTML = data.following;
                
                let location = document.getElementById("location")
                location.innerHTML = data.location == null? "No Data":data.location;

                let twitter = document.getElementById("twitter");
                twitter.innerHTML = data.twitter_username == null? "No info":"@" + data.twitter_username;
                let link = document.getElementById("link")
                link.innerHTML = data.html_url
                link.href = data.html_url
                document.getElementById("company").innerHTML = data.company == null? "No info":data.company;

                
            }
        }
        xhttp.open("GET","https://api.github.com/users/" + username, true);
        xhttp.send()

    }
}

let usernameInput = document.getElementById("github-search");
usernameInput.value = "bratanac24";

usernameInput.addEventListener("keyup", function(event) {

    if (event.keyCode === 13) {
      event.preventDefault();
      document.getElementById("search").click();
    }
});