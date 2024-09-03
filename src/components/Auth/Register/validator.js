const Validator = (option) => {
    function getParent(element, selector) {
        while (element.parentElement) {
            if (element.parentElement.matches(selector)) {
                return element.parentElement;
            }
            element = element.parentElement;
        }
    }

    var selectorRules = {};

    function validate(inputElement, rule) {
        var errorElement = getParent(inputElement, option.formGroupSelector).querySelector(option.errorSelector);
        var errorMessage;

        var rules = selectorRules[rule.selector];
        for (let i = 0; i < rules.length; i++) {
            errorMessage = rules[i](inputElement.value);
            if (errorMessage) break;
        }

        if (errorMessage) {
            errorElement.innerText = errorMessage;
            getParent(inputElement, option.formGroupSelector).classList.add('invalid');
        } else {
            errorElement.innerText = '';
            getParent(inputElement, option.formGroupSelector).classList.remove('invalid');
        }

        return !errorMessage;
    }

    var formElement = document.querySelector(option.form);

    if (formElement) {
        formElement.onsubmit = function (e) {
            e.preventDefault();
            var isFormValid = true;

            option.rules.forEach(function (rule) {
                var inputElement = formElement.querySelector(rule.selector);
                var valid = validate(inputElement, rule);
                if (!valid) {
                    isFormValid = false;
                }
            });

            if (isFormValid) {
                if (typeof option.onSubmit === 'function') {
                    var enableInputs = formElement.querySelectorAll('[name]');
                    var arrEnableInputs = [...enableInputs];

                    var arrValue = arrEnableInputs.reduce((values, input) => {
                        values[input.name] = input.value;
                        return values;
                    }, {});
                    option.onSubmit(arrValue);
                } else {
                    formElement.submit();
                }
            }
        };

        option.rules.forEach((rule) => {
            //save rule of input
            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test);
            } else {
                selectorRules[rule.selector] = [rule.test];
            }

            var inputElement = formElement.querySelector(rule.selector);

            if (inputElement) {
                inputElement.onblur = function () {
                    validate(inputElement, rule);
                };

                inputElement.oninput = function () {
                    var errorElement = getParent(inputElement, option.formGroupSelector).querySelector(
                        option.errorSelector,
                    );
                    errorElement.innerText = '';
                    getParent(inputElement, option.formGroupSelector).classList.remove('invalid');
                };
            }
        });
    }
};
export default Validator;

Validator.isRequired = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            return value.trim() ? undefined : message || 'Vui lòng nhập trường này';
        },
    };
};

Validator.isEmail = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            var regex = validateEmail(value);
            return regex ? undefined : message || 'Email không hợp lệ';
        },
    };
};

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        );
};

Validator.minLength = function (selector, min, message) {
    return {
        selector: selector,
        test: function (value) {
            return value.trim().length >= min ? undefined : message || `Mật khẩu phải lớn hơn hoặc bằng ${min} ký tự`;
        },
    };
};

Validator.isConfirmed = function (selector, getConfirmValue, message) {
    return {
        selector: selector,
        test: function (value) {
            return value.trim() === getConfirmValue() ? undefined : message || 'Giá trị nhập vào không chính xác';
        },
    };
};
