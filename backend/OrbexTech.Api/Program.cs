using System.Net;
using System.Net.Mail;
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);

// Add CORS to allow the static frontend to communicate with this API
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy => policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
});

var app = builder.Build();

app.UseCors("AllowAll");

app.MapPost("/api/contact", async ([FromBody] ContactRequest request, IConfiguration config) =>
{
    try
    {
        var smtpHost = config["Smtp:Host"];
        var smtpPort = int.Parse(config["Smtp:Port"] ?? "587");
        var smtpUser = config["Smtp:Username"];
        var smtpPass = config["Smtp:Password"];
        var recipientEmail = "muhammadfurqannasir8@gmail.com";

        using var client = new SmtpClient(smtpHost, smtpPort)
        {
            Credentials = new NetworkCredential(smtpUser, smtpPass),
            EnableSsl = true
        };

        var mailMessage = new MailMessage
        {
            From = new MailAddress(smtpUser!, "OrbexTech Contact Form"),
            Subject = $"New Contact Message: {request.Subject}",
            Body = $@"
                <div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;'>
                    <h2 style='color: #2E4A71; border-bottom: 2px solid #7DD3FC; padding-bottom: 10px;'>New Contact Form Submission</h2>
                    <p style='font-size: 16px; color: #333;'>You have received a new message from the <strong>OrbexTech</strong> website.</p>
                    <table style='width: 100%; border-collapse: collapse; margin-top: 20px;'>
                        <tr style='background-color: #eee;'>
                            <td style='padding: 10px; font-weight: bold;'>Name:</td>
                            <td style='padding: 10px;'>{request.Name}</td>
                        </tr>
                        <tr>
                            <td style='padding: 10px; font-weight: bold;'>Email:</td>
                            <td style='padding: 10px;'>{request.Email}</td>
                        </tr>
                        <tr style='background-color: #eee;'>
                            <td style='padding: 10px; font-weight: bold;'>Subject:</td>
                            <td style='padding: 10px;'>{request.Subject}</td>
                        </tr>
                        <tr>
                            <td style='padding: 10px; font-weight: bold; vertical-align: top;'>Message:</td>
                            <td style='padding: 10px; white-space: pre-wrap;'>{request.Message}</td>
                        </tr>
                    </table>
                    <div style='margin-top: 30px; font-size: 12px; color: #777; text-align: center;'>
                        This email was sent from the OrbexTech Contact Form.
                    </div>
                </div>",
            IsBodyHtml = true
        };
        mailMessage.To.Add(recipientEmail);
        mailMessage.ReplyToList.Add(new MailAddress(request.Email));

        await client.SendMailAsync(mailMessage);

        return Results.Ok(new { message = "Message sent successfully!" });
    }
    catch (Exception ex)
    {
        return Results.Problem($"Failed to send email: {ex.Message}");
    }
});

app.Run();

public record ContactRequest(string Name, string Email, string Subject, string Message);
