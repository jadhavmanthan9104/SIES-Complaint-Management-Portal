import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from dotenv import load_dotenv
import logging

load_dotenv()
logger = logging.getLogger(__name__)

class EmailService:
    def __init__(self):
        self.smtp_host = os.getenv('SMTP_HOST', 'smtp.gmail.com')
        self.smtp_port = int(os.getenv('SMTP_PORT', '465'))
        self.smtp_user = os.getenv('SMTP_USER')
        self.smtp_password = os.getenv('SMTP_PASSWORD')
        self.from_email = os.getenv('EMAILS_FROM_EMAIL')
        self.from_name = os.getenv('EMAILS_FROM_NAME', 'Complaint Portal')
    
    def send_status_update_email(self, to_email: str, complaint_type: str, student_name: str, status: str, complaint_id: str):
        subject = f"Complaint Status Update - {complaint_type}"
        
        body = f"""
        <html>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px;">
                    <h2 style="color: #0f172a; margin-bottom: 20px;">Complaint Status Update</h2>
                    <p>Dear {student_name},</p>
                    <p>Your {complaint_type} complaint (ID: <strong>{complaint_id}</strong>) status has been updated to:</p>
                    <div style="background-color: #2563eb; color: white; padding: 15px; border-radius: 5px; text-align: center; margin: 20px 0;">
                        <h3 style="margin: 0; color: white;">Status: {status.upper()}</h3>
                    </div>
                    <p>Thank you for your patience.</p>
                    <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;">
                    <p style="font-size: 12px; color: #64748b;">This is an automated message from the Complaint Management System. Please do not reply to this email.</p>
                </div>
            </body>
        </html>
        """
        
        return self._send_email(to_email, subject, body)
    
    def _send_email(self, to_email: str, subject: str, body: str):
        # Debugging: Check credentials
        missing_creds = []
        if not self.smtp_user: missing_creds.append("SMTP_USER")
        if not self.smtp_password: missing_creds.append("SMTP_PASSWORD")
        if not self.from_email: missing_creds.append("EMAILS_FROM_EMAIL")
        
        if missing_creds:
            error_msg = f"Email credentials not configured. Missing: {', '.join(missing_creds)}. Email not sent."
            logger.warning(error_msg)
            print(f"ERROR: {error_msg}") # Print to visible console
            return False
        
        print(f"Attempting to send email to {to_email} via {self.smtp_host}:{self.smtp_port}...")

        msg = MIMEMultipart()
        msg['Subject'] = subject
        msg['From'] = f"{self.from_name} <{self.from_email}>"
        msg['To'] = to_email
        
        msg.attach(MIMEText(body, 'html'))
        
        try:
            # Create a secure SSL context if needed, but SMTP_SSL handles it by default
            with smtplib.SMTP_SSL(self.smtp_host, self.smtp_port) as server:
                server.login(self.smtp_user, self.smtp_password)
                server.sendmail(self.from_email, to_email, msg.as_string())
            
            success_msg = f"Email sent successfully to {to_email}"
            logger.info(success_msg)
            print(f"SUCCESS: {success_msg}")
            return True
        except Exception as e:
            error_msg = f"Failed to send email to {to_email}. Error: {str(e)}"
            logger.error(error_msg)
            print(f"ERROR: {error_msg}")
            return False

email_service = EmailService()
