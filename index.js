import server from "./js/server.js";

// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll(".authentication");

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        event.preventDefault();
        event.stopPropagation();
        if (!form.checkValidity()) {
        } else {
          const data = new FormData(form);
          const obj = {};
          data.forEach((value, key) => {
            obj[key] = value;
          });
          processData(event, obj);
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();

async function processData(el, data) {
  const action = el.submitter.innerText.toLowerCase();
  let userloc = -1;
  let credentials = "";

  await server.getUsers().then((result) => {
    result.forEach((e, i) => {
      if (e.username == data.username) userloc = i;
    });
    credentials = result;
  });

  if (action == "sign up") {
    console.log(userloc);
    if (userloc == -1) {
      server.updateUsers(data);
      toastMessage("user created");
    } else toastMessage("user name taken");
  } else {
    if (userloc == -1) toastMessage("user doesn't exist");
    else {
      if (credentials[userloc].password == data.password) {
        window.location.href = "home.html";
      } else toastMessage("wrong password");
    }
  }
}

function toastMessage(string) {
  const toastContent = document.querySelector(".toast");

  toastContent.childNodes[1].innerText = string;
  const toast = new bootstrap.Toast(toastContent);
  toast.show();
}
