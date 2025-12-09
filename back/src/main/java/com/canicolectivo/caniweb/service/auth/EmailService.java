package com.canicolectivo.caniweb.service.auth;

import com.sendgrid.Method;
import com.sendgrid.Request;
import com.sendgrid.Response;
import com.sendgrid.SendGrid;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class EmailService {

    private final SendGrid sendGrid;
    private final String fromEmail;

    public EmailService(
            @Value("${sendgrid.api.key}") String apiKey,
            @Value("${app.mail.from}") String fromEmail
    ) {
        this.sendGrid = new SendGrid(apiKey);
        this.fromEmail = fromEmail;
    }

    public void sendVerificationEmail(String to, String subject, String htmlBody) {
        Email from = new Email(fromEmail, "CANI Colectivo");
        Email toEmail = new Email(to);

        Content content = new Content("text/html", htmlBody);
        Mail mail = new Mail(from, subject, toEmail, content);

        Request request = new Request();
        try {
            request.setMethod(Method.POST);
            request.setEndpoint("mail/send");
            request.setBody(mail.build());

            Response response = sendGrid.api(request);

            int status = response.getStatusCode();
            if (status >= 400) {
                throw new RuntimeException(
                        "Error al enviar correo vía SendGrid. Status: " + status +
                                " Body: " + response.getBody()
                );
            }
        } catch (IOException e) {
            throw new RuntimeException("No se pudo enviar el correo de verificación", e);
        }
    }
}
