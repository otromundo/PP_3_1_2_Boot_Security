package ru.kata.spring.boot_security.demo.service;

import ru.kata.spring.boot_security.demo.model.User;

import java.util.List;

public interface UserService {
    List<User> getList();

    void save(User user);

    User findById(Long id);

    User findByEmail(String email);

    void deleteById(Long id);

    void encodePassword(User user);

    boolean isEmailUnique(User user);
}
