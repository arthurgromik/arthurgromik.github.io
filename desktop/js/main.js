var restrictTyping = (event, val) => {
	if (!(new RegExp(`^[${val}]+$`)).test(String.fromCharCode(!event.charCode ? event.which : event.charCode)))
	{
		event.preventDefault();
		return false;
	}
}

function adjustCodeEditorScale()
{
	const codeEditor = $('#code-editor')[0];
	if (document.fullscreenEnabled && !document.fullscreenElement)
	{
		const rFS = codeEditor.mozRequestFullScreen || codeEditor.webkitRequestFullscreen || codeEditor.requestFullscreen;
		rFS.call(codeEditor);
		$('.CodeMirror-scroll, .CodeMirror-gutter, #code-editor').css('background-color', '#2e2e2e');
		$('#fullscreen').html(`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-fullscreen-exit" viewBox="0 0 16 16">
							<path d="M5.5 0a.5.5 0 0 1 .5.5v4A1.5 1.5 0 0 1 4.5 6h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5m5 0a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 10 4.5v-4a.5.5 0 0 1 .5-.5M0 10.5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 6 11.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5m10 1a1.5 1.5 0 0 1 1.5-1.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0z"/>
						</svg>`);
	} else if(document.fullscreenEnabled)
	{
		document.exitFullscreen();
		$('.CodeMirror-scroll, .CodeMirror-gutter, #code-editor').css('background-color', '#555555');
		$('#fullscreen').html(`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-fullscreen" viewBox="0 0 16 16">
							<path d="M1.5 1a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4A1.5 1.5 0 0 1 1.5 0h4a.5.5 0 0 1 0 1zM10 .5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 16 1.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5M.5 10a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 0 14.5v-4a.5.5 0 0 1 .5-.5m15 0a.5.5 0 0 1 .5.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5"/>
						</svg>`);
	} else
	{
		alert('Your browser does not support fullscreen mode!');
	}
}

function addNode()
{
	$('#other-parameters').html('');
	$('#select').val('');
	$('.glass:eq(0)').css('display', 'flex');
}

const selectElement = document.getElementById('select');
const remainingContent = document.getElementById('other-parameters');

function addFields(fields, id)
{
	let result = '';
	for(let property in fields)
	{
		let val = fields[property];
		switch(typeof(val))
		{
			case 'string':
				result += `<div class="control">
					<label for="control-div-${property.toLocaleLowerCase().replace(/\s/g, '-')}-field">${property}:</label>
					<input type="text" id="control-div-${property.toLocaleLowerCase().replace(/\s/g, '-')}-field" onkeypress="restrictTyping(event, '${val}')" autocomplete="off">
				</div>\n`;
				break;
			case 'object':
				result += `<div class="control">
					<label for="control-div-${property.toLocaleLowerCase().replace(/\s/g, '-')}-field">${property}:</label>
					<select id="control-div-${property.toLocaleLowerCase().replace(/\s/g, '-')}-field">
						${val.map((item) => ('<option value="' + item + '">' + item + '</option>')).join('\n')}
					</select>
				</div>\n`;
				break;
		}
	}

	result += '<div class="control">\n<input type="submit" id="submit" value="OK" onclick="closeMyself(' + id + ');">\n</div>';
	return result;
}


