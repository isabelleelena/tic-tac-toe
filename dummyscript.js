noughtsPlayer.addEventListener('click', () => {
         if (noughtsPlayer.dataset.active === "true") {
             noughtsPlayer.dataset.active = 'false';
             crossesPlayer.dataset.active = "true";
             crossesPlayer.style.backgroundColor = "red"
             noughtsPlayer.style.backgroundColor = "white";
         }
         else if (noughtsPlayer.dataset.active === "false") {
             noughtsPlayer.dataset.active = "true";
             crossesPlayer.dataset.active = "false";
             noughtsPlayer.style.backgroundColor = "red"
             crossesPlayer.style.backgroundColor = "white";
         }
     })

     crossesPlayer.addEventListener('click', () => {
         if (crossesPlayer.dataset.active === 'false') {
             noughtsPlayer.dataset.active = "false";
             crossesPlayer.dataset.active = "true";
             crossesPlayer.style.backgroundColor = "red"
             noughtsPlayer.style.backgroundColor = "white";
         }
         else if (crossesPlayer.dataset.active === 'true') {
             noughtsPlayer.dataset.active = "true";
             crossesPlayer.dataset.active = "false";
             noughtsPlayer.style.backgroundColor = "red"
             crossesPlayer.style.backgroundColor = "white";
         }
     })