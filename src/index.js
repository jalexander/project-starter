import './index.css';

import { getArt } from './api/artApi'

// populate table of art from API
getArt().then(result => {
  let artBody = '';

  result.forEach(art => {
    artBody += `<tr>
      <td><a href="#" data-id="${art.id}" class="deleteArt">Delete</a></td>
      <td>${art.id}</td>
      <td>${art.year}</td>
      <td>${art.title}</td>
      <td>${art.lat}</td>
      <td>${art.lon}</td>
      <td>${art.location}</td>
      </tr>`
  });

  global.document.getElementById('art').innerHTML = artBody;
});