function updateContents(event, directValue=undefined)
{
	const selectedValue = event.target.value || directValue;

	switch (selectedValue) {
		case 'Dataset':
			remainingContent.innerHTML = addFields({'Name': ['mnist', 'fashion_mnist', 'boston_housing', 'cifar10', 'cifar100', 'imdb', 'reuters'], 'X train Variable': 'A-Za-z_', 'Y train Variable': 'A-Za-z_', 'X test Variable': 'A-Za-z_', 'Y test Variable': 'A-Za-z_'}, 0);
			break;
		case 'Input Layer':
			remainingContent.innerHTML = addFields({'Shape': '0-9,', 'Variable': 'A-Za-z_'}, 1);
			break;
		case 'Dense Layer':
			remainingContent.innerHTML = addFields({'Shape': '0-9', 'Variable': 'A-Za-z_'}, 2);
			break;
		case 'Convolutional Layer (1D)':
			remainingContent.innerHTML = addFields({'Filters': '0-9', 'Kernels': '0-9', 'Variable': 'A-Za-z_'}, 3);
			break;
		case 'Convolutional Layer (2D)':
			remainingContent.innerHTML = addFields({'Filters': '0-9', 'Kernels': '0-9,', 'Variable': 'A-Za-z_'}, 4);
			break;
		case 'Convolutional Layer (3D)':
			remainingContent.innerHTML = addFields({'Filters': '0-9', 'Kernels': '0-9,', 'Variable': 'A-Za-z_'}, 5);
			break;
		case 'TransConv Layer (1D)':
			remainingContent.innerHTML = addFields({'Filters': '0-9', 'Kernels': '0-9', 'Variable': 'A-Za-z_'}, 6);
			break;
		case 'TransConv Layer (2D)':
			remainingContent.innerHTML = addFields({'Filters': '0-9', 'Kernels': '0-9,', 'Variable': 'A-Za-z_'}, 7);
			break;
		case 'TransConv Layer (3D)':
			remainingContent.innerHTML = addFields({'Filters': '0-9', 'Kernels': '0-9,', 'Variable': 'A-Za-z_'}, 8);
			break;
		case 'Reshape Layer':
			remainingContent.innerHTML = addFields({'Target shape': '0-9,-', 'Variable': 'A-Za-z_'}, 9);
			break;
		case 'MaxPooling Layer (1D)':
			remainingContent.innerHTML = addFields({'Pool size': '0-9', 'Variable': 'A-Za-z_'}, 10);
			break;
		case 'MaxPooling Layer (2D)':
			remainingContent.innerHTML = addFields({'Pool size': '0-9,', 'Variable': 'A-Za-z_'}, 11);
			break;
		case 'MaxPooling Layer (3D)':
			remainingContent.innerHTML = addFields({'Pool size': '0-9,', 'Variable': 'A-Za-z_'}, 12);
			break;
		case 'AvgPooling Layer (1D)':
			remainingContent.innerHTML = addFields({'Pool size': '0-9', 'Variable': 'A-Za-z_'}, 13);
			break;
		case 'AvgPooling Layer (2D)':
			remainingContent.innerHTML = addFields({'Pool size': '0-9,', 'Variable': 'A-Za-z_'}, 14);
			break;
		case 'AvgPooling Layer (3D)':
			remainingContent.innerHTML = addFields({'Pool size': '0-9,', 'Variable': 'A-Za-z_'}, 15);
			break;
		case 'Flatten Layer':
			remainingContent.innerHTML = addFields({'Variable': 'A-Za-z_'}, 16);
			break;
		case 'Activation Layer':
			remainingContent.innerHTML = addFields({'Activation': ['elu', 'exponential', 'gelu', 'hard_sigmoid', 'linear', 'mish', 'relu', 'selu', 'sigmoid', 'softmax', 'softplus', 'softsign', 'swish', 'tanh'], 'Variable': 'A-Za-z_'}, 17);
			break;
		case 'Compile the Model':
			remainingContent.innerHTML = addFields({'Loss function': ['BinaryCrossentropy', 'BinaryFocalCrossentropy', 'CategoricalCrossentropy', 'CategoricalFocalCrossentropy', 'CategoricalHinge', 'CosineSimilarity', 'Hinge', 'Huber', 'KLDivergence', 'LogCosh', 'MeanAbsoluteError', 'MWDU5HxoiDHnyyy4cSHkqNChfofHbxuXFr', 'MeanSquaredError', 'MeanSquaredLogarithmicError', 'Poisson', 'SparseCategoricalCrossentropy', 'SquaredHinge'], 'Optimizer': ['Adadelta', 'Adafactor', 'Adagrad', 'Adam', 'AdamW', 'Adamax', 'Ftrl', 'Lion', 'Nadam', 'RMSprop', 'SGD'], 'Learning rate': '0-9.', 'Variable': 'A-Za-z_'}, 18);
			break;
		case 'Model Fit':
			remainingContent.innerHTML = addFields({'Batch size': '0-9', 'Epochs': '0-9'}, 19);
			break;
		case 'Model Evaluate':
			remainingContent.innerHTML = addFields({'Batch size': '0-9'}, 20);
			break;
		case 'Save the Model':
			remainingContent.innerHTML = addFields({'File name': 'A-Za-z_0-9'}, 21);
			break;
		case 'Load the Model':
			remainingContent.innerHTML = addFields({'File name': 'A-Za-z_0-9', 'Variable': 'A-Za-z_'}, 22);
			break;
		default:
			remainingContent.innerHTML = `
				<h2>Invalid input! (select an option from the list below)</h2>
			`;
			break;
	}
}

