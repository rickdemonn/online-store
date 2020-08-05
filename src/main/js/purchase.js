const startOfThePurchaseProcess = () => {
	const form = $('#checkout-form');
	const isValidForm = validateForm(form);
}

const validateForm = form => {
	const firstNamePattern = /[A-Z]|[А-Я][a-z]|[а-я]{1,}$/;
	const lastNamePattern = /[A-Z]|[А-Я][a-z]|[а-я]{1,}$/;
	const companyName = /\w+|/;
	const phonePattern = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/;
	const mailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
	const addr1 = /\w{1,}/;
	const addr2 = /\w+|/;
	const city = /[A-ZА-Я][a-zа-я]{1,}/;
	const zip = /^\d{1,}$/;

	const validations = {
		firstname: function (field) {
			return firstNamePattern.test(field.value);
		},
		lastname: function (field) {
			return lastNamePattern.test(field.value);
		},
		company: function (field) {
			return companyName.test(field.value);
		},
		number: function (field) {
			return phonePattern.test(field.value);
		},
		compemailany: function (field) {
			return mailPattern.test(field.value);
		},
		add1: function (field) {
			return addr1.test(field.value);
		},
		add2: function (field) {
			return addr2.test(field.value);
		},
		city: function (field) {
			return city.test(field.value);
		},
		zip: function (field) {
			return zip.test(field.value);
		},
	}

	let isMistake = false;

	$('#checkout-form *').filter('.form-control').toArray().forEach(input => {
		const validator = validations[input.name];
		if (validator && !validator(input)) {
			input.parentElement.classList.add('error');
			isMistake = true;
		} else {
			input.parentElement.classList.remove('error');
		}
	});
	return isMistake;
}