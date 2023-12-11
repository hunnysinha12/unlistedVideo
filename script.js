const API_KEY = "AIzaSyBWb8LH_66cpYkFv8DoQkJqok93Bq4TFwg";
const VIDEO_ID = "UCXUhFKa6PgG0sVOgXKus5pw";

let player;

function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    height: "100%",
    width: "100%",
    videoId: VIDEO_ID,
    playerVars: {
      autoplay: 0,
      controls: 1,
      rel: 0,
      showinfo: 0,
      modestbranding: 1,
      playsinline: 1,
    },
  });
}

function fetchVideoDetails() {
  const apiUrl = `https://www.googleapis.com/youtube/v3/videos?id=${VIDEO_ID}&key=${API_KEY}&part=snippet,contentDetails,status`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data.items.length > 0) {
        const videoTitle = data.items[0].snippet.title;
        document.title = videoTitle;
      }
    })
    .catch((error) => console.error("Error fetching video details:", error));
}

(function () {
  const script = document.createElement("script");
  script.src = "https://www.youtube.com/iframe_api";
  document.head.appendChild(script);

  script.onload = function () {
    fetchVideoDetails();
  };
})();
