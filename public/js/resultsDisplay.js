function openCanvas() {
  document.getElementById("results").style.width = "100%";
}

function closeCanvas() {
  document.getElementById("results").style.width = "0";
  document.getElementById("location-header").innerHTML = "#";
  document.getElementById("summary").innerHTML = "#";
}
