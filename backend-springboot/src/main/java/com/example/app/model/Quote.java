package com.example.app.model;

import jakarta.persistence.*;

@Entity
public class Quote {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String text;
    private String author;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public Quote() {}

    public Quote(String text, String author, User user) {
        this.text = text;
        this.author = author;
        this.user = user;
    }

    public Long getId() { return id; }
    public String getText() { return text; }
    public String getAuthor() { return author; }
    public User getUser() { return user; }

    public void setText(String text) { this.text = text; }
    public void setAuthor(String author) { this.author = author; }
}
