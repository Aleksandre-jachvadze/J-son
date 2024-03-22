document.addEventListener("DOMContentLoaded", () => {
  const sortButton = document.getElementById("sortButton");
  const searchInput = document.getElementById("searchInput");
  const dataOutput = document.getElementById("data-output");
  let ascendingOrder = true;
  let informationData = [];

  const fetchDataAndPopulateTable = () => {
      fetch("information.json")
          .then(response => response.json())
          .then(information => {
              informationData = information;

              const sortedInformation = ascendingOrder ?
                  information.sort((a, b) => a.name.localeCompare(b.name)) :
                  information.sort((a, b) => b.name.localeCompare(a.name));

              const sortedHTML = sortedInformation.map(info => `
                  <tr>
                      <td>${info.name}</td>
                      <td>${info.date}</td>
                      <td>${info.title}</td>
                      <td>${info.amount}</td>
                      <td><div class="danger">${info.status}</div></td>
                  </tr>
              `).join('');

              dataOutput.innerHTML = sortedHTML;
          })
          .catch(error => console.error("Error fetching or sorting data:", error));
  };

  const filterData = (searchTerm) => {
      const filteredData = informationData.filter(info =>
          info.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      const filteredHTML = filteredData.map(info => `
          <tr>
              <td>${info.name}</td>
              <td>${info.date}</td>
              <td>${info.title}</td>
              <td>${info.amount}</td>
              <td><div class="danger">${info.status}</div></td>
          </tr>
      `).join('');

      dataOutput.innerHTML = filteredHTML;
  };

  sortButton.addEventListener("click", () => {
      ascendingOrder = !ascendingOrder;
      fetchDataAndPopulateTable();
      sortButton.classList.toggle("rotate");
  });

  searchInput.addEventListener("input", () => {
      const searchTerm = searchInput.value.trim();
      filterData(searchTerm);
  });
  fetchDataAndPopulateTable();
});
  

