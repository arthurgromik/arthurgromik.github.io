function autocomplete(inp, arr, vmax=6) {
	var currentFocus, count;
	inp.addEventListener("input", function(e) {
		var a, b, i, val = this.value;
		closeAllLists();
		if (!val) { return false;}
		currentFocus = -1;
		a = document.createElement("DIV");
		a.setAttribute("id", this.id + "autocomplete-list");
		a.setAttribute("class", "autocomplete-items");
		this.parentNode.appendChild(a);
		count = 0;
		for (i = 0; i < arr.length; i++) {
			if ((arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) && (count < vmax))
			{
				count++;
				b = document.createElement("DIV");
				b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
				b.innerHTML += arr[i].substr(val.length);
				b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
				b.addEventListener("click", function(e) {
					inp.value = this.getElementsByTagName("input")[0].value;
					updateContents(e, this.getElementsByTagName("input")[0].value);
					closeAllLists();
				});
				a.appendChild(b);
			}
		}
	});
	inp.addEventListener("keydown", function(e) {
		var x = document.getElementById(this.id + "autocomplete-list");
		if (x) x = x.getElementsByTagName("div");
		if (e.keyCode == 40) {
			currentFocus++;
			addActive(x);
		} else if (e.keyCode == 38) {
			currentFocus--;
			addActive(x);
		} else if (e.keyCode == 13) {
			e.preventDefault();
			if (currentFocus > -1) {
			if (x) x[currentFocus].click();
			}
		}
	});
	function addActive(x) {
		if (!x) return false;
		removeActive(x);
		if (currentFocus >= x.length) currentFocus = 0;
		if (currentFocus < 0) currentFocus = (x.length - 1);
		x[currentFocus].classList.add("autocomplete-active");
	}
	function removeActive(x) {
		for (var i = 0; i < x.length; i++) {
		x[i].classList.remove("autocomplete-active");
		}
	}
	function closeAllLists(elmnt) {
		var x = document.getElementsByClassName("autocomplete-items");
		for (var i = 0; i < x.length; i++) {
		if (elmnt != x[i] && elmnt != inp) {
			x[i].parentNode.removeChild(x[i]);
		}
		}
	}
	/*execute a function when someone clicks in the document:*/
	document.addEventListener("click", function (e) {
		closeAllLists(e.target);
	});
	}

	
	var options = `Dataset, Input Layer, Dense Layer, Convolutional Layer (1D), Convolutional Layer (2D), Convolutional Layer (3D), TransConv Layer (1D), TransConv Layer (2D), TransConv Layer (3D), Reshape Layer, MaxPooling Layer (1D), MaxPooling Layer (2D), MaxPooling Layer (3D), AvgPooling Layer (1D), AvgPooling Layer (2D), AvgPooling Layer (3D), Flatten Layer, Activation Layer, Compile the Model, Model Fit, Model Evaluate, Save the Model, Load the Model`.split(', ');

	autocomplete(document.getElementById("select"), options);