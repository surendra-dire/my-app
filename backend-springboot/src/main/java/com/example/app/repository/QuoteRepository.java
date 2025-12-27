package com.example.app.repository;

import com.example.app.model.Quote;
import com.example.app.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuoteRepository extends JpaRepository<Quote, Long> {
    List<Quote> findByUser(User user);
}
