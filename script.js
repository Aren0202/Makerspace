const video1 = document.getElementById("video1");
const video2 = document.getElementById("video2");

function stopAllVideos() {
  [video1, video2].forEach(video => {
    video.pause();
    video.currentTime = 0;
    video.style.display = "none";
  });
}

function playVideo(number) {
  stopAllVideos();
  const vid = number === 1 ? video1 : video2;
  vid.style.display = "block";
  vid.load(); // belangrijk voor sommige tablets
  vid.play();
}

// Luisteren naar Firebase (tablet)
firebase.database().ref("action").on("value", (snapshot) => {
  const val = snapshot.val();
  if (val === "left") playVideo(1);
  if (val === "right") playVideo(2);
});

// Verzenden vanuit Makey Makey (laptop)
document.addEventListener("keydown", function(e) {
  if (e.key === "ArrowLeft") {
    firebase.database().ref("action").set("left");
    setTimeout(() => location.reload(), 500); // vernieuw pagina na 0,5 sec
  } else if (e.key === "ArrowRight") {
    firebase.database().ref("action").set("right");
    setTimeout(() => location.reload(), 500); // vernieuw pagina na 0,5 sec
  }
});
