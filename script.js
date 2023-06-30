$(function() {

	//Размер отступа карточек
	const MARGIN = 10;

	//Добавление стилей для начальной позиции
	$('.cards_images img').each(function(index, card) {

		if(index === 0) {
			$(card).addClass('last_card');
		}

		if(index === $('.cards_images img').length - 1) {
			$(card).addClass('first_card');
		}

		$(card).css({'z-index': index, 'margin-left': `-${index*MARGIN}px`});
	});

	//Анимация слайдера, карточку убираем назад
	$('.card-to-end').on('click', function() {
		$('.first_card').addClass('active');
	});

	$(document).on('animationstart', '.first_card', function() {

		const currentCard = $(this);

		$(currentCard).siblings('.card').each((index, card) => {
			let marginLeft = Number($(card).css('margin-left').replace('px', ''));
			$(card).css('margin-left', `${marginLeft - MARGIN}px`);
		});

		$(currentCard).css('margin-left', '0px');
	});

	$(document).on('animationend', '.first_card', function() {
		const currentCard = $(this);
		$(currentCard).prev().addClass('first_card');

		$(currentCard).siblings('.card').each((index, card) => {
			const zIndex = Number($(card).css('z-index'));
			$(card).css('z-index', zIndex + 1);
		});

		$(currentCard).css('z-index', 0);

		if($(currentCard).prev().length) {
			$(currentCard).prev().addClass('first_card');
		} else {
			$('.card').last().addClass('first_card');
		}
		$(currentCard).siblings('.last_card').removeClass('last_card');
		$(currentCard).addClass('last_card').removeClass('first_card').removeClass('active');		
	});

	//Анимация слайдера, карточку убираем вперед
	$('.card-to-start').on('click', function() {
		$('.last_card').addClass('active');
	});

	$(document).on('animationstart', '.last_card', function() {
		const currentCard = $(this);
		$(currentCard).siblings('.card').each((index, card) => {
			let marginLeft = Number($(card).css('margin-left').replace('px', ''));
			$(card).css('margin-left', `${marginLeft + MARGIN}px`);
		});
		$(currentCard).css('margin-left', `-${$(currentCard).siblings('.card').length*MARGIN }px`);
	});

	$(document).on('animationend', '.last_card', function() {
		const currentCard = $(this);
		$(currentCard).next().addClass('last_card');

		$(currentCard).siblings('.card').each((index, card) => {
			let zIndex = Number($(card).css('z-index'));
			$(card).css({ 'z-index': --zIndex });
		});

		$(currentCard).css('z-index', $(currentCard).siblings('.card').length + 1);

		if($(currentCard).next().length) {
			$(currentCard).next().addClass('last_card');
		} else {
			$('.card').first().addClass('last_card');
		}
		$(currentCard).siblings('.first_card').removeClass('first_card');
		$(currentCard).addClass('first_card').removeClass('last_card').removeClass('active');
	});
});