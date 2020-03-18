
let popup = document.getElementById('popup');
let modalContainer = document.getElementById('modal-container');
let buttonTarget = document.getElementById('button-target');
let cross = document.getElementById('cross');


buttonTarget.addEventListener('click', openModal);
cross.addEventListener('click', closeModal);

   function openModal() {
    popup.style.display = 'block';
    modalContainer.style.display = 'block';
  }

  function closeModal() {
    popup.style.display = 'none';
    modalContainer.style.display = 'none';
  }


