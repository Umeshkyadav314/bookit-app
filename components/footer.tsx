export default function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-lg mb-4">Highway Delite</h3>
            <p className="text-sm opacity-80">Discover amazing travel experiences and adventures around the world.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li>
                <a href="#" className="hover:opacity-100">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-100">
                  Experiences
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-100">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-100">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li>
                <a href="#" className="hover:opacity-100">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-100">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-100">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-100">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li>Email: info@highwaydelite.com</li>
              <li>Phone: +91 1234 567 890</li>
              <li>Address: India</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background border-opacity-20 pt-8 text-center text-sm opacity-80">
          <p>&copy; 2025 Highway Delite. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
