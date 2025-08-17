import React from "react";
import logo from "/logo.png";
import {
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";
import { Link } from "react-router";

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

        <Link
          to="https://smabari.netlify.app/"
          className="btn btn-primary btn-soft"
          target="_blank"
        >
          Visit Developer Portfolio
        </Link>
      </aside>

      <nav>
        <div className="grid grid-flow-col gap-4">
          <a
            href="https://www.facebook.com/sma.bari.shafin"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook
              size={25}
              className="hover:text-primary transition hover:scale-90"
            />
          </a>
          <a
            href="https://www.instagram.com/sma.bari.shafin/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram
              size={25}
              className="hover:text-primary transition hover:scale-90"
            />
          </a>
          <a
            href="https://x.com/sma_bari"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter
              size={25}
              className="hover:text-primary transition hover:scale-90"
            />
          </a>
          <a
            href="https://wa.me/8801609300080"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaWhatsapp
              size={25}
              className="hover:text-primary transition hover:scale-90"
            />
          </a>
          <a
            href="mailto:mdazizulbarishafin@gmail.com"
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
