package ru.kata.spring.boot_security.demo.util.validator;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = PasswordRequiredValidator.class)
public @interface PasswordRequired {
    String message() default "Password required";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