selectElement.addEventListener('click', updateContents);

function closeMyself(sender) {
	const randInt = (number) => (Math.floor(number * Math.random()));
	switch(sender)
	{
		case 0:
			handleResult(`$('#node-container')[0].contentWindow.createNode([${randInt($('#node-container')[0].offsetWidth)}, ${randInt($('#node-container')[0].offsetHeight)}], '(Dataset) (${$('#control-div-name-field')[0].value})', [], ['${$('#control-div-x-train-variable-field')[0].value}', '${$('#control-div-y-train-variable-field')[0].value}', '${$('#control-div-x-test-variable-field')[0].value}', '${$('#control-div-y-test-variable-field')[0].value}'], (a) => (['${$('#control-div-x-train-variable-field')[0].value}', '${$('#control-div-y-train-variable-field')[0].value}', '${$('#control-div-x-test-variable-field')[0].value}', '${$('#control-div-y-test-variable-field')[0].value}']), type=0, value=((a) => 'from tensorflow.keras.datasets import ${$('#control-div-name-field')[0].value}\\n(${$('#control-div-x-train-variable-field')[0].value}, ${$('#control-div-y-train-variable-field')[0].value}), (${$('#control-div-x-test-variable-field')[0].value}, ${$('#control-div-y-test-variable-field')[0].value}) = ${$('#control-div-name-field')[0].value}.load_data()\\n\\n'));`);
			break;
		case 1:
			handleResult(`$('#node-container')[0].contentWindow.createNode(
				[${randInt($('#node-container')[0].offsetWidth)}, ${randInt($('#node-container')[0].offsetHeight)}],
				"(Input) (${$('#control-div-shape-field')[0].value})", [], ['${$('#control-div-variable-field')[0].value}'], (a) => (['${$('#control-div-variable-field')[0].value}']), type=1, value=((a) => ('${$('#control-div-variable-field')[0].value} = keras.Input(shape=(${$('#control-div-shape-field')[0].value}))\\n')));`);
			break;
		case 2:
			handleResult(`$('#node-container')[0].contentWindow.createNode([${randInt($('#node-container')[0].offsetWidth)}, ${randInt($('#node-container')[0].offsetHeight)}], '(Dense) (${$('#control-div-shape-field')[0].value})', ['neurons'], ['${$('#control-div-variable-field')[0].value}'], (a) => (['${$('#control-div-variable-field')[0].value}']), type=2, value=((a) => ('${$('#control-div-variable-field')[0].value}' + ' = layers.Dense(${$('#control-div-shape-field')[0].value})(' + a[0] + ')\\n')));`);
			break;
		case 3:
			handleResult(`$('#node-container')[0].contentWindow.createNode([${randInt($('#node-container')[0].offsetWidth)}, ${randInt($('#node-container')[0].offsetHeight)}], '(Conv 1D) (${$('#control-div-filters-field')[0].value}, ${$('#control-div-kernels-field')[0].value})', ['neurons'], ['${$('#control-div-variable-field')[0].value}'], (a) => (['${$('#control-div-variable-field')[0].value}']), type=3, value=((a) => ('${$('#control-div-variable-field')[0].value}' + ' = layers.Conv1D(${$('#control-div-filters-field')[0].value}, ${$('#control-div-kernels-field')[0].value})(' + a[0] + ')\\n')));`);
			break;
		case 4:
			handleResult(`$('#node-container')[0].contentWindow.createNode([${randInt($('#node-container')[0].offsetWidth)}, ${randInt($('#node-container')[0].offsetHeight)}], '(Conv 2D) (${$('#control-div-filters-field')[0].value}, ${$('#control-div-kernels-field')[0].value})', ['neurons'], ['${$('#control-div-variable-field')[0].value}'], (a) => (['${$('#control-div-variable-field')[0].value}']), type=4, value=((a) => ('${$('#control-div-variable-field')[0].value}' + ' = layers.Conv2D(${$('#control-div-filters-field')[0].value}, (${$('#control-div-kernels-field')[0].value}))(' + a[0] + ')\\n')));`);
			break;
		case 5:
			handleResult(`$('#node-container')[0].contentWindow.createNode([${randInt($('#node-container')[0].offsetWidth)}, ${randInt($('#node-container')[0].offsetHeight)}], '(Conv 3D) (${$('#control-div-filters-field')[0].value}, ${$('#control-div-kernels-field')[0].value})', ['neurons'], ['${$('#control-div-variable-field')[0].value}'], (a) => (['${$('#control-div-variable-field')[0].value}']), type=5, value=((a) => ('${$('#control-div-variable-field')[0].value}' + ' = layers.Conv3D(${$('#control-div-filters-field')[0].value}, (${$('#control-div-kernels-field')[0].value}))(' + a[0] + ')\\n')));`);
			break;
		case 6:
			handleResult(`$('#node-container')[0].contentWindow.createNode([${randInt($('#node-container')[0].offsetWidth)}, ${randInt($('#node-container')[0].offsetHeight)}], '(TransConv 1D) (${$('#control-div-filters-field')[0].value}, ${$('#control-div-kernels-field')[0].value})', ['neurons'], ['${$('#control-div-variable-field')[0].value}'], (a) => (['${$('#control-div-variable-field')[0].value}']), type=6, value=((a) => ('${$('#control-div-variable-field')[0].value}' + ' = layers.Conv1DTranspose(${$('#control-div-filters-field')[0].value}, ${$('#control-div-kernels-field')[0].value})(' + a[0] + ')\\n')));`);
			break;
		case 7:
			handleResult(`$('#node-container')[0].contentWindow.createNode([${randInt($('#node-container')[0].offsetWidth)}, ${randInt($('#node-container')[0].offsetHeight)}], '(TransConv 2D) (${$('#control-div-filters-field')[0].value}, ${$('#control-div-kernels-field')[0].value})', ['neurons'], ['${$('#control-div-variable-field')[0].value}'], (a) => (['${$('#control-div-variable-field')[0].value}']), type=7, value=((a) => ('${$('#control-div-variable-field')[0].value}' + ' = layers.Conv2DTranspose(${$('#control-div-filters-field')[0].value}, (${$('#control-div-kernels-field')[0].value}))(' + a[0] + ')\\n')));`);
			break;
		case 8:
			handleResult(`$('#node-container')[0].contentWindow.createNode([${randInt($('#node-container')[0].offsetWidth)}, ${randInt($('#node-container')[0].offsetHeight)}], '(TransConv 3D) (${$('#control-div-filters-field')[0].value}, ${$('#control-div-kernels-field')[0].value})', ['neurons'], ['${$('#control-div-variable-field')[0].value}'], (a) => (['${$('#control-div-variable-field')[0].value}']), type=8, value=((a) => ('${$('#control-div-variable-field')[0].value}' + ' = layers.Conv3DTranspose(${$('#control-div-filters-field')[0].value}, (${$('#control-div-kernels-field')[0].value}))(' + a[0] + ')\\n')));`);
			break;
		case 9:
			handleResult(`$('#node-container')[0].contentWindow.createNode([${randInt($('#node-container')[0].offsetWidth)}, ${randInt($('#node-container')[0].offsetHeight)}], '(Reshape) (${$('#control-div-target-shape-field')[0].value})', ['neurons'], ['${$('#control-div-variable-field')[0].value}'], (a) => (['${$('#control-div-variable-field')[0].value}']), type=9, value=((a) => ('${$('#control-div-variable-field')[0].value}' + ' = layers.Reshape((${$('#control-div-target-shape-field')[0].value}))(' + a[0] + ')\\n')));`);
			break;
		case 10:
			handleResult(`$('#node-container')[0].contentWindow.createNode([${randInt($('#node-container')[0].offsetWidth)}, ${randInt($('#node-container')[0].offsetHeight)}], '(MaxPooling 1D) (${$('#control-div-pool-size-field')[0].value})', ['neurons'], ['${$('#control-div-variable-field')[0].value}'], (a) => (['${$('#control-div-variable-field')[0].value}']), type=10, value=((a) => ('${$('#control-div-variable-field')[0].value}' + ' = layers.MaxPooling1D(${$('#control-div-pool-size-field')[0].value})(' + a[0] + ')\\n')));`);
			break;
		case 11:
			handleResult(`$('#node-container')[0].contentWindow.createNode([${randInt($('#node-container')[0].offsetWidth)}, ${randInt($('#node-container')[0].offsetHeight)}], '(MaxPooling 2D) (${$('#control-div-pool-size-field')[0].value})', ['neurons'], ['${$('#control-div-variable-field')[0].value}'], (a) => (['${$('#control-div-variable-field')[0].value}']), type=11, value=((a) => ('${$('#control-div-variable-field')[0].value}' + ' = layers.MaxPooling2D((${$('#control-div-pool-size-field')[0].value}))(' + a[0] + ')\\n')));`);
			break;
		case 12:
			handleResult(`$('#node-container')[0].contentWindow.createNode([${randInt($('#node-container')[0].offsetWidth)}, ${randInt($('#node-container')[0].offsetHeight)}], '(MaxPooling 3D) (${$('#control-div-pool-size-field')[0].value})', ['neurons'], ['${$('#control-div-variable-field')[0].value}'], (a) => (['${$('#control-div-variable-field')[0].value}']), type=12, value=((a) => ('${$('#control-div-variable-field')[0].value}' + ' = layers.MaxPooling3D((${$('#control-div-pool-size-field')[0].value}))(' + a[0] + ')\\n')));`);
			break;
		case 13:
			handleResult(`$('#node-container')[0].contentWindow.createNode([${randInt($('#node-container')[0].offsetWidth)}, ${randInt($('#node-container')[0].offsetHeight)}], '(AvgPooling 1D) (${$('#control-div-pool-size-field')[0].value})', ['neurons'], ['${$('#control-div-variable-field')[0].value}'], (a) => (['${$('#control-div-variable-field')[0].value}']), type=13, value=((a) => ('${$('#control-div-variable-field')[0].value}' + ' = layers.AveragePooling1D(${$('#control-div-pool-size-field')[0].value})(' + a[0] + ')\\n')));`);
			break;
		case 14:
			handleResult(`$('#node-container')[0].contentWindow.createNode([${randInt($('#node-container')[0].offsetWidth)}, ${randInt($('#node-container')[0].offsetHeight)}], '(AvgPooling 2D) (${$('#control-div-pool-size-field')[0].value})', ['neurons'], ['${$('#control-div-variable-field')[0].value}'], (a) => (['${$('#control-div-variable-field')[0].value}']), type=14, value=((a) => ('${$('#control-div-variable-field')[0].value}' + ' = layers.AveragePooling2D((${$('#control-div-pool-size-field')[0].value}))(' + a[0] + ')\\n')));`);
			break;
		case 15:
			handleResult(`$('#node-container')[0].contentWindow.createNode([${randInt($('#node-container')[0].offsetWidth)}, ${randInt($('#node-container')[0].offsetHeight)}], '(AvgPooling 3D) (${$('#control-div-pool-size-field')[0].value})', ['neurons'], ['${$('#control-div-variable-field')[0].value}'], (a) => (['${$('#control-div-variable-field')[0].value}']), type=15, value=((a) => ('${$('#control-div-variable-field')[0].value}' + ' = layers.AveragePooling3D((${$('#control-div-pool-size-field')[0].value}))(' + a[0] + ')\\n')));`);
			break;
		case 16:
			handleResult(`$('#node-container')[0].contentWindow.createNode([${randInt($('#node-container')[0].offsetWidth)}, ${randInt($('#node-container')[0].offsetHeight)}], '(Flatten) ()', ['neurons'], ['${$('#control-div-variable-field')[0].value}'], (a) => (['${$('#control-div-variable-field')[0].value}']), type=16, value=((a) => ('${$('#control-div-variable-field')[0].value}' + ' = layers.Flatten()(' + a[0] + ')\\n')));`);
			break;
		case 17:
			handleResult(`$('#node-container')[0].contentWindow.createNode([${randInt($('#node-container')[0].offsetWidth)}, ${randInt($('#node-container')[0].offsetHeight)}], '(Activation) (${$('#control-div-activation-field')[0].value})', ['neurons'], ['${$('#control-div-variable-field')[0].value}'], (a) => (['${$('#control-div-variable-field')[0].value}']), type=17, value=((a) => ('${$('#control-div-variable-field')[0].value}' + ' = layers.Activation("${$('#control-div-activation-field')[0].value}")(' + a[0] + ')\\n')));`);
			break;
		case 18:
			handleResult(`$('#node-container')[0].contentWindow.createNode([${randInt($('#node-container')[0].offsetWidth)}, ${randInt($('#node-container')[0].offsetHeight)}], "(Compile) (${$('#control-div-loss-function-field')[0].value}, ${$('#control-div-optimizer-field')[0].value})", ['inputs', 'outputs'], ['${$('#control-div-variable-field')[0].value}'], (a) => (['${$('#control-div-variable-field')[0].value}']), type=18, value=((a) => ('\\n${$('#control-div-variable-field')[0].value}' + ' = keras.Model(inputs=' + a[0] + ', outputs=' + a[1] + ')\\n${$('#control-div-variable-field')[0].value}.compile(loss=keras.losses.${$('#control-div-loss-function-field')[0].value}(), optimizer=keras.optimizers.${$('#control-div-optimizer-field')[0].value}(learning_rate=${$('#control-div-learning-rate-field')[0].value}))\\n\\n')));`);
			break;
		case 19:
			handleResult(`$('#node-container')[0].contentWindow.createNode([${randInt($('#node-container')[0].offsetWidth)}, ${randInt($('#node-container')[0].offsetHeight)}], "(Fit) (${$('#control-div-batch-size-field')[0].value}, ${$('#control-div-epochs-field')[0].value})", ['model', 'inputs', 'outputs'], ['model'], (a) => ([a[0]]), type=19, value=((a) => ('\\n' + a[0] + '.fit(' + a[1] + ', ' + a[2] + ', batch_size=${$('#control-div-batch-size-field')[0].value}, epochs=${$('#control-div-epochs-field')[0].value}, verbose=0)\\n\\n')));`);
			break;
		case 20:
			handleResult(`$('#node-container')[0].contentWindow.createNode([${randInt($('#node-container')[0].offsetWidth)}, ${randInt($('#node-container')[0].offsetHeight)}], "(Evaluate) (${$('#control-div-batch-size-field')[0].value})", ['model', 'inputs', 'outputs'], ['model'], (a) => ([a[0]]), type=20, value=((a) => ('print(' + a[0] + '.evaluate(' + a[1] + ', ' + a[2] + ', batch_size=${$('#control-div-batch-size-field')[0].value}, verbose=0))\\n\\n')));`);
			break;
		case 21:
			handleResult(`$('#node-container')[0].contentWindow.createNode([${randInt($('#node-container')[0].offsetWidth)}, ${randInt($('#node-container')[0].offsetHeight)}], "(Save) (\\"${$('#control-div-file-name-field')[0].value}.h5\\")", ['model'], ['model'], (a) => ([a[0]]), type=21, value=((a) => ('\\nfilenames_h5.append("${$('#control-div-file-name-field')[0].value}.h5")\\n' + a[0] + '.save(filenames_h5[-1])')));`);
			break;
		case 22:
			handleResult(`$('#node-container')[0].contentWindow.createNode([${randInt($('#node-container')[0].offsetWidth)}, ${randInt($('#node-container')[0].offsetHeight)}], "(Load) (\\"${$('#control-div-file-name-field')[0].value}.h5\\")", [], ['${$('#control-div-variable-field')[0].value}'], (a) => (['${$('#control-div-variable-field')[0].value}']), type=22, value=((a) => ('\\n${$('#control-div-variable-field')[0].value} = keras.models.load_model("${$('#control-div-file-name-field')[0].value}.h5")')));`);
			break;
	}
}

function handleResult(result)
{
	console.log(result);
	$('.glass:eq(0)').css('display', 'none');
	eval(result);
	$('#other-parameters').html('');
	$('#select').val('');
}

function formatNode(index)
{
	const node = $('#node-container')[0].contentWindow.nodes[index - 1];
	if(!node.x || !node.y)
	{
		return '';
	}
	return node.value(node.fieldsLeft.map((field) => (field.current)));
}

const fileInput = document.getElementById('open-file');
fileInput.onchange = () => {
	$('#node-container')[0].contentWindow.location.reload();
	$('#node-container').on('load', function()
	{
		editor.setValue("");
		let fr = new FileReader();
		fr.onload = function () {
			eval(fr.result);
		}

		fr.readAsText(fileInput.files[0]);
	});
}