document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".needs-validation");

  form.addEventListener("submit", (event) => {
    let valid = true;

    // Title
    const title = document.getElementById("title");
    const errorTitle = document.getElementById("error-title");
    if (!title.value.trim()) {
      errorTitle.classList.remove("hidden");
      valid = false;
    } else {
      errorTitle.classList.add("hidden");
    }

    // Description
    const description = document.getElementById("description");
    const errorDescription = document.getElementById("error-description");
    if (!description.value.trim()) {
      errorDescription.classList.remove("hidden");
      valid = false;
    } else {
      errorDescription.classList.add("hidden");
    }

    // Price
    const price = document.getElementById("price");
    const errorPrice = document.getElementById("error-price");
    if (price.value === "" || parseFloat(price.value) < 0) {
      errorPrice.classList.remove("hidden");
      valid = false;
    } else {
      errorPrice.classList.add("hidden");
    }

    // Location
    const location = document.getElementById("location");
    const errorLocation = document.getElementById("error-location");
    if (!location.value.trim()) {
      errorLocation.classList.remove("hidden");
      valid = false;
    } else {
      errorLocation.classList.add("hidden");
    }

    // Country
    const country = document.getElementById("country");
    const errorCountry = document.getElementById("error-country");
    if (!country.value.trim()) {
      errorCountry.classList.remove("hidden");
      valid = false;
    } else {
      errorCountry.classList.add("hidden");
    }

    // Image URL
    const image = document.getElementById("image");
    const errorImage = document.getElementById("error-image");
    const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
    if (!urlPattern.test(image.value)) {
      errorImage.classList.remove("hidden");
      valid = false;
    } else {
      errorImage.classList.add("hidden");
    }

    if (!valid) {
      event.preventDefault();
      event.stopPropagation();
    }
  });
});
 const
  form = document.getElementById("editForm");

    form.addEventListener("submit", function (e) {
      let isValid = true;

      // Title
      const title = form.title.value.trim();
      if (!title) {
        document.getElementById("titleError").classList.remove("hidden");
        isValid = false;
      } else {
        document.getElementById("titleError").classList.add("hidden");
      }

      // Description
      const desc = form.description.value.trim();
      if (!desc) {
        document.getElementById("descError").classList.remove("hidden");
        isValid = false;
      } else {
        document.getElementById("descError").classList.add("hidden");
      }

      // Price
      const price = form.price.value;
      if (price === "" || price < 0) {
        document.getElementById("priceError").classList.remove("hidden");
        isValid = false;
      } else {
        document.getElementById("priceError").classList.add("hidden");
      }

      // Location
      const location = form.location.value.trim();
      if (!location) {
        document.getElementById("locationError").classList.remove("hidden");
        isValid = false;
      } else {
        document.getElementById("locationError").classList.add("hidden");
      }

      // Country
      const country = form.country.value.trim();
      if (!country) {
        document.getElementById("countryError").classList.remove("hidden");
        isValid = false;
      } else {
        document.getElementById("countryError").classList.add("hidden");
      }

      // Image URL
      const image = form.image.value.trim();
      if (image && !/^https?:\/\/.+\..+/.test(image)) {
        document.getElementById("imageError").classList.remove("hidden");
        isValid = false;
      } else {
        document.getElementById("imageError").classList.add("hidden");
      }

      if (!isValid) {
        e.preventDefault(); // stop form submission
      }
    });