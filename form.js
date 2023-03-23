window.addEventListener("load", () => {
  setInterval(checkHistory, 4000);
  let chaptersArray = [];
  let csv;
  let form = document.querySelector("#mktoForm_1852");
  let chapters = document.querySelectorAll("[w-el='chapter']");
  let history;

  // console.log(chapters);

  chapters.forEach((chapter) => {
    chapter.addEventListener("click", function () {
      let chapterLabel = this.children[0].textContent;
      chaptersArray.push(chapterLabel);
      csv = chaptersArray.join(",");
      // console.log(csv);
    });
  });

  function checkHistory() {
    history = form.querySelector("input[name='history']");
    history.value = csv;
  }

  // Create a function to handle the form submission event
  const handleFormSubmit = (event) => {
    console.log(csv);
    // Check if the form submission was successful
    if (event.success) {
      console.log("form sent!");
      // Get the element with the class "marketo_custom-confirmation"
      const confirmationElement = document.querySelector(".marketo_custom-confirmation");
      const originalElement = document.querySelector(".form-headings");
      // Set the "display" style property to "block"
      confirmationElement.style.display = "block";
      originalElement.style.display = "one";
    }
  };
  // Add an event listener for the "form submit success" event
  MktoForms2.whenReady((form) => {
    form.addHiddenFields({
      //These are the values which will be submitted to Marketo
      history: csv,
    });
    form.onSuccess(handleFormSubmit);
  });
  // checkHistory()
});