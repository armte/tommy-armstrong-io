

(function(window, document, undefined) {

  // code that should be taken care of right away

  window.onload = init;

  async function init(){
    let messageForm = document.getElementsByName("leave_message")[0];
    console.log(messageForm);
    messageForm.addEventListener("submit", function(ev) {
      ev.preventDefault();
      let usersName = ev.target.usersName;
      let usersEmail = ev.target.usersEmail;
      let message = ev.target.usersMessage;
      console.log(`usersName: ${usersName.value}, usersEmail: ${usersEmail.value}, message: ${message.value}`);

      let messageSection = document.getElementById("messages");
      let messageList = messageSection.getElementsByTagName("ul")[0];
      let newMessage = document.createElement("li");
      newMessage.innerHTML = `<a href="mailto: ${usersEmail.value}">${usersEmail.value}</a>`;
      newMessage.innerHTML += `<span style="padding: 2px 4px;">${message.value}</span>`
      let removeButton = document.createElement("button");
      removeButton.innerHTML = "remove";
      removeButton.type = "button";
      removeButton.addEventListener("click", function(ev) {
        let entry = this.parentNode;
        entry.remove();
        if (messageList.childElementCount == 0) {
          messageSection.style.display = 'none';
        }
      });
      newMessage.appendChild(removeButton);
      
      editButton = document.createElement("button");
      editButton.innerHTML = "edit";
      editButton.addEventListener("click", function(ev) {
        console.log(`Parent Node: ${this.parentNode}`);
        currMessage = this.parentNode.getElementsByTagName("span")[0];
        console.log(currMessage);
        contentEditable = currMessage.getAttribute("contenteditable");
        currMessage.setAttribute('contentEditable', !contentEditable);
        if (this.innerHTML == "edit") {
          this.innerHTML = "done";
        } else {
          this.innerHTML = "edit";
        }
        currMessage.focus();
      });
      newMessage.appendChild(editButton);

      messageList.appendChild(newMessage);
      messageSection.style.display = 'block';

      messageForm.reset();
    })
    let repos = await getGitRepos();
    if (repos) {
      console.log(`We've got data...`);
      let projectSection = document.getElementById("Projects");
      console.log(projectSection);
      let projectList = projectSection.getElementsByTagName("ol")[0];
      for (let i=0; i < repos.length; i++) {
        project = document.createElement("li");
        project.innerHTML = repos[i]["name"];
        projectList.appendChild(project);
      }
    }
  }

  async function getGitRepos() {
    try {
      const repositories = await fetch('https://api.github.com/users/armte/repos').then( (rs) => {
        if (!rs.ok) {
          throw new Error('Request failed');
        }
        return rs.json();
      }).then( (jsonData) => {
        return jsonData;
      });
      console.log(repositories);
      return repositories;
    } catch(err) {
      console.log(`Encountered error when attempting to fetch Git repos: ${err}`);
    }
  }

})(window, document, undefined);