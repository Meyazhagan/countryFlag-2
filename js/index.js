function createCard(element) {
  return `<div class="card">
  <img
    src="${element.flag}"
    alt=""
    class="flag"
  />
  <div class="content">
      <h2>${element.name}</h2>
      <p><span class="bold">Population : </span>${element.population}</p>
      <p><span class="bold">Region : </span>${element.region}</p>
      <p><span class="bold">Captial :</span> ${element.capital}</p>
  </div>
  </div>`;
}

function createCards(elements) {
  const container = document.querySelector(".container");
  container.innerHTML = "";
  for (let i = 0; i < elements.length; i++) {
    container.innerHTML += createCard(elements[i]);
  }

  document.body.appendChild(container);
}

const asia = fetch("https://restcountries.eu/rest/v2/region/asia").then(
  (data) => data.json()
);

const europe = fetch("https://restcountries.eu/rest/v2/region/europe").then(
  (data) => data.json()
);

Promise.all([asia, europe])
  .then((countries) =>
    countries.reduce((prev, accu) => {
      return prev.concat(accu);
    }, [])
  )
  .then((country) => createCards(country));

fetch("https://restcountries.eu/rest/v2/lang/spa")
  .then((data) => data.json())
  .then((country) => {
    const container = document.createElement("div");
    container.className = "container";
    country.forEach((element) => {
      container.innerHTML += createCard(element);
    });
    document.body.innerHTML += `<h2 id="spanish">Spanish Speaking Country`;
    document.body.append(container);
  });
