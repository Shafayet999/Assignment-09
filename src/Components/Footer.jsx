import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-pink-50 text-base-content mt-10">
      <div className="container mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">
      
        <div>
          <h2 className="text-lg font-bold mb-3">Contact Info</h2>
          <p>Email: support@example.com</p>
          <p>Phone: +880 1234-567890</p>
          <p>Address: Dhaka, Bangladesh</p>
        </div>

       
        <div>
          <h2 className="text-lg font-bold mb-3">Follow Us</h2>
          <div className="flex gap-4 text-2xl">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <FaFacebook className="hover:text-blue-600 transition" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <FaTwitter className="hover:text-sky-500 transition" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <FaInstagram className="hover:text-pink-500 transition" />
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer">
              <FaGithub className="hover:text-gray-700 transition" />
            </a>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold mb-3">Privacy & Policy</h2>
          <p className="text-sm">
            We respect your privacy and are committed to protecting your personal data.
          </p>
        </div>
      </div>

      <div className="text-center py-4 border-t border-gray-300">
        <p>© {new Date().getFullYear()} Your Website. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
