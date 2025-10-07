import { Link } from 'react-router-dom';
import Logo from '../Logo';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900"></div>
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.08'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>

      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 animate-gradient"></div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Enhanced Brand Section */}
          <div className="lg:col-span-2">
            <div className="mb-8 group">
              <div className="transform group-hover:scale-105 transition-transform duration-300 inline-block">
                <Logo width="160px" />
              </div>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-md">
              Share your stories, insights, and ideas with the world. Join our community of
              passionate writers and readers creating meaningful content.
            </p>

            {/* Enhanced Social Icons */}
            <div className="flex space-x-4 mb-8">
              <a
                href="#"
                className="group w-12 h-12 bg-gradient-to-r from-gray-700 to-gray-600 hover:from-blue-600 hover:to-blue-500 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer hover:scale-110 transform shadow-lg hover:shadow-blue-500/25"
                title="Follow us on Twitter"
              >
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
              <a
                href="#"
                className="group w-12 h-12 bg-gradient-to-r from-gray-700 to-gray-600 hover:from-indigo-600 hover:to-indigo-500 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer hover:scale-110 transform shadow-lg hover:shadow-indigo-500/25"
                title="Connect on LinkedIn"
              >
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a
                href="#"
                className="group w-12 h-12 bg-gradient-to-r from-gray-700 to-gray-600 hover:from-purple-600 hover:to-purple-500 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer hover:scale-110 transform shadow-lg hover:shadow-purple-500/25"
                title="Follow on Instagram"
              >
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.347-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.748-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z" />
                </svg>
              </a>
              <a
                href="#"
                className="group w-12 h-12 bg-gradient-to-r from-gray-700 to-gray-600 hover:from-pink-600 hover:to-pink-500 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer hover:scale-110 transform shadow-lg hover:shadow-pink-500/25"
                title="Visit our GitHub"
              >
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>

            {/* Newsletter Subscription */}
            <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-2xl p-6 border border-gray-600/30 backdrop-blur-sm">
              <h4 className="text-white font-semibold mb-3 flex items-center">
                <svg className="w-5 h-5 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                Stay Updated
              </h4>
              <p className="text-gray-300 text-sm mb-4">Get notified about new posts and updates.</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 cursor-text"
                />
                <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-medium transition-all duration-200 cursor-pointer hover:scale-105 transform shadow-lg hover:shadow-blue-500/25">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Enhanced Quick Links */}
          <div className="space-y-2">
            <h3 className="text-xl font-bold mb-6 text-white flex items-center">
              <span className="w-8 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-3"></span>
              Quick Links
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  to="/"
                  className="text-gray-300 hover:text-white transition-all duration-300 flex items-center group cursor-pointer hover:translate-x-2 transform"
                >
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-4 group-hover:bg-blue-400 group-hover:scale-150 transition-all duration-300"></span>
                  <span className="relative">
                    Home
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/all-posts"
                  className="text-gray-300 hover:text-white transition-all duration-300 flex items-center group cursor-pointer hover:translate-x-2 transform"
                >
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-4 group-hover:bg-blue-400 group-hover:scale-150 transition-all duration-300"></span>
                  <span className="relative">
                    All Posts
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/add-post"
                  className="text-gray-300 hover:text-white transition-all duration-300 flex items-center group cursor-pointer hover:translate-x-2 transform"
                >
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-4 group-hover:bg-blue-400 group-hover:scale-150 transition-all duration-300"></span>
                  <span className="relative">
                    Create Post
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Enhanced Support */}
          <div className="space-y-2">
            <h3 className="text-xl font-bold mb-6 text-white flex items-center">
              <span className="w-8 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-3"></span>
              Support
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-all duration-300 flex items-center group cursor-pointer hover:translate-x-2 transform"
                >
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-4 group-hover:bg-purple-400 group-hover:scale-150 transition-all duration-300"></span>
                  <span className="relative">
                    Help Center
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300"></span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-all duration-300 flex items-center group cursor-pointer hover:translate-x-2 transform"
                >
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-4 group-hover:bg-purple-400 group-hover:scale-150 transition-all duration-300"></span>
                  <span className="relative">
                    Contact Us
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300"></span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-all duration-300 flex items-center group cursor-pointer hover:translate-x-2 transform"
                >
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-4 group-hover:bg-purple-400 group-hover:scale-150 transition-all duration-300"></span>
                  <span className="relative">
                    Privacy Policy
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300"></span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-all duration-300 flex items-center group cursor-pointer hover:translate-x-2 transform"
                >
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-4 group-hover:bg-purple-400 group-hover:scale-150 transition-all duration-300"></span>
                  <span className="relative">
                    Terms of Service
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300"></span>
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Enhanced Bottom Section */}
        <div className="border-t border-gradient-to-r from-gray-700 via-gray-600 to-gray-700 mt-16 pt-10">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
              <p className="text-gray-400 text-sm flex items-center">
                &copy; {new Date().getFullYear()} Your Blog. All rights reserved.
                <span className="mx-2 text-red-400 animate-pulse">❤️</span>
                Made for bloggers.
              </p>
              <div className="flex items-center space-x-2 text-sm">
                <span className="text-gray-400">Powered by</span>
                <span className="px-3 py-1 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-full text-blue-400 font-semibold hover:scale-105 transform transition-all duration-200 cursor-pointer">
                  React & Appwrite
                </span>
              </div>
            </div>

            {/* Back to Top Button */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="group flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-gray-700/50 to-gray-600/50 hover:from-blue-600 hover:to-purple-600 border border-gray-600/50 hover:border-blue-500/50 rounded-full text-gray-300 hover:text-white transition-all duration-300 cursor-pointer hover:scale-105 transform shadow-lg hover:shadow-blue-500/25"
            >
              <svg className="w-4 h-4 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
              </svg>
              <span className="text-sm font-medium">Back to Top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
