import * as React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-yellow-400/10 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-6xl mx-auto px-6 py-16">
          {/* Top Section */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-12 mb-12">
            {/* Brand Section */}
            <div className="lg:max-w-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl flex items-center justify-center text-2xl font-bold text-black">
                  🎮
                </div>
                <h1 className="text-3xl font-black bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent">
                  Lootie
                </h1>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed text-left">
                Become part of the most exciting communities in the world.
                Explore new horizons, achieve the impossible, and make a
                difference - all while having fun and earning rewards.
              </p>
            </div>

            {/* Links Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-12">
              {/* LEARN */}
              <div>
                <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-6 border-b border-gray-800 pb-2">
                  Learn
                </h3>
                <div className="space-y-4">
                  <a
                    href="#"
                    className="block text-gray-400 hover:text-yellow-400 transition-all duration-300 hover:translate-x-1"
                  >
                    Blog
                  </a>
                  <a
                    href="#"
                    className="block text-gray-400 hover:text-yellow-400 transition-all duration-300 hover:translate-x-1"
                  >
                    Documentation
                  </a>
                  <a
                    href="#"
                    className="block text-gray-400 hover:text-yellow-400 transition-all duration-300 hover:translate-x-1"
                  >
                    API docs
                  </a>
                </div>
              </div>

              {/* GET STARTED */}
              <div>
                <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-6 border-b border-gray-800 pb-2">
                  Get Started
                </h3>
                <div className="space-y-4">
                  <a
                    href="#"
                    className="block text-gray-400 hover:text-yellow-400 transition-all duration-300 hover:translate-x-1"
                  >
                    Create account
                  </a>
                  <a
                    href="#"
                    className="block text-gray-400 hover:text-yellow-400 transition-all duration-300 hover:translate-x-1"
                  >
                    Log in
                  </a>
                  <a
                    href="#"
                    className="block text-gray-400 hover:text-yellow-400 transition-all duration-300 hover:translate-x-1"
                  >
                    Create community
                  </a>
                  <a
                    href="#"
                    className="block text-gray-400 hover:text-yellow-400 transition-all duration-300 hover:translate-x-1"
                  >
                    Become partner
                  </a>
                </div>
              </div>

              {/* RESOURCES */}
              <div>
                <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-6 border-b border-gray-800 pb-2">
                  Resources
                </h3>
                <div className="space-y-4">
                  <a
                    href="#"
                    className="block text-gray-400 hover:text-yellow-400 transition-all duration-300 hover:translate-x-1"
                  >
                    About
                  </a>
                  <a
                    href="#"
                    className="block text-gray-400 hover:text-yellow-400 transition-all duration-300 hover:translate-x-1"
                  >
                    Contact support
                  </a>
                  <a
                    href="#"
                    className="block text-gray-400 hover:text-yellow-400 transition-all duration-300 hover:translate-x-1"
                  >
                    Cookie preferences
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800/50 bg-black/30 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-6 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              {/* Copyright */}
              <div className="text-gray-400 text-sm">
                © 2025 Lootie. Make by BrianQuang & PhoebeVy
              </div>

              {/* Social Media Icons */}
              <div className="flex items-center gap-4">
                {/* Telegram */}
                <a href="#" className="group relative">
                  <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center group-hover:bg-blue-500 transition-all duration-300 group-hover:scale-110">
                    <svg
                      className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                    </svg>
                  </div>
                </a>

                {/* X (Twitter) */}
                <a
                  href="https://x.com/lootiewallet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative"
                >
                  <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center group-hover:bg-gray-700 transition-all duration-300 group-hover:scale-110">
                    <svg
                      className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </div>
                </a>

                {/* LinkedIn */}
                <a href="#" className="group relative">
                  <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center group-hover:bg-blue-600 transition-all duration-300 group-hover:scale-110">
                    <svg
                      className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </div>
                </a>

                {/* Discord */}
                <a href="#" className="group relative">
                  <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center group-hover:bg-indigo-500 transition-all duration-300 group-hover:scale-110">
                    <svg
                      className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.019 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z" />
                    </svg>
                  </div>
                </a>

                {/* Facebook */}
                <a href="#" className="group relative">
                  <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center group-hover:bg-blue-600 transition-all duration-300 group-hover:scale-110">
                    <svg
                      className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </div>
                </a>
              </div>

              {/* Additional Links */}
              <div className="flex items-center gap-6 text-sm text-gray-400">
                <a href="#" className="hover:text-yellow-400 transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="hover:text-yellow-400 transition-colors">
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
