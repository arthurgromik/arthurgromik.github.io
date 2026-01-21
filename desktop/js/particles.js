particlesJS('particles-js', {
	particles: {
		number: {
			value: 60,
			density: {
			enable: true,
			value_area: 800,
			},
		},
		color: {
			value: ['#ff595e', 'ffca3a', '00ff00', '1982c4'],
		},
		linecolor: '#000000',
		shape: {
			type: 'circle',
			polygon: {
			nb_sides: 5,
			},
		},
		opacity: {
			value: 0.9,
			random: false,
			anim: {
			enable: false,
			speed: 1,
			opacity_min: 0.9,
			sync: false,
			},
		},
		size: {
			value: 20,
			random: true,
			anim: {
			enable: false,
			speed: 40,
			size_min: 20,
			sync: false,
			},
		},
	},
});
// Initialize CodeMirror with dark theme
var editor = CodeMirror(document.getElementById("codeEditor"), {
	value: "",
	mode: "python",
	lineNumbers: true,
	theme: "monokai", // Use the dark theme
	gutters: ["CodeMirror-linenumbers", "CodeMirror-gutters"],
	lineWrapping: true,
	tabSize: 4,
	indentWithTabs: true,
	readOnly: false,
});

function insertTextAtCursor(editor, text) {
	editor.setValue("");
	var doc = editor.getDoc();
	var cursor = doc.getCursor();
	doc.replaceRange(text, cursor);
}