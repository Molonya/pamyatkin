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

// Функционал drag and drop для загрузки фото
const photoUpload = document.querySelector('.photo-upload');
const photoInput = document.querySelector('.photo-upload__input');
const photoPreview = document.querySelector('.photo-upload__preview');
const photoLabel = document.querySelector('.photo-upload__label');

// Предотвращаем стандартное поведение браузера для drag and drop
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    photoUpload.addEventListener(eventName, preventDefaults, false);
});

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

// Добавляем визуальные эффекты при перетаскивании
photoUpload.addEventListener('dragenter', highlight, false);
photoUpload.addEventListener('dragover', highlight, false);
photoUpload.addEventListener('dragleave', unhighlight, false);
photoUpload.addEventListener('drop', unhighlight, false);

function highlight(e) {
    e.preventDefault();
    photoUpload.classList.add('highlight');
}

function unhighlight(e) {
    e.preventDefault();
    photoUpload.classList.remove('highlight');
}

// Обработка сброшенных файлов
photoUpload.addEventListener('drop', handleDrop, false);

function handleDrop(e) {
    e.preventDefault();
    const dt = e.dataTransfer;
    const files = dt.files;
    
    if (files.length > 0) {
        handleFiles(files);
    }
}

// Обработка файлов, выбранных через input
photoInput.addEventListener('change', function() {
    if (this.files.length > 0) {
        handleFiles(this.files);
    }
});

function handleFiles(files) {
    const file = files[0];
    
    // Проверяем, что файл является изображением
    if (!file.type.match('image.*')) {
        alert('Пожалуйста, загрузите изображение!');
        return;
    }

    const reader = new FileReader();
    
    reader.onload = function(e) {
        // Создаем превью изображения
        const img = document.createElement('img');
        img.src = e.target.result;
        img.style.maxWidth = '100%';
        img.style.maxHeight = '200px';
        img.style.objectFit = 'cover';
        
        // Очищаем предыдущее превью
        photoPreview.innerHTML = '';
        photoPreview.appendChild(img);
        
        // Скрываем текст "Загрузить фото"
        photoLabel.style.display = 'none';
    }
    
    reader.readAsDataURL(file);
}

// Функционал попапа для просмотра изображения
const imagePopup = document.querySelector('.image-popup');
const popupImage = document.querySelector('.image-popup__image');
const popupClose = document.querySelector('.image-popup__close');

// Функция для открытия попапа
function openImagePopup(imageSrc) {
    // Сначала устанавливаем src, чтобы изображение начало загружаться
    popupImage.src = imageSrc;
    
    // Ждем загрузки изображения
    popupImage.onload = function() {
        imagePopup.classList.add('active');
        document.body.style.overflow = 'hidden';
    };
}

// Функция для закрытия попапа
function closeImagePopup() {
    imagePopup.classList.remove('active');
    // Даем время на завершение анимации перед разблокировкой прокрутки
    setTimeout(() => {
        document.body.style.overflow = '';
    }, 300);
}

// Обработчик клика по превью изображения
photoPreview.addEventListener('click', function(e) {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
        openImagePopup(e.target.src);
    }
});

// Закрытие попапа по клику на кнопку закрытия
popupClose.addEventListener('click', function(e) {
    e.preventDefault();
    closeImagePopup();
});

// Закрытие попапа по клику вне изображения
imagePopup.addEventListener('click', function(e) {
    if (e.target === imagePopup) {
        closeImagePopup();
    }
});

// Закрытие попапа по нажатию Escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && imagePopup.classList.contains('active')) {
        closeImagePopup();
    }
}); 