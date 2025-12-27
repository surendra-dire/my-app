package com.example.app.controller;

import com.example.app.model.Quote;
import com.example.app.model.User;
import com.example.app.repository.QuoteRepository;
import com.example.app.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/quotes")
@CrossOrigin
public class QuoteController {

    private final QuoteRepository quoteRepo;
    private final UserRepository userRepo;

    public QuoteController(QuoteRepository quoteRepo, UserRepository userRepo) {
        this.quoteRepo = quoteRepo;
        this.userRepo = userRepo;
    }

    @GetMapping("/{userId}")
    public List<Quote> getQuotes(@PathVariable Long userId) {
        User user = userRepo.findById(userId).orElseThrow();
        return quoteRepo.findByUser(user);
    }

    @PostMapping("/{userId}")
    public Quote addQuote(
            @PathVariable Long userId,
            @RequestBody Quote quote
    ) {
        User user = userRepo.findById(userId).orElseThrow();
        quote.setUser(user);
        return quoteRepo.save(quote);
    }

    @PutMapping("/{id}")
    public Quote updateQuote(@PathVariable Long id, @RequestBody Quote q) {
        Quote quote = quoteRepo.findById(id).orElseThrow();
        quote.setText(q.getText());
        quote.setAuthor(q.getAuthor());
        return quoteRepo.save(quote);
    }

    @DeleteMapping("/{id}")
    public void deleteQuote(@PathVariable Long id) {
        quoteRepo.deleteById(id);
    }
}
