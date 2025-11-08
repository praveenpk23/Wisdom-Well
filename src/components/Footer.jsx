import React from "react";

const Footer = () => {
  return (
    <footer className="bg-base-100 border-t mt-10">
      <div className="max-w-6xl mx-auto px-4 py-5">

        {/* Top Section */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start sm:justify-between gap-6">

          {/* Branding */}
          <div className="flex flex-col items-center sm:items-start">
            <h2 className="text-3xl font-bold text-primary tracking-wide">
              Wisdom <span className="font-light text-base-content">Well</span>
            </h2>
            <p className="text-sm opacity-70 mt-2 text-center sm:text-left max-w-xs">
              A curated platform for deep thinkers, learners, and seekers of wisdom.
              Discover insights that make life meaningful.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-wrap justify-center sm:justify-end gap-6 text-sm font-medium">
            <a href="#" className="hover:text-primary transition">
              About
            </a>
            <a href="#" className="hover:text-primary transition">
              Contact
            </a>
            <a href="#" className="hover:text-primary transition">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-primary transition">
              Terms
            </a>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-8 border-base-300" />

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-sm opacity-70">
          <p>© 2025 Wisdom Well. All rights reserved.</p>

          <div className="flex gap-4 mt-3 sm:mt-0">
            {/* Social (Optional Icons) */}
            <a href="#" className="hover:text-primary transition">Instagram</a>
            <a href="#" className="hover:text-primary transition">Twitter</a>
            <a href="#" className="hover:text-primary transition">LinkedIn</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
