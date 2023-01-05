package ru.kata.spring.boot_security.demo.dao;

import ru.kata.spring.boot_security.demo.model.User;

import java.util.List;

public interface UserDao {
    List<User> getList();

    void add(User user);

    User get(Long id);

    void update(User user);

    void delete(User user);
}
