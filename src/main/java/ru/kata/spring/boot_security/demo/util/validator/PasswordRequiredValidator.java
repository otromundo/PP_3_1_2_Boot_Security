package ru.kata.spring.boot_security.demo.util.validator;

import ru.kata.spring.boot_security.demo.model.User;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class PasswordRequiredValidator implements ConstraintValidator<PasswordRequired, User> {

    @Override
    public void initialize(PasswordRequired constraintAnnotation) {

    }

    @Override
    public boolean isValid(User user, ConstraintValidatorContext constraintValidatorContext) {
        return user.getId() != null || !user.getPassword().isBlank();
    }
}
