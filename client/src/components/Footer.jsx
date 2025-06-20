import React from "react";

const Footer = () => {
  return (
    <footer className="py-4">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} DeepMate. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
