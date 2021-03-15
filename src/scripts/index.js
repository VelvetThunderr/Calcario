function checkPasswordStrength() {
	const password = document.getElementById("passwordInputField").value;

	let passwordProgress = document.getElementById("passwordProgress");

	passwordProgress.value = 0;
	if (password.match(/[a-z]+/)) {
		passwordProgress.value += 20;
	}
	if (password.match(/[A-Z]+/)) {
		passwordProgress.value += 20;
	}
	if (password.match(/[0-9]+/)) {
		passwordProgress.value += 20;
	}
	if (password.match(/[!@#$%&*()<>?{}[\];:=+\-_]+/)) {
		passwordProgress.value += 20;
	}
	if (password.length >= 16) {
		passwordProgress.value += 20;
	}
}

function validateAndSubmit() {
	const passwordInputField = document.getElementById("passwordInputField");
	const passwordConfirmInputField = document.getElementById("passwordConfirmInputField");

	const password = passwordInputField.value;
	const passwordConfirm = passwordConfirmInputField.value;

	if (password != passwordConfirm) {
		alert("Senha e confirmação de senha diferem.");
		return false;
	}

	const passwordProgress = document.getElementById("passwordProgress");

	if (passwordProgress.value < 100) {
		alert("Senha não é forte suficiente.");
		return false;
	}

	const hash = md5(password);
	const email = document.getElementById("emailInputField").value;

	fetch("/post", {
		method: "POST",
		body: JSON.stringify({ "email": email, "hash": hash })
	}).then(() => {
		alert("Obrigado por se cadastrar.");

		window.location.assign("index.html");
	});

	return true;
}