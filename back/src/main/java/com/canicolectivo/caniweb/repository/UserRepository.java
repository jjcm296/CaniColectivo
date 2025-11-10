package com.canicolectivo.caniweb.repository;

import com.canicolectivo.caniweb.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {

}
