interface FooterProps {
  footerText?: string
  socialLinks?: {
    github?: string
    linkedin?: string
    twitter?: string
    email?: string
  }
}

export default function Footer({ footerText, socialLinks }: FooterProps) {
  return (
    <footer className="bg-white border-t border-gray-200 py-16 px-6 mt-20">
      <div className="container mx-auto max-w-5xl">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <h3 className="font-black text-xl text-gray-900">Yash Varma</h3>
            </div>
            <p className="text-gray-600 mb-6 max-w-md text-sm leading-relaxed">
              Freelance AI Developer & Full-Stack Engineer helping businesses transform through intelligent solutions.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-4 text-sm">Services</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="/services" className="text-gray-600 hover:text-gray-900">AI Development</a></li>
              <li><a href="/services" className="text-gray-600 hover:text-gray-900">Full-Stack Web Apps</a></li>
              <li><a href="/services" className="text-gray-600 hover:text-gray-900">Automation</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-4 text-sm">Contact</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="/contact" className="text-gray-600 hover:text-gray-900">Get in Touch</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-8 text-center">
          <p className="text-gray-500 text-xs">
            {footerText || `© ${new Date().getFullYear()} Yash Varma • Crafting intelligent solutions`}
          </p>
        </div>
      </div>
    </footer>
  )
}