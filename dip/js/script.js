window.addEventListener('DOMContentLoaded', () => {

	const validationPhone = () => {

		const phone = document.querySelectorAll('.phone-user');

		phone.forEach((elem) => {

			elem.addEventListener('input', (item) => {
				item.target.value = item.target.value.replace(/[^\+\d]|(.)\+/g, '').slice(0, 12);
			});

		});
	};
	validationPhone(); //валидация инпутов телефона

	const popupCall = () => {
		let popupCall = document.querySelector('.popup-call'); //поищи в вёрстке название модального окна
	
		let showCall = (display='block', overflow='hidden') => {
			popupCall.style.display = display;
			document.body.style.overflow = overflow;
		}; 
		/* showCall нужна затем, чтобы при его открытии выключалась прокрутка страницы;
		такая правка потом всё равно появится на двойной проверке. это чтоб тебе не мучиться*/
	
		document.body.addEventListener('click', (event) => { //вешаем обработчик на body

			let target = event.target; //получаем event.target для делегирования
			
			if (target.classList.contains('call-btn')) {
				showCall('block', 'hidden'); /*при клике на модалку окошко откроется
				со свойствами (display='block', overflow='hidden'), мы при вызове это передаём*/
				
			} else if (target.classList.contains('popup-close') 
			|| target.classList.contains('popup-call')) {
				showCall('none', ''); /* при клике на крестик или подложку - свойства уберутся, окно закроется*/
			}
		});
	};
	popupCall(); //кнопка "перезвоните мне" в хедере и футере

	const popupDiscount = () => {
		let popupDiscount = document.querySelector('.popup-discount');
	
		let showDiscount = (display='block', overflow='hidden') => {
			popupDiscount.style.display = display;
			document.body.style.overflow = overflow;
		};
	
		document.body.addEventListener('click', (event) => {

			let target = event.target;
			
			if (target.classList.contains('discount-btn')) {
				showDiscount('block', 'hidden');
			} else if (target.classList.contains('popup-close') || target.classList.contains('popup-discount')) {
				showDiscount('none', '');
			}
		});
	};
	popupDiscount(); //кнопка заказать со скидкой в блоке "акции и предложения"

	const popupCheck = () => {
		let popupCheck = document.querySelector('.popup-check');
	
		let showCheck = (display='block', overflow='hidden') => {
			popupCheck.style.display = display;
			document.body.style.overflow = overflow;
		};
	
		document.body.addEventListener('click', (event) => {

			let target = event.target;
			
			if (target.classList.contains('check-btn')) {
				showCheck('block', 'hidden');
			} else if (target.classList.contains('popup-close') || target.classList.contains('popup-check')) {
				showCheck('none', '');
			}
		});
	};
	popupCheck(); //кнопка "получить чек-лист и скидку"

    const popupConsult = () => {
        let popupConsult = document.querySelector('.popup-consultation');
    
        let showConsult = (display='block', overflow='hidden') => {
            popupConsult.style.display = display;
            document.body.style.overflow = overflow;
        };
    
        document.body.addEventListener('click', (event) => {
            let target = event.target;
            
            if (target.classList.contains('consultation-btn')) {
                showConsult('block', 'hidden');
            } else if (target.classList.contains('popup-close') || target.classList.contains('popup-consultation')) {
                showConsult('none', '');
            }
        });
    };
	popupConsult(); //кнопка "получить консультацию"

	const showMore = () => {
		const button = document.querySelector('.add-sentence-btn'),
			hidden = document.querySelectorAll('.hidden');

			let isHidden = true;
			button.addEventListener('click', () => {
				button.textContent = isHidden
				? 'Скрыть'
				: 'Больше...';
				
				isHidden = !isHidden;
				hidden.forEach(item => item.classList.toggle('hidden'));
			});
	};
	showMore(); // появление новых блоков по кнопке "Больше"

	const accordion = () => {

	};
	accordion(); //аккордеон

    const sendForm = () => {

		const errorMessage = 'Что-то пошло не так...',
			loadMessage = 'Загрузка...',
			successMessage = 'Спасибо! Мы скоро с вами свяжемся';

		const form = document.querySelectorAll('form');

		const statusMessage = document.createElement('div');
		statusMessage.style.cssText = 'font-size: 2rem; color: black;';


		form.forEach((item) => {
			item.addEventListener('submit', (event) => {
				event.preventDefault();
				item.appendChild(statusMessage);

				const formData = new FormData(item);
				let body = {};
				formData.forEach((val, key) => {
					body[key] = val;
				});

				statusMessage.textContent = loadMessage;

				postData(body).then((response) => {
						console.log(response);
						if (response.status !== 200) {
							throw new Error('status network not 200.');
						}
						statusMessage.textContent = successMessage;
						item.reset();
					})
					.catch((error) => {
						statusMessage.textContent = errorMessage;
						console.error(error);
					});
			});
		});

		const postData = (body) => {

			return fetch('./server.php', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(body)
			});

		};

	};
	sendForm(); //отправка форм

});