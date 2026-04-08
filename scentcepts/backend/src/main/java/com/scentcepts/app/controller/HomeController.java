package com.scentcepts.app.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
@RequiredArgsConstructor
public class HomeController {

    /** Serve the landing page */
    @GetMapping("/")
    public String home() {
        return "forward:/index.html";
    }

    /** Each page is standalone — just permit static file serving */
    @GetMapping({"/login", "/register"})
    public String authPages() {
        return "forward:/index.html";
    }
}
