package com.canicolectivo.caniweb.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.InetSocketAddress;
import java.net.Socket;

@RestController
public class HealthController {

    @GetMapping("/health")
    public String health() {
        return "OK";
    }

    @GetMapping("/test-smtp")
    public String testSmtp() {
        try {
            Socket socket = new Socket();
            socket.connect(new InetSocketAddress("smtp.gmail.com", 587), 5000);
            socket.close();
            return "Conexión exitosa al SMTP";
        } catch (Exception e) {
            return "Error conectando al SMTP: " + e.getMessage();
        }
    }

}
