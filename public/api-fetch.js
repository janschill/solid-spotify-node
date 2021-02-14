(() => {
  document.addEventListener("DOMContentLoaded", () => {
    console.log("API ready")

    function htmlNodeForTrack(track) {
      const $li = document.createElement("li");
      const $img = document.createElement("img");
      const $a = document.createElement("a");
      $li.append($a);
      $a.append($img)
      $a.href = track["external_urls"].spotify;
      $a.setAttribute("target", "_blank")
      $li.classList.add("track-list")
      $img.src = track["images"][0]["url"];
      $img.classList.add("track-cover")

      return $li;
    }

    const $recentTracksUl = document.querySelector(".top-artists");

    fetch("api/top-artists")
      .then(response => response.json())
      .then(data => {
        console.log(data[0])
        data.forEach(track => {
          $recentTracksUl.append(htmlNodeForTrack(track))
        });
        console.log(data)
      })
  })
})();

