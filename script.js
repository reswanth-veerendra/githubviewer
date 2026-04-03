async function getUser(){
    const username=document.getElementById('username').value;
    const profile=document.getElementById('profile');
    const reposit=document.getElementById('reposit');
    
    if (!username) return alert("Please enter a name");

profile.innerHTML="<p>Loading profile...</p>";
reposit.innerHTML="<p>Loading repositories...</p>";
    try {
        const uresponse=await fetch(`https://api.github.com/users/${username}`,
            {headers:{
                     Authorization:"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"
                }
            }
        );
        const user=await uresponse.json();
        
        if(user.message==="Not Found") {
            profile.innerHTML = "<p>User not found!</p>";
            return;
        }
        const rresponse=await fetch(`https://api.github.com/users/${username}/repos?sort=created&per_page=50`,
            {headers:{
                     Authorization:"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"
                }
            });
        const repos=await rresponse.json();
        displayUser(user,repos);
      }
    catch(error){
        console.error("Error fetching data:", error);
    }
}

function displayUser(user, repos) {
    const profile = document.getElementById('profile');
    const reposit = document.getElementById('reposit');
       
    const repolinks = repos.map(repo=>`<div class="repo-card">
            <a href="${repo.html_url}" target="_blank">${repo.name}</a>
            <p>${repo.description||"No Description Available"}</p>
            <span>⭐${repo.stargazers_count}</span>
        </div>`).join('');

profile.innerHTML = `<div class="profilecard">
        <img src="${user.avatar_url}" width="100">
        <h2>${user.name || user.login}</h2>
        <hr id="hor">
        <p><b>Bio:</b><br>${user.bio||'No bio available'}</p>
        <hr>
        <p><b>Company:</b> ${user.company||'Not in any company'}</p>
        <hr>
        <p><b>Location:</b> ${user.location||'Not specified'}</p>
        <hr>
        <p><b>Followers:</b>${user.followers}|<b>Following:</b>${user.following}</p>
        <hr>
        <p><b>Public Repos:</b> ${user.public_repos}</p>
    </div>
    `;
    reposit.innerHTML = `
           <h3>Latest Repositories:</h3>
                  ${repolinks}
    `;
}