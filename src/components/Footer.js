import React from 'react';

export default function Footer() {
  return (
    <footer id="contact" className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-contact">
            <h5>Contact</h5>
            <ul className="contact-list">
              <li>📞 <a href="tel:+15551234567">+91 9316161597</a></li>
              <li>📧 <a href="https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox">support.taskbell@gmail.com</a></li>
              <li>💼 <a href="https://www.linkedin.com/in/mayur-khandla-70b0a8293/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
              <li>💻 <a href="https://github.com/KhandlaMayur" target="_blank" rel="noopener noreferrer">GitHub</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-divider"></div>
        <div className="footer-copy">© 2026 TaskBell — Built with ❤️ for better productivity.</div>
      </div>
    </footer>
  );
}
