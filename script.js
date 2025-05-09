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
    photoUpload.style.borderColor = '#4CAF50';
    photoUpload.style.backgroundColor = 'rgba(76, 175, 80, 0.1)';
}

function unhighlight(e) {
    e.preventDefault();
    photoUpload.style.borderColor = '#ddd';
    photoUpload.style.backgroundColor = '#fff';
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

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.pet-form__content');
    const petCard = document.querySelector('.pet-card');
    const photoInput = document.getElementById('pet-photo');
    const photoPreview = document.querySelector('.photo-upload__preview');
    const photoLabel = document.querySelector('.photo-upload__label');
    const photoUpload = document.querySelector('.photo-upload');
    const imagePopup = document.querySelector('.image-popup');
    const popupImage = document.querySelector('.image-popup__image');
    const popupClose = document.querySelector('.image-popup__close');
    let uploadedPhoto = null;

    function deletePhoto(e) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        
        // Очищаем фото
        photoPreview.innerHTML = '';
        photoLabel.style.display = 'flex';
        photoInput.value = '';
        uploadedPhoto = null;
        
        // Очищаем данные и скрываем карточку
        localStorage.removeItem('lastPetData');
        if (petCard) {
            petCard.classList.remove('active');
            petCard.style.display = 'none';
        }
    }

    function handleFiles(files) {
        const file = files[0];
        
        if (!file.type.match('image.*')) {
            return;
        }

        const reader = new FileReader();
        
        reader.onload = function(e) {
            uploadedPhoto = e.target.result;
            
            // Создаем превью
            photoPreview.innerHTML = `
                <img src="${uploadedPhoto}" alt="Предпросмотр фото">
                <button class="photo-upload__delete" aria-label="Удалить фото">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 8H12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                </button>
            `;
            photoLabel.style.display = 'none';
            
            // Добавляем обработчик удаления
            const deleteButton = photoPreview.querySelector('.photo-upload__delete');
            deleteButton.addEventListener('click', deletePhoto);
        }
        
        reader.readAsDataURL(file);
    }

    // Обработчик отправки формы
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        document.querySelectorAll('.error').forEach(el => {
            el.classList.remove('error');
        });
        
        const name = document.getElementById('pet-name').value.trim();
        const breed = document.getElementById('pet-breed').value.trim();
        const color = document.getElementById('pet-color').value.trim();
        const birthdate = document.getElementById('pet-birthdate').value;
        const chip = document.getElementById('pet-chip').value.trim();
        const gender = document.querySelector('input[name="gender"]:checked').value;

        let hasError = false;
        const fields = [
            { id: 'pet-name', value: name, pattern: /^[А-Яа-яЁёA-Za-z\s-]+$/ },
            { id: 'pet-breed', value: breed, pattern: /^[А-Яа-яЁёA-Za-z\s-]+$/ },
            { id: 'pet-color', value: color, pattern: /^[А-Яа-яЁёA-Za-z\s-]+$/ },
            { id: 'pet-birthdate', value: birthdate },
            { id: 'pet-chip', value: chip }
        ];

        fields.forEach(field => {
            const input = document.getElementById(field.id);
            if (!field.value) {
                input.classList.add('error');
                hasError = true;
                setTimeout(() => {
                    input.classList.remove('error');
                }, 250);
            } else if (field.pattern && !field.pattern.test(field.value)) {
                input.classList.add('error');
                hasError = true;
                setTimeout(() => {
                    input.classList.remove('error');
                }, 250);
            }
        });

        if (!uploadedPhoto) {
            photoUpload.classList.add('error');
            hasError = true;
            setTimeout(() => {
                photoUpload.classList.remove('error');
            }, 250);
        }

        if (hasError) {
            return;
        }

        const petData = {
            name,
            breed,
            color,
            birthdate,
            chip,
            gender,
            photo: uploadedPhoto
        };

        // Сохраняем данные
        localStorage.setItem('lastPetData', JSON.stringify(petData));

        // Обновляем карточку
        document.getElementById('pet-card-name').textContent = name;
        document.getElementById('pet-card-breed').textContent = breed;
        document.getElementById('pet-card-color').textContent = color;
        const birthdateStr = new Date(birthdate).toLocaleDateString('ru-RU');
        const ageStr = calculateAge(birthdate);
        document.getElementById('pet-card-birthdate').textContent = `${birthdateStr}, ${ageStr}`;
        document.getElementById('pet-card-chip').textContent = chip;
        document.getElementById('pet-card-gender').textContent = gender === 'male' ? 'Мальчик' : 'Девочка';
        
        if (uploadedPhoto) {
            document.getElementById('pet-card-photo').src = uploadedPhoto;
        }

        // Показываем карточку
        petCard.style.display = 'block';
        petCard.classList.add('active');
        petCard.scrollIntoView({ behavior: 'smooth' });
        
        // Очищаем форму
        form.reset();
        photoPreview.innerHTML = '';
        photoLabel.style.display = 'flex';
        photoInput.value = '';
        uploadedPhoto = null;
    });

    // Обработчик удаления карточки
    const deleteButton = document.getElementById('pet-card-delete');
    deleteButton.addEventListener('click', function() {
        if (confirm('Вы уверены, что хотите удалить карточку питомца?')) {
            const savedData = JSON.parse(localStorage.getItem('lastPetData'));
            
            if (savedData) {
                document.getElementById('pet-name').value = savedData.name;
                document.getElementById('pet-breed').value = savedData.breed;
                document.getElementById('pet-color').value = savedData.color;
                document.getElementById('pet-birthdate').value = savedData.birthdate;
                document.getElementById('pet-chip').value = savedData.chip;
                document.querySelector(`input[name="gender"][value="${savedData.gender}"]`).checked = true;
                
                if (savedData.photo) {
                    uploadedPhoto = savedData.photo;
                    photoPreview.innerHTML = `
                        <img src="${savedData.photo}" alt="Предпросмотр фото">
                        <button class="photo-upload__delete" aria-label="Удалить фото">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 8H12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                            </svg>
                        </button>
                    `;
                    photoLabel.style.display = 'none';
                    
                    const deleteButton = photoPreview.querySelector('.photo-upload__delete');
                    deleteButton.addEventListener('click', deletePhoto);
                }
            }

            petCard.classList.remove('active');
            petCard.style.display = 'none';
            form.scrollIntoView({ behavior: 'smooth' });
        }
    });

    // Обработчики для загрузки фото
    photoInput.addEventListener('change', function() {
        if (this.files.length > 0) {
            handleFiles(this.files);
        }
    });

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        photoUpload.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    photoUpload.addEventListener('drop', function(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        
        if (files.length > 0) {
            handleFiles(files);
        }
    });

    // Попап для просмотра фото
    photoPreview.addEventListener('click', function(e) {
        if (e.target.tagName === 'IMG') {
            e.preventDefault();
            e.stopPropagation();
            openImagePopup(e.target.src);
        }
    });

    function openImagePopup(imageSrc) {
        popupImage.src = imageSrc;
        popupImage.onload = function() {
            requestAnimationFrame(() => {
                imagePopup.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        };
    }

    function closeImagePopup() {
        imagePopup.classList.remove('active');
        setTimeout(() => {
            document.body.style.overflow = '';
        }, 300);
    }

    popupClose.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        closeImagePopup();
    });

    imagePopup.addEventListener('click', function(e) {
        if (e.target === imagePopup) {
            closeImagePopup();
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && imagePopup.classList.contains('active')) {
            closeImagePopup();
        }
    });

    // Добавляем обработчики для кнопок очистки полей
    document.querySelectorAll('.clear-field').forEach(button => {
        button.addEventListener('click', function() {
            const input = this.previousElementSibling;
            input.value = '';
            input.focus();
            this.style.display = 'none';
        });
    });

    // Обновляем отображение кнопок очистки при вводе
    document.querySelectorAll('.form-group input').forEach(input => {
        input.addEventListener('input', function() {
            const clearButton = this.nextElementSibling;
            if (clearButton && clearButton.classList.contains('clear-field')) {
                clearButton.style.display = this.value ? 'block' : 'none';
            }

            // Проверка валидности текстовых полей
            if (this.id !== 'pet-chip' && this.id !== 'pet-birthdate') {
                const pattern = /^[А-Яа-яЁёA-Za-z\s-]+$/;
                const validationMessage = this.closest('.form-group').querySelector('.validation-message');
                
                if (this.value && !pattern.test(this.value)) {
                    this.classList.add('error');
                    if (validationMessage) {
                        validationMessage.style.opacity = '1';
                    }
                } else {
                    this.classList.remove('error');
                    if (validationMessage) {
                        validationMessage.style.opacity = '0';
                    }
                }
            }
        });
    });
});

