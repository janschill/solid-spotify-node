(() => {
  document.addEventListener("DOMContentLoaded", () => {
    const $saveToPodButton = document.querySelector(".save-to-pod-button");

    $saveToPodButton.addEventListener("click", event => {
      event.preventDefault();

      fetch("/api/save")
    })
  })
})();
