const categoriesStartListener = () => {
	$('#category-btn').click(function (e) {
		e.preventDefault();
		window.location.hash = '#categories';
	});
	$('.button-hero').click(function (e) {
		e.preventDefault();
		window.location.hash = '#categories';
	});
	$('#category-footer').click(function (e) {
		e.preventDefault();
		window.location.hash = '#categories';
	});
};

// const createCategories = event => {
//     event.preventDefault();
//     $('.hero-banner').remove();
//     $('#categories-block').remove();
//     $('#products-block').remove();
//     const categories = $('<div/>', {id: 'categories-block'}).prependTo($('.site-main'));
//     categories.append($('<div/>').addClass('container'));
//     fetch(categoriesUrl)
//         .then(res => {
//             return res.json();
//         })
//         .then(res => {
//             createBlockOfCategories(res);
//         })
//         .catch(reject => {
//             console.log("Ups");
//             console.log(reject);
//         });
// };

const showCategories = () => {
	$('section').removeClass('active');
	$('.category-page').addClass('active');
}

const createCategories = event => {
	// event.preventDefault();
	$('#check-active').children().removeClass('active');
	$('#category-btn').parent().addClass('active');
	$('section').removeClass('active');
	$('.category-page').addClass('active');

	const parent = document.querySelector('.category-list .row');
	parent.innerHTML = '';

	const productsBlock = document.createElement('div');
	productsBlock.textContent = "Choose a category you're interested in";
	productsBlock.className = 'products-block';
	parent.appendChild(productsBlock);
	// categories.append($('<div/>').addClass('container'));
	fetch(categoriesUrl)
			.then(res => {
				return res.json();
			})
			.then(res => {
				$('.main-categories ul').children().remove();
				createBlockOfCategories(res);
			})
			.catch(reject => {
				console.log("Oops");
				console.log(reject);
			});
};

const createBlockOfCategories = (response) => {
	response.forEach(categoryItem => {
		const parent = document.querySelector('.main-categories ul');

		const {id, name, description, img} = categoryItem;

		const listItem = document.createElement('li');
		listItem.classList.add("filter-list");

		const radio = document.createElement('input');
		radio.setAttribute('type', 'radio');
		radio.setAttribute('name', 'category');
		radio.setAttribute('id', `category-${id}`);
		radio.setAttribute('category-id', id);
		radio.className = 'pixel-radio';

		const label = document.createElement('label');
		label.setAttribute('for', `category-${id}`);
		label.textContent = name;

		listItem.appendChild(radio);
		listItem.appendChild(label);

		radio.addEventListener('click', () => {
			const filters = document.forms.brandFilters.querySelector('ul');
			filters.innerHTML = '';

			showProductsByFilters(id);
			getBrandsFilterByCategory(id);
			// $('.common-filter form').children().filter('input').prop('checked', false)
			// $(document.forms.filterForm).children().filter('input').prop('checked', false);
		})

		parent.appendChild(listItem);
	})
};