function selectAll() {
	if (this.checked == true) {
		checkAll('test');
	} else {
		clearAll('test');
	}
}

function checkAll(id) {
	var el = document.getElementsByTagName('input');
	var len = el.length;
	for (var i = 0; i < len; i++) {
		if ((el[i].type == "checkbox") && (el[i].id == id)) {
			el[i].checked = true;
		}
	}
}

function clearAll(id) {
	var el = document.getElementsByTagName('input');
	var len = el.length;
	for (var i = 0; i < len; i++) {
		if ((el[i].type == "checkbox") && (el[i].id == id)) {
			el[i].checked = false;
		}
	}
}