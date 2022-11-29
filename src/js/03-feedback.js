import throttle from "lodash.throttle";

const INPUT_KEY = "feedback-form-state";

const refs = {
	form: document.querySelector(".feedback-form"),
	email: document.querySelector(".feedback-form input"),
	message: document.querySelector(".feedback-form textarea"),
};

refs.form.addEventListener("submit", onFormSubmit);
refs.form.addEventListener("input", throttle(onFormInput, 500));

function onFormInput(evt) {
	const savedForm = localStorage.getItem(INPUT_KEY);
	let formData = savedForm ? JSON.parse(savedForm) : {};

	formData[evt.target.name] = evt.target.value;

	const inputItems = JSON.stringify(formData);
	localStorage.setItem(INPUT_KEY, inputItems);
}

pageUpdate();

function pageUpdate() {
	const getItemInput = JSON.parse(localStorage.getItem(INPUT_KEY));

	if (getItemInput) {
		refs.email.value = getItemInput.email || "";
		refs.message.value = getItemInput.message || "";
	}
}

function onFormSubmit(evt) {
	evt.preventDefault();
	if (refs.email.value === "" || refs.message.value === "") {
		alert("Please fill in all the fields!");
	} else {
		console.log("Form submitted");
		localStorage.removeItem(INPUT_KEY);
		refs.form.reset();
	}
}
