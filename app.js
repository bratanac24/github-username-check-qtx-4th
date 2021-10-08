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
                let date = new Date(data.created_at)
                let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
                let mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(date);
                let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
                console.log(`${da} ${mo} ${ye}`);
                timeJoined.innerHTML ="Joined "+ `${da} ${mo} ${ye}`

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
searchUser();

usernameInput.addEventListener("keyup", function(event) {

    if (event.keyCode === 13) {
      event.preventDefault();
      document.getElementById("search").click();
    }
});