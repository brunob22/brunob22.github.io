let map = L.map('map').setView([53.430127, 14.564802], 18);
L.tileLayer.provider('Esri.WorldImagery').addTo(map);
let marker = L.marker([53.430127, 14.564802]).addTo(map);



document.getElementById("btnLocation").addEventListener("click", function() {
  if (!navigator.geolocation) {
    alert("Twoja przeglądarka nie wspiera geolokalizacji");
    return;
  }
  navigator.geolocation.getCurrentPosition((position) => {

    document.getElementById("locationInfo").innerText =
      "Szerokość: " + position.coords.latitude + ", Długość: " + position.coords.longitude;

    map.setView([position.coords.latitude, position.coords.longitude], 18);

    marker.setLatLng([position.coords.latitude, position.coords.longitude]);

  }, (error) => {
    console.error(error);
  }, {
    enableHighAccuracy: false
  });
});



document.getElementById("btnSaveRaster").addEventListener("click", function() {
  requestNotificationPermission();
  leafletImage(map, function (err, canvas) {

    let rasterMap = document.getElementById("rasterMap");
    let rasterContext = rasterMap.getContext("2d");
    rasterContext.drawImage(canvas, 0, 0, 320, 320);

    generatePuzzles();
  });
});



function requestNotificationPermission() {
  if ("Notification" in window) {
    Notification.requestPermission().then(function (permission) {
      if (permission === "granted") {
        console.log("Zgoda na powiadomienia udzielona");
      }
    });
  }
}



function generatePuzzles() {
  let rasterMap = document.getElementById("rasterMap");
  let board = document.getElementById("puzzleBoard");
  let target = document.getElementById("puzzleTarget");

  board.innerHTML = "";
  target.innerHTML = "";

  let gridSize = 4;
  let pieceSize = 320 / gridSize;

  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      let slot = document.createElement("div");
      slot.className = "puzzle-slot";
      slot.style.left = (x * pieceSize) + "px";
      slot.style.top = (y * pieceSize) + "px";

      slot.dataset.correctPosition = (x + y * gridSize).toString();

      target.appendChild(slot);
    }
  }

  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {

      let pieceCanvas = document.createElement("canvas");
      pieceCanvas.className = "puzzle-piece";
      pieceCanvas.width = pieceSize;
      pieceCanvas.height = pieceSize;

      let ctx = pieceCanvas.getContext("2d");
      ctx.drawImage(
        rasterMap,
        x * pieceSize, y * pieceSize, pieceSize, pieceSize,
        0, 0, pieceSize, pieceSize
      );

      pieceCanvas.dataset.correctPosition = (x + y * gridSize).toString();
      pieceCanvas.id = "piece" + (x + y * gridSize);

      pieceCanvas.draggable = true;

      pieceCanvas.addEventListener("dragstart", function(event) {
        event.dataTransfer.setData("text", this.dataset.correctPosition);
      });


      pieceCanvas.style.left = Math.random() * (320 - pieceSize) + "px";
      pieceCanvas.style.top = Math.random() * (320 - pieceSize) + "px";
      board.appendChild(pieceCanvas);
    }
  }

  let slots = document.querySelectorAll(".puzzle-slot");
  for (let slot of slots) {

    slot.addEventListener("dragover", function(event) {
      event.preventDefault();
    });

    slot.addEventListener("drop", function(event) {
      event.preventDefault();

      let draggedPieceId = event.dataTransfer.getData("text");

      let draggedPiece = document.getElementById("piece" + draggedPieceId);

      if (draggedPiece) {
        if (this.children.length > 0) {
          let oldPiece = this.children[0];
          board.appendChild(oldPiece);
          oldPiece.style.left = Math.random() * (320 - pieceSize) + "px";
          oldPiece.style.top = Math.random() * (320 - pieceSize) + "px";
        }

        this.appendChild(draggedPiece);

        draggedPiece.style.left = "0px";
        draggedPiece.style.top = "0px";

        checkWin();
      }
    });
  }
}



function checkWin() {
  let slots = document.querySelectorAll(".puzzle-slot");
  let correctCount = 0;

  for (let slot of slots) {
    if (slot.children.length > 0) {
      let piece = slot.children[0];
      if (piece.dataset.correctPosition === slot.dataset.correctPosition) {
        correctCount++;
      }
    }
  }

  if (correctCount === slots.length) {
    console.log("Wszystkie puzzle ułożone poprawnie!");
    if (Notification.permission === "granted") {
      new Notification("Wszystkie puzzle ułożone poprawnie!");
    }
  }
}
