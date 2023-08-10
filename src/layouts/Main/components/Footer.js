import React from "react";
import { useLocation } from "react-router-dom";
import footerLogo from "../../../assets/home_images/home_page_logo-removebg-preview.png"

const Footer = () => {
  const { pathname } = useLocation();

  return (
    <footer
      className={`footer p-10 bg-base-200 text-base-content ${pathname === "/signin" || pathname === "/signup" ? "hidden" : "static"
        }`}
    >
      <div>
        <img className="lg:h-[60px] h-[50px] w-40 mx-auto lg:mr-auto" src={footerLogo} alt="" />
        <p>
        Virtual Class 
          <br />
          Providing reliable services since 2023
        </p>
      </div>
      <div>
        <span className="footer-title">Services</span>
        <a className="link link-hover">Branding</a>
        <a className="link link-hover">Design</a>
        <a className="link link-hover">Marketing</a>
        <a className="link link-hover">Advertisement</a>
      </div>
      <div>
        <span className="footer-title">Company</span>
        <a className="link link-hover">About us</a>
        <a className="link link-hover">Contact</a>
        <a className="link link-hover">Jobs</a>
        <a className="link link-hover">Press kit</a>
      </div>
      <div>
        <span className="footer-title">Legal</span>
        <a className="link link-hover">Terms of use</a>
        <a className="link link-hover">Privacy policy</a>
        <a className="link link-hover">Cookie policy</a>
      </div>
    </footer>
  );
};

export default Footer;
