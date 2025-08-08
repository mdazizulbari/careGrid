import React from "react";
import logo from "/logo.png";
import {
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer bg-base-200 footer-horizontal footer-center mt-10 rounded-tl-4xl rounded-tr-4xl p-10">
      <aside>
        <img src={logo} className="w-10" alt="" />
        <p className="font-bold">
          <span className="font-gummy text-primary text-4xl">CareGrid</span>
          <br />
          Empowering Health, Connecting Communities
        </p>
        <p>© {new Date().getFullYear()} CareGrid. All right reserved</p>
      </aside>
      <nav>
        <div className="grid grid-flow-col gap-4">
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook
              size={25}
              className="hover:text-primary transition hover:scale-90"
            />
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram
              size={25}
              className="hover:text-primary transition hover:scale-90"
            />
          </a>
          <a href="https://www.x.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter
              size={25}
              className="hover:text-primary transition hover:scale-90"
            />
          </a>
          <a
            href="https://www.whatsapp.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaWhatsapp
              size={25}
              className="hover:text-primary transition hover:scale-90"
            />
          </a>
          <a
            href="mailto:support@caregrid.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaEnvelope
              size={25}
              className="hover:text-primary transition hover:scale-90"
            />
          </a>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
