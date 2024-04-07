let currentDrag = null;
let currentlyResizing = false;
let currentResizeElement = null;
let startX, startY, startWidth, startHeight;

function dragStart(event) {
  currentDrag = event.target;
  if (event.target.id === 'navbar') {
    currentlyResizing = true;
    currentResizeElement = event.target;
    startX = event.clientX;
    startY = event.clientY;
    startWidth = event.target.offsetWidth;
    startHeight = event.target.offsetHeight;
    document.addEventListener('mousemove', resizeNavbar);
    document.addEventListener('mouseup', stopResizing);
  }
}

function dragOver(event) {
  event.preventDefault();
}

function drop(event) {
  event.preventDefault();
  const container = document.getElementById('container');
  container.appendChild(currentDrag);
  currentDrag.style.left = event.clientX - currentDrag.offsetWidth / 2 + 'px';
  currentDrag.style.top = event.clientY - currentDrag.offsetHeight / 2 + 'px';
}

function resizeNavbar(event) {
  if (currentlyResizing) {
    const newWidth = startWidth + event.clientX - startX;
    const newHeight = startHeight + event.clientY - startY;
    currentResizeElement.style.width = `${newWidth}px`;
    currentResizeElement.style.height = `${newHeight}px`;
  }
}

function stopResizing() {
  currentlyResizing = false;
  currentResizeElement = null;
  document.removeEventListener('mousemove', resizeNavbar);
  document.removeEventListener('mouseup', stopResizing);
}

// ... (the rest of the code remains the same)

function generateElement() {
  const searchInput = document.getElementById('searchInput');
  const searchTerm = searchInput.value.toLowerCase();

  const container = document.getElementById('container');

  if (searchTerm === 'navbar') {
    const navbar = createNavbar();
    navbar.setAttribute('draggable', 'true');
    navbar.addEventListener('dragstart', dragStart);
    container.appendChild(navbar);

    const buttons = navbar.querySelectorAll('button, a');
    buttons.forEach(button => {
      button.setAttribute('draggable', 'true');
      button.addEventListener('dragstart', dragStart);
    });
  } else if (searchTerm === 'card') {
    const card = createCard();
    card.setAttribute('draggable', 'true');
    card.addEventListener('dragstart', dragStart);
    container.appendChild(card);
  } else if (searchTerm === 'alert') {
    const alert = createAlert();
    alert.setAttribute('draggable', 'true');
    alert.addEventListener('dragstart', dragStart);
    container.appendChild(alert);
  } else if (searchTerm === 'button') {
    const button = createButton();
    button.setAttribute('draggable', 'true');
    button.addEventListener('dragstart', dragStart);
    container.appendChild(button);
  }
  // Add more cases for other Bootstrap components here
}

function createNavbar() {
  const navbar = document.createElement('nav');
  navbar.id = 'navbar';
  navbar.classList.add('navbar', 'navbar-expand-lg', 'navbar-light', 'bg-light');
  navbar.innerHTML = `
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item active">
          <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Features</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Pricing</a>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
        </li>
      </ul>
    </div>
  `;
  return navbar;
}

function createCard() {
  const card = document.createElement('div');
  card.id = 'card';
  card.classList.add('card');
  card.innerHTML = `
    <div class="card-body">
      <h5 class="card-title">Card title</h5>
      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      <a href="#" class="btn btn-primary">Go somewhere</a>
    </div>
  `;
  return card;
}

function createAlert() {
  const alert = document.createElement('div');
  alert.classList.add('alert', 'alert-primary');
  alert.setAttribute('role', 'alert');
  alert.textContent = 'This is an alert!';
  return alert;
}

function createButton() {
  const button = document.createElement('button');
  button.classList.add('btn', 'btn-primary');
  button.type = 'button';
  button.textContent = 'Button';
  return button;
}
function downloadHTML() {
  // Clone the document element
  const clonedDocument = document.documentElement.cloneNode(true);

  // Remove the search bar and download button from the cloned document
  const searchBar = clonedDocument.querySelector('#searchInput');
  const downloadButton = clonedDocument.querySelector('#download-button');
    const InstructionLine = clonedDocument.querySelector('#InstructionLine');

  searchBar.parentNode.removeChild(searchBar);
  downloadButton.parentNode.removeChild(downloadButton);
  InstructionLine.parentNode.removeChild(InstructionLine);

  // Get the HTML content of the modified document
  const htmlContent = clonedDocument.outerHTML;

  // Create the Blob and download link
  const blob = new Blob([htmlContent], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'page.html';
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 0);
}





// function downloadHTML() {
//   const htmlContent = document.documentElement.outerHTML;
//   const blob = new Blob([htmlContent], { type: 'text/html' });
//   const url = URL.createObjectURL(blob);
//   const a = document.createElement('a');
//   a.href = url;
//   a.download = 'page.html';
//   document.body.appendChild(a);
//   a.click();
//   setTimeout(() => {
//     document.body.removeChild(a);
//     URL.revokeObjectURL(url);
//   }, 0);
// }

document.addEventListener('dragover', dragOver);
document.addEventListener('drop', drop);