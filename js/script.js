document.addEventListener('DOMContentLoaded', () => {

	// Efeito de Digitação
	function typeWrite(element) {
		const textArray = element.innerHTML.split('');
		element.innerHTML = '';

		textArray.forEach((letter, i) => {
			setTimeout(() => {
				element.innerHTML += letter;
			}, i * 300);
		});
	}

	const subtitle = document.querySelector('p');
	if (subtitle) {
		typeWrite(subtitle);
	}

	// Carrossel
	const galleryContainer = document.querySelector('.gallery-container');
	const galleryControlsContainer = document.querySelector('.gallery-controls');
	const galleryControls = ['Anterior', 'Próximo'];
	const galleryItems = document.querySelectorAll('.gallery-item');

	const galleryLinks = {
		1: 'https://brunorobertocataneo.github.io/olhar_cultural/',
		2: 'https://brunorobertocataneo.github.io/Calculadora/',
		3: 'https://brunorobertocataneo.github.io/programming_memory_game/',
		4: 'https://brunorobertocataneo.github.io/I.A-NA-EDUCACAO/'
	};

	class Carousel {
		constructor(container, items, controls) {
			this.carouselContainer = container;
			this.carouselControls = controls;
			this.carouselArray = [...items];
			this.updateGallery();
			this.setClickEvents();
		}

		updateGallery() {
			this.carouselArray.forEach(el => {
				el.classList.remove('gallery-item-1', 'gallery-item-2', 'gallery-item-3', 'gallery-item-4', 'gallery-item-5');
			});

			this.carouselArray.slice(0, 5).forEach((el, i) => {
				el.classList.add(`gallery-item-${i + 1}`);
			});
		}

		setCurrentState(control) {
			if (control.className.includes('Anterior')) {
				this.carouselArray.unshift(this.carouselArray.pop());
			} else {
				this.carouselArray.push(this.carouselArray.shift());
			}
			this.updateGallery();
			this.setClickEvents();
		}

		setControls() {
			this.carouselControls.forEach(control => {
				const button = document.createElement('button');
				button.className = `gallery-controls-${control}`;
				button.innerText = control;
				galleryControlsContainer.appendChild(button);
			});
		}

		useControls() {
			const triggers = [...galleryControlsContainer.children];
			triggers.forEach(control => {
				control.addEventListener('click', e => {
					e.preventDefault();
					this.setCurrentState(control);
				});
			});
		}

		setClickEvents() {
			this.carouselArray = [...document.querySelectorAll('.gallery-item')];

			this.carouselArray.forEach(item => {
				item.replaceWith(item.cloneNode(true)); // remove antigos listeners
			});

			this.carouselArray = [...document.querySelectorAll('.gallery-item')];

			this.carouselArray.forEach((item, index) => {
				item.addEventListener('click', () => {
					const link = galleryLinks[index + 1];
					if (link) {
						window.open(link, '_blank');
					}
				});
			});
		}
	}

	if (galleryContainer && galleryItems.length > 0) {
		const exampleCarousel = new Carousel(galleryContainer, galleryItems, galleryControls);
		exampleCarousel.setControls();
		exampleCarousel.useControls();
	}

	// Scroll suave para links da navbar
	document.querySelectorAll('a[href^="#"]').forEach(anchor => {
		anchor.addEventListener('click', function (e) {
			e.preventDefault();
			const target = document.querySelector(this.getAttribute('href'));
			if (target) {
				target.scrollIntoView({
					behavior: 'smooth'
				});
			}
		});
	});

});
