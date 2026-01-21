const email = '{{email}}'.split('@').join(' ');
	
function makeSafe(text) {
	return text.replace(/([^a-zA-Z0-9\n])/g, "\\$1");
}

const htmlElement = document.documentElement;	
const hoverLine = document.getElementById('hover-line');
const separators = document.querySelectorAll('.separator');
const headerItems = document.querySelectorAll('.header-item');
var headerRect = document.querySelector('header').getBoundingClientRect()
$(window).on('resize', function() {
	headerRect = document.querySelector('header').getBoundingClientRect();
});
window.addEventListener('scroll', setScrollVar);
window.addEventListener('resize', setScrollVar);

function setScrollVar()
{
	if ((navigator.userAgentData && navigator.userAgentData.mobile) || window.innerWidth <= 800) {
		window.location.replace("./mobile.html");
	}
	const scrollPercent = htmlElement.scrollTop / htmlElement.clientHeight;
	var itemBottomY = headerRect.top + headerRect.height - hoverLine.getBoundingClientRect().height;
	htmlElement.style.setProperty('--quantity', $('.header-item').length);
}

setScrollVar();

// Function to download data to a file
$('#save-file').click(function()
{
	let result = '';
	$('#node-container')[0].contentWindow.nodes.forEach((node) => {result += (`$('#node-container')[0].contentWindow.createNode([${node.deleted ? undefined : $('#node-container')[0].contentWindow.nodeContainer.childNodes[node.id - 1].getBoundingClientRect().left}, ${node.deleted ? undefined : $('#node-container')[0].contentWindow.nodeContainer.childNodes[node.id - 1].getBoundingClientRect().top}], '${node.label}', ${JSON.stringify(node.fieldsLeft)}, ${JSON.stringify(node.fieldsRight)}, ${node.calculateRightValues.toString()}, type=${(typeof(node.type) == 'number') ? node.type : '"' + makeSafe(node.type) +'"'}, value=${node.value.toString()}, connectedNodes=[${[...node.connectedNodes]}], id=${node.id});\n`)});
	result += "$('#node-container')[0].contentWindow.connections = " + JSON.stringify($('#node-container')[0].contentWindow.connections) + ';\n';
	result += (`insertTextAtCursor(editor, \`${makeSafe(editor.getValue())}\`);\n`)
	document.querySelectorAll('.note').forEach((element) => {result += `createNote("${makeSafe(element.querySelector('.editable').innerHTML)}");\n`});
	var file = new Blob([result], {type: 'text/plain'});
	if (window.navigator.msSaveOrOpenBlob) // IE10+
		window.navigator.msSaveOrOpenBlob(file, 'Project.nnc1');
	else { // Others
		var a = document.getElementById('save-file'),
				url = URL.createObjectURL(file);
		console.log(url);
		a.setAttribute('href', url);
		a.setAttribute('download', 'Project.nnc1');
	}
});

$('.close-button').click(function(){
	$('.glass').hide();
});