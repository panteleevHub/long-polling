const clientsBox = document.querySelector('.clients');

fetch('/clients/update')
   .then(response => response.json())
   .then(applyClients)
   .catch(e => {
      if(e.code !== 200){
         throw e;
      }
   })

   function applyClients(clients) {
   const p = document.createElement('p');
   p.innerHTML = JSON.stringify(clients, null, '\t');
   p.style.whiteSpace = 'pre-wrap';
   clientsBox.append(p);
}