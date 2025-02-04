import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-lightBackground dark:bg-dark text-darkText dark:text-white flex flex-col">
      {/* Navbar */}
      <nav className="bg-card p-4 shadow-md flex justify-between items-center">
        <div className="text-xl font-bold">NyptyRx</div>
        <div>
          <Link
            to="/login"
            className="px-4 py-2 bg-highlight hover:bg-highlightHover rounded text-white mr-2 transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 bg-lightHighlight hover:bg-lightHighlightHover rounded text-white transition"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="flex flex-col items-center justify-center flex-grow text-center px-4 mt-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Manage Your Pharmacy Effortlessly
        </h1>
        <p className="text-lg md:text-2xl mb-8 max-w-2xl">
          Streamline your pharmacy operations with our powerful, easy-to-use SaaS
          solution. From inventory management to billing and invoicing, we’ve got
          you covered.
        </p>
        <Link
          to="/register"
          className="px-8 py-3 bg-highlight hover:bg-highlightHover text-white rounded-full text-lg font-semibold transition mb-3"
        >
          Get Started Today
        </Link>
      </header>

      {/* Features Section */}
      <section className="py-12 bg-lightCard dark:bg-card">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 border border-lightBorder dark:border-borderGray rounded-lg shadow-md bg-white dark:bg-dark">
            <h3 className="text-2xl font-bold mb-2 text-darkText dark:text-white">
              Inventory Management
            </h3>
            <p className="text-grayText">
              Keep track of your stock, manage orders, and receive low-stock alerts
              all in one place.
            </p>
          </div>
          <div className="text-center p-6 border border-lightBorder dark:border-borderGray rounded-lg shadow-md bg-white dark:bg-dark">
            <h3 className="text-2xl font-bold mb-2 text-darkText dark:text-white">
              Billing & Invoicing
            </h3>
            <p className="text-grayText">
              Create, send, and manage invoices seamlessly with our integrated billing
              solutions.
            </p>
          </div>
          <div className="text-center p-6 border border-lightBorder dark:border-borderGray rounded-lg shadow-md bg-white dark:bg-dark">
            <h3 className="text-2xl font-bold mb-2 text-darkText dark:text-white">
              Analytics & Reports
            </h3>
            <p className="text-grayText">
              Gain insights into your pharmacy operations with detailed analytics and
              real-time reports.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}  
      <footer className="bg-card p-4 text-center text-grayText">
        <p>&copy; {new Date().getFullYear()} NyptyRx. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
