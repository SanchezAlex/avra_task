$(document).ready(() => {

    $('a.reg_btn').click(() => {
        $('html, body').animate({
            scrollTop: $('.registration').offset().top
        }, 2000);
    });

    $('#slider').owlCarousel({
        loop: true,
        responsiveClass: true,
        slideSpeed: 500,
        margin: 10,
        mouseDrag: true,
        singleItem: true,
        nav: true,
        navText: [
            "<img	src='../img/slider_arrow.png'>",
            "<img	src='../img/slider_arrow.png'>"
        ],
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 1
            },
            1170: {
                items: 1
            }
        }
    });
});

function validate() {
    const isInputValid = inputValidation();

    const isSelectValid = selectValidation();

    return (isInputValid && isSelectValid);
}

function inputValidation() {
    let isValid = true;

    const inputClasses = [
        '.input_name',
        '.input_email',
        '.input_pass_1',
        '.input_pass_2'
    ];

    inputClasses.forEach(className => $(className).css('border', '1px solid #e6e6e6'));
    $('.not-valid').remove();

    inputClasses.forEach(className => {
        const input = $(className);
        const value = input.val();

        if (value.trim() === '') {
            markAsNotValid(input, 'Заполните поле');
            isValid = false;
        }

    });

    const passInput1 = $('.input_pass_1');
    const passInput2 = $('.input_pass_2');
    const passValue1 = passInput1.val();
    const passValue2 = passInput2.val();

    if (passValue2.trim() !== '' &&
        passValue2 !== '' &&
        passValue1 !== passValue2) {
        markAsNotValid(passInput1);
        markAsNotValid(passInput2, 'Разные пароли');
        isValid = false;
    }

    const emailInput = $('.input_email');
    const emailValue = emailInput.val();
    const regex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
    const isEmailValid = regex.test(emailValue);

    if (emailValue.trim() !== '' && isEmailValid == false) {
        markAsNotValid(emailInput, 'Проверьте email');
        isValid = false;
    }

    return isValid;

}

function selectValidation() {
    let isValid = true;

    const selectIds = [
        '#date',
        '#month',
        '#year',
        '#language'
    ];

    selectIds.forEach(idName => $(idName).css('border', '1px solid #e6e6e6'));

    selectIds.forEach(idName => {
        const select = $(idName);
        const value = select.val();

        if (value != undefined) {
            isValid = true;
        } else if (value == undefined) {
            markAsNotValid(select);
            isValid = false;
        }
    });

    return isValid;
}

function markAsNotValid(object, warning) {
    if (warning != undefined) {
        const notValidSpan = $(`<span class="not-valid">${warning}</span>`).css('color', '#ff0000');
        object.after(notValidSpan);
    }

    object.css('border', '1px solid #ff0000');

}