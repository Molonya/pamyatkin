// Анимация появления элементов при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    // Анимация для карточек постов
    const postCards = document.querySelectorAll('.post-card');
    postCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 200 * index);
    });

    // Анимация для формы добавления питомца
    const petForm = document.querySelector('.pet-form');
    petForm.style.opacity = '0';
    petForm.style.transform = 'translateX(-20px)';
    petForm.style.transition = 'opacity 0.5s ease, transform 0.5s ease';

    setTimeout(() => {
        petForm.style.opacity = '1';
        petForm.style.transform = 'translateX(0)';
    }, 100);

    // Анимация для логотипа
    const logo = document.querySelector('.logo__img');
    logo.style.transform = 'scale(0.8)';
    logo.style.transition = 'transform 0.5s ease';

    setTimeout(() => {
        logo.style.transform = 'scale(1)';
    }, 200);

    // Анимация для меню
    const menuItems = document.querySelectorAll('.menu__item');
    menuItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(-10px)';
        item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 100 * index);
    });
});

// Анимация при наведении на карточки постов
const postCards = document.querySelectorAll('.post-card');
postCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px)';
        card.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        card.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = 'none';
    });
});

// Анимация для кнопки отправки формы
const submitButton = document.querySelector('.pet-form__submit');
submitButton.addEventListener('mouseenter', () => {
    submitButton.style.transform = 'scale(1.05)';
    submitButton.style.transition = 'transform 0.3s ease';
});

submitButton.addEventListener('mouseleave', () => {
    submitButton.style.transform = 'scale(1)';
});

// Анимация для полей ввода
const formInputs = document.querySelectorAll('.form-group input');
formInputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.style.transform = 'translateX(5px)';
        input.parentElement.style.transition = 'transform 0.3s ease';
    });

    input.addEventListener('blur', () => {
        input.parentElement.style.transform = 'translateX(0)';
    });
}); 