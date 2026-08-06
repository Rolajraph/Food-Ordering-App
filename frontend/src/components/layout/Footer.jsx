import { Link } from "react-router-dom";
import logo from "../../assets/logo/quickbite-logo.png";
import "./Footer.css";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <img src={logo} alt="QuickBite" className="footer__logo" />
          <p className="footer__description">
            Great food from local vendors, delivered fast to your door.
          </p>
        </div>

        <div className="footer__section">
          <h3>Quick Links</h3>
          <Link to="/">Home</Link>
          <Link to="/menu">Menu</Link>
          <Link to="/cart" className="footer__cart-link">
            <svg
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            Cart
          </Link>
        </div>

        <div className="footer__section">
          <h3>Contact</h3>
          <p>hello@quickbite.ng</p>
          <p>+234 70 4996 2615</p>
          <p>Mon – Sun, 8am – 10pm</p>
        </div>

        <div className="footer__section">
          <h3>Follow Us</h3>
          <div className="footer__socials">
            <a href="#" aria-label="Facebook" className="footer__social-icon">
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="currentColor"
              >
                <path d="M22 12a10 10 0 1 0-11.5 9.9v-7H7.9V12h2.6V9.8c0-2.6 1.5-4 3.9-4 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12Z" />
              </svg>
            </a>
            <a href="#" aria-label="Instagram" className="footer__social-icon">
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle
                  cx="17.5"
                  cy="6.5"
                  r="1"
                  fill="currentColor"
                  stroke="none"
                />
              </svg>
            </a>
            <a
              href="#"
              aria-label="X (Twitter)"
              className="footer__social-icon"
            >
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="currentColor"
              >
                <path d="M18.9 2H22l-7.6 8.7L23.3 22H16l-5.2-6.8L4.9 22H1.8l8.1-9.3L1 2h7.3l4.7 6.3L18.9 2Zm-1.2 18h1.7L6.4 4h-1.8l13.1 16Z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <p>© {year} QuickBite. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
