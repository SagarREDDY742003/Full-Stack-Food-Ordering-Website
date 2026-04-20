package com.sagar.service;

import com.sagar.model.User;
import org.springframework.context.annotation.Bean;

public interface UserService {

    public User findUserByJwtToken(String jwt) throws Exception;

    public User findUserByEmail(String email) throws Exception;

}
