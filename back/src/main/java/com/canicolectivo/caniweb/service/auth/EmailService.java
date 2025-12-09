package com.canicolectivo.caniweb.service.auth;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender emailSender;
    private final String fromAddress;

    public EmailService(JavaMailSender emailSender,
                        @Value("${app.mail.from}") String fromAddress) {
        this.emailSender = emailSender;
        this.fromAddress = fromAddress;
    }

    public void sendVerificationEmail(String to, String subject, String body) {
        MimeMessage message = emailSender.createMimeMessage();

        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setFrom(fromAddress);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(body, true);
        } catch (MessagingException e) {
            throw new RuntimeException("Error al construir el correo", e);
        }

        emailSender.send(message);
    }
}
