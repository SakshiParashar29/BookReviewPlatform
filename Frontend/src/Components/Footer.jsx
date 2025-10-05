import React from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-10 w-full">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-3">BookPlatform</h2>
            <p className="text-sm leading-relaxed">
              Discover, read, and share your favorite books.  
              A platform built for book lovers by book lovers.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-3">Quick Links</h2>
            <ul className="space-y-2 text-sm">
              <li><a href="/home" className="hover:text-white transition">Home</a></li>
              <li><a href="/books" className="hover:text-white transition">All Books</a></li>
            </ul>
          </div>

          {/* Social Buttons */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-3">Connect With Us</h2>
            <div className="flex space-x-4">
              <button
                className="bg-gray-800 cursor-pointer hover:bg-gray-700 text-white p-3 rounded-full transition-all duration-300 hover:scale-105"
              >
                <FaGithub size={20} />
              </button>

              <button
                className="bg-gray-800 cursor-pointer hover:bg-gray-700 text-white p-3 rounded-full transition-all duration-300 hover:scale-105"
              >
                <FaLinkedin size={20} />
              </button>

              <button
                className="bg-gray-800 cursor-pointer hover:bg-gray-700 text-white p-3 rounded-full transition-all duration-300 hover:scale-105"
              >
                <FaTwitter size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} BookPlatform. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
