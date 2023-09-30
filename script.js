const searchBtn = document.querySelector(".search-btn");
const resultContainer = document.querySelector(".player-container");
const modalBody = document.querySelector(".modal-body");

searchBtn.addEventListener("click", function () {
  const search = document.querySelector(".input-keyword").value;
  fetch("https://www.amiiboapi.com/api/amiibo/?name=" + search)
    .then((response) => response.json())
    .then((response) => {
      const game = response.amiibo;
      console.log(game)
      let cards = "";
      game.forEach((m) => (cards += showCards(m)));
      resultContainer.innerHTML = cards;

      // Detail Modal
      const modalButton = document.querySelectorAll(".modal-detail-button");
      modalButton.forEach((btn) => {
        btn.addEventListener("click", function () {
          const imdbid = this.dataset.imdbid;
          console.log(this)
          fetch("https://www.amiiboapi.com/api/amiibo/?tail=" + imdbid)
            .then((response) => response.json())
            .then((response) => response.amiibo[0])
            .then(m => {
              console.log(m)
              const movieDetail = showPlayerDetails(m);
              modalBody.innerHTML = movieDetail;
            })
        });
      });
    });
});

function showPlayerDetails(m) {
  return ` <div class="container-fluid">
    <div class="row">
      <div class="col-md-3">
        <img src="${m.Poster}" class="img-fluid" alt="" />
      </div>
      <div class="col-md">
        <ul class="list-group">
          <li class="list-group-item"><h4>${m.name}</h4></li>
          <li class="list-group-item"><h5>${m.name}</h5></li>
          <li class="list-group-item"><strong>amiiboSeries :</strong> ${m.amiiboSeries}</li>
          <li class="list-group-item"><strong>character :</strong> ${m.character}</li>
          <li class="list-group-item"><strong>gameSeries :</strong> ${m.gameSeries}</li>
          <li class="list-group-item"><strong>release :</strong> ${m.release.na}</li>
          <li class="list-group-item">
            <strong>Plot :</strong><br />
            ${m.release.jp}
          </li>
        </ul>
      </div>
              </div>
    </div>`;
}

function showCards(m) {
  return `<div class="col-md-4 my-3">
          <div class="card">
            <img src="${m.image}" class="card-img-top" alt="" />
            <div class="card-body">
              <h5 class="card-title">${m.name}</h5>
              <h6 class="card-subtitle mb-2 text-muted">${m.release.na}</h6>
              <button href="#" data-toggle="modal" data-target="#movieDetailModal" class="modal-detail-button btn btn-primary" data-imdbid="${m.tail}">Show Details</button>
            </div>
          </div>
        </div>`;
}