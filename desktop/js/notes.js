var hiddenWindows = [];
	
// Make the note elements draggable
function dragElement(elmnt) {
	const notesContainer = document.getElementById('notes-container');
	let x0 = (notesContainer.offsetWidth - elmnt.offsetWidth) / 2, y0 = (notesContainer.offsetHeight - elmnt.offsetHeight) / 2;
	elmnt.style.left = x0;
	elmnt.style.top = y0;
	let offsetX, offsetY;
	var header = elmnt.querySelector(".note-header");
	header.addEventListener('mousedown', dragMouseDown);

	function dragMouseDown(e) {
		e.preventDefault();
		offsetX = e.clientX - elmnt.getBoundingClientRect().left;
		offsetY = e.clientY - elmnt.getBoundingClientRect().top;
		header.addEventListener('mousemove', elementDrag);
		header.addEventListener('mouseup', function()
		{
			header.removeEventListener('mousemove', elementDrag);
		});
	}

	function elementDrag(e) {
		e = e || window.event;
		e.preventDefault();
		const x = e.clientX - offsetX + notesContainer.scrollLeft - x0;
		const y = e.clientY - offsetY + notesContainer.scrollTop - y0;
		// set the element's new position:
		elmnt.style.transform = `translate(${x}px, ${y}px)`;
	}
}

function createNote(content="Editable content") {
	// Create note container
	var noteContainer = document.createElement("div");
	noteContainer.className = "note";
	document.getElementById('notes-container').appendChild(noteContainer);

	// Create note header
	var noteHeader = document.createElement("div");
	noteHeader.className = "note-header";
	noteContainer.appendChild(noteHeader);

	// Create note title
	var noteTitle = document.createElement("div");
	noteTitle.className = "note-title";
	noteTitle.innerHTML = `Note #${$('#notes-container > .note').length}`;
	noteHeader.appendChild(noteTitle);

	// Create note controls
	var noteControls = document.createElement("div");
	noteControls.className = "note-controls";
	noteHeader.appendChild(noteControls);

	// Create minimize button
	var minimizeButton = document.createElement("button");
	minimizeButton.innerHTML = "-";
	minimizeButton.onclick = function () {
	noteContainer.style.display = "none";
	hiddenWindows.push(noteContainer);
	updateTray();
	};
	noteControls.appendChild(minimizeButton);

	// Create editable content
	var editableContent = document.createElement("div");
	editableContent.contentEditable = true;
	editableContent.className = "editable";
	editableContent.innerHTML = content;
	noteContainer.appendChild(editableContent);

	// Make note draggable
	dragElement(noteContainer);
}

// Create tray to show hidden windows
var tray = document.getElementById('tray');
//tray.className = "tray";

function updateTray() {
	// Clear existing tray items
	tray.innerHTML = "";

	// Add tray items for each hidden window
	hiddenWindows.forEach(function (window) {
		var trayItem = document.createElement("a");
		trayItem.className = "tray-item";
		trayItem.setAttribute('href', '#');
		trayItem.innerHTML = window.querySelector(".note-title").innerHTML;
		trayItem.onclick = function () {
			showWindow(window);
		};
		tray.appendChild(trayItem);
	});
}

function showWindow(window) {
	// Show the corresponding hidden window
	window.style.display = "block";
	// Remove the window from the list of hidden windows
	hiddenWindows = hiddenWindows.filter(function (w) {
		return w !== window;
	});
	updateTray();
}