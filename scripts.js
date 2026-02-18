window.addEventListener("DOMContentLoaded", (event) => {
  // Navbar shrink function
  var navbarShrink = function () {
    const navbarCollapsible = document.body.querySelector("#mainNav");
    if (!navbarCollapsible) return;
    if (window.scrollY === 0) {
      navbarCollapsible.classList.remove("navbar-shrink");
    } else {
      navbarCollapsible.classList.add("navbar-shrink");
    }
  };

  // Shrink the navbar
  navbarShrink();

  // Shrink the navbar when page is scrolled
  document.addEventListener("scroll", navbarShrink);
});

/*!
 * Start Bootstrap - Freelancer v7.0.7 (https://startbootstrap.com/theme/freelancer)
 * Copyright 2013-2023 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-freelancer/blob/master/LICENSE)
 */
//
// Scripts
//
// const contactForm = document.getElementById("contactForm");

// contactForm.addEventListener("submit", async (e) => {
//   e.preventDefault(); // Stop the page from reloading

//   // 1. Gather data from the form fields
//   const formData = new FormData(contactForm);

//   // 2. Convert FormData to a plain JSON object
//   const data = Object.fromEntries(formData.entries());

//   try {
//     // 3. Send the POST request with JSON headers
//     const response = await fetch(contactForm.action, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//       },
//       body: JSON.stringify(data), // Turn the object into a JSON string
//     });

//     if (response.ok) {
//       alert("Message sent successfully!");
//       contactForm.reset();
//     } else {
//       const errorData = await response.json();
//       alert("Error: " + (errorData.error || "Submission failed"));
//     }
//   } catch (error) {
//     alert("Network error. Please try again later.");
//   }
// });

var form = document.getElementById("contactForm");

async function handleSubmit(event) {
  event.preventDefault();
  var status = document.getElementById("submitSuccessMessage");
  var errorStatus = document.getElementById("submitErrorMessage");
  var data = new FormData(event.target);

  fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        status.classList.remove("d-none");
        form.reset();
      } else {
        errorStatus.classList.remove("d-none");
      }
    })
    .catch((error) => {
      errorStatus.classList.remove("d-none");
    });
}
form.addEventListener("submit", handleSubmit);

window.addEventListener("DOMContentLoaded", (event) => {
  // Navbar shrink function
  var navbarShrink = function () {
    const navbarCollapsible = document.body.querySelector("#mainNav");
    if (!navbarCollapsible) {
      return;
    }
    if (window.scrollY === 0) {
      navbarCollapsible.classList.remove("navbar-shrink");
    } else {
      navbarCollapsible.classList.add("navbar-shrink");
    }
  };

  // Shrink the navbar
  navbarShrink();

  // Shrink the navbar when page is scrolled
  document.addEventListener("scroll", navbarShrink);

  // Activate Bootstrap scrollspy on the main nav element
  const mainNav = document.body.querySelector("#mainNav");
  if (mainNav) {
    new bootstrap.ScrollSpy(document.body, {
      target: "#mainNav",
      rootMargin: "0px 0px -40%",
    });
  }

  // Collapse responsive navbar when toggler is visible
  const navbarToggler = document.body.querySelector(".navbar-toggler");
  const responsiveNavItems = [].slice.call(
    document.querySelectorAll("#navbarResponsive .nav-link"),
  );
  responsiveNavItems.map(function (responsiveNavItem) {
    responsiveNavItem.addEventListener("click", () => {
      if (window.getComputedStyle(navbarToggler).display !== "none") {
        navbarToggler.click();
      }
    });
  });
});