function calculateAge(birthdate) {
    const today = new Date();
    const birth = new Date(birthdate);
    
    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    
    if (months < 0) {
        years--;
        months += 12;
    }

    function getMonthWord(months) {
        const lastDigit = months % 10;
        const lastTwoDigits = months % 100;
        
        if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
            return 'месяцев';
        }
        
        switch (lastDigit) {
            case 1:
                return 'месяц';
            case 2:
            case 3:
            case 4:
                return 'месяца';
            default:
                return 'месяцев';
        }
    }

    function getYearWord(years) {
        if (years === 0) return '';
        
        const lastDigit = years % 10;
        const lastTwoDigits = years % 100;
        
        if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
            return 'лет';
        }
        
        switch (lastDigit) {
            case 1:
                return 'год';
            case 2:
            case 3:
            case 4:
                return 'года';
            default:
                return 'лет';
        }
    }

    if (years === 0) {
        return `${months} ${getMonthWord(months)}`;
    }

    return `${years} ${getYearWord(years)} ${months} ${getMonthWord(months)}`;
}

function showPetCard() {
    const card = document.querySelector('.pet-card');
    card.style.opacity = '0';
    card.style.display = 'block';
    requestAnimationFrame(() => {
        card.style.opacity = '1';
    });
}

function showPetForm() {
    const petForm = document.querySelector('.pet-form');
    petForm.style.opacity = '0';
    requestAnimationFrame(() => {
        petForm.style.opacity = '1';
    });
}

function animateLogo() {
    const logo = document.querySelector('.logo');
    logo.style.opacity = '0';
    requestAnimationFrame(() => {
        logo.style.opacity = '1';
    });
}

function animateMenuItems() {
    const menuItems = document.querySelectorAll('.menu__link');
    menuItems.forEach(item => {
        item.style.opacity = '0';
        requestAnimationFrame(() => {
            item.style.opacity = '1';
        });
    });
}

function animatePostCards() {
    const cards = document.querySelectorAll('.post-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        requestAnimationFrame(() => {
            card.style.opacity = '1';
        });
    });
}

function animateSubmitButton() {
    const submitButton = document.querySelector('.pet-form__submit');
    submitButton.style.opacity = '0';
    requestAnimationFrame(() => {
        submitButton.style.opacity = '1';
    });
}

function animateInputError(input) {
    input.parentElement.style.opacity = '0';
    requestAnimationFrame(() => {
        input.parentElement.style.opacity = '1';
    });
}

// Установка максимальной даты для поля ввода даты рождения
document.addEventListener('DOMContentLoaded', function() {
    const birthdateInput = document.getElementById('pet-birthdate');
    const today = new Date().toISOString().split('T')[0];
    birthdateInput.max = today;
}); 