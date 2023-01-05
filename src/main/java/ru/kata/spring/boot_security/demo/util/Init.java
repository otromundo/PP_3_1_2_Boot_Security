package ru.kata.spring.boot_security.demo.util;

import org.springframework.stereotype.Component;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.UserService;

import javax.annotation.PostConstruct;
import java.util.EnumSet;
import java.util.Set;

@Component
public class Init {
    private final UserService userService;

    public Init(UserService userService) {
        this.userService = userService;
    }

    @PostConstruct
    public void dbInit() {
        Set<Role> adminRoles = EnumSet.of(Role.USER, Role.ADMIN);
        Set<Role> userRoles = EnumSet.of(Role.USER);

        User admin = new User(null, "admin", "admin", 25,
                "admin@mail.ru", "admin", true, adminRoles);
        User user1 = new User(null, "user", "user", 26,
                "user@mail.ru", "user", true, userRoles);
        User user2 = new User(null, "Иван", "Иванов", 27,
                "ivan@mail.ru", "ivan", true, userRoles);
        User user3 = new User(null, "Елена", "Еленова", 28,
                "elena@mail.ru", "elena", true, userRoles);

        userService.save(admin);
        userService.save(user1);
        userService.save(user2);
        userService.save(user3);
    }
}
