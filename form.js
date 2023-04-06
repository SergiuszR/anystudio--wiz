window.addEventListener("load", () => {
  let gclidValue;
  let utmTerm;
  let utmSource;
  let utmMedium;
  let utmCampaign;
  let utmCampaignValue;
  let utmMediumValue;
  let utmSourceValue;
  let utmTermValue;

  let gclidRegex = /(?<gclid>(?<=gclid=).*?(?=&|\\s|$))/gm;
  let utmTermRegex = /(?<utmTerm>(?<=utm_term=).*?(?=&|\\s|$))/gm;
  let utmSourceRegex = /(?<utmSource>(?<=utm_source=).*?(?=&|\\s|$))/gm;
  let utmMediumRegex = /(?<utmMedium>(?<=utm_medium=).*?(?=&|\\s|$))/gm;
  let utmCampaignRegex = /(?<utmCampaign>(?<=utm_campaign=).*?(?=&|\\s|$))/gm;

  let locationG = window.location.search;
  let utmTermMatch = locationG.match(utmTermRegex);
  let utmSourceMatch = locationG.match(utmSourceRegex);
  let utmMediumMatch = locationG.match(utmMediumRegex);
  let utmCampaignMatch = locationG.match(utmCampaignRegex);
  let gclidMatch = locationG.match(gclidRegex);

  // gclid
  if (gclidMatch !== null) {
    let splited = gclidMatch[0].split("=");
    if (splited[0] !== "") {
      gclidValue = gclidMatch[0];
      localStorage.setItem("gclid", gclidValue);
    } else if (localStorage.gclid === undefined) {
      gclidValue = "";
    }
  } else if (localStorage.gclid !== "undefined") {
    gclidValue = localStorage.gclid;
  }
  if (localStorage.gclid === undefined) {
    gclidValue = "";
  }

  // utmCampaign
  if (utmCampaignMatch !== null) {
    let splited = utmCampaignMatch[0].split("=");
    if (splited[0] !== "") {
      utmCampaignValue = utmCampaignMatch[0];
      localStorage.setItem("utmCampaign", utmCampaignValue);
    } else if (localStorage.utmCampaign === undefined) {
      utmCampaignValue = "";
    }
  } else if (localStorage.utmCampaign !== "undefined") {
    utmCampaignValue = localStorage.utmCampaign;
  }
  if (localStorage.utmCampaign === undefined) {
    utmCampaignValue = "";
  }

  // utmTerm
  if (utmTermMatch !== null) {
    let splited = utmTermMatch[0].split("=");
    if (splited[0] !== "") {
      utmTermValue = utmTermMatch[0];
      localStorage.setItem("utmTerm", utmTermValue);
    } else if (localStorage.utmTerm === undefined) {
      utmTermValue = "";
    }
  } else if (localStorage.utmTerm !== "undefined") {
    utmTermValue = localStorage.utmTerm;
  }
  if (localStorage.utmTerm === undefined) {
    utmTermValue = "";
  }

  // utmMedium
  if (utmMediumMatch !== null) {
    let splited = utmMediumMatch[0].split("=");
    if (splited[0] !== "") {
      utmMediumValue = utmMediumMatch[0];
      localStorage.setItem("utmMedium", utmMediumValue);
    } else if (localStorage.utmMedium === undefined) {
      utmMediumValue = "";
    }
  } else if (localStorage.utmMedium !== "undefined") {
    utmMediumValue = localStorage.utmMedium;
  }
  if (localStorage.utmMedium === undefined) {
    utmMediumValue = "";
  }

  // utmSource
  if (utmSourceMatch !== null) {
    let splited = utmSourceMatch[0].split("=");
    if (splited[0] !== "") {
      utmSourceValue = utmSourceMatch[0];
      localStorage.setItem("utmSource", utmSourceValue);
    } else if (localStorage.utmSource === undefined) {
      utmSourceValue = "";
    }
  } else if (localStorage.utmSource !== "undefined") {
    utmSourceValue = localStorage.utmSource;
  }
  if (localStorage.utmSource === undefined) {
    utmSourceValue = "";
  }

  setInterval(checkHistory, 4000);
  let chaptersArray = [];
  let csv;
  let formMain = document.querySelector("#mktoForm_1852");
  // let formModal = document.querySelector("#mktoForm_1858")
  let chapters = document.querySelectorAll("[w-el='chapter']");
  let history;

  chapters.forEach((chapter) => {
    chapter.addEventListener("click", function () {
      let chapterLabel = this.children[0].textContent;
      chaptersArray.push(chapterLabel);
      csv = chaptersArray.join(",");
    });
  });

  function checkHistory() {
    history = document.querySelectorAll("input[name='history']");
    history.forEach((entry) => {
      entry.value = csv;
    });
  }

  // Create a function to handle the form submission event
  const handleFormSubmit = (event) => {
    // Check if the form submission was successful
    if (event.success) {
      // Get the element with the class "marketo_custom-confirmation"
      const confirmationElement = document.querySelector(".marketo_custom-confirmation");
      const originalElement = document.querySelector(".form-headings");
      // Set the "display" style property to "block"
      confirmationElement.style.display = "block";
      originalElement.style.display = "none";
    }
  };
  // Add an event listener for the "form submit success" event
  MktoForms2.whenReady((form) => {
    form.addHiddenFields({
      //These are the values which will be submitted to Marketo
      recordeddemochapters: csv,
      utmSource: utmSourceValue,
      utmMedium: utmMediumValue,
      utmCampaign: utmCampaignValue,
      utmTerm: utmTermValue,
      gclid: gclidValue,
    });
    form.onSuccess(handleFormSubmit);
  });
  // checkHistory()
});
