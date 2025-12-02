import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="headline-serif text-4xl md:text-5xl mb-8 text-primary">Contact Us</h1>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-semibold mb-4 text-primary">📧 Email</h2>
                  <a href="mailto:engryaseen93@gmail.com" className="text-base hover:text-primary transition-colors break-all">
                    engryaseen93@gmail.com
                  </a>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-4 text-primary">📱 Phone</h2>
                  <a href="tel:+923149499032" className="text-base hover:text-primary transition-colors">
                    +92-314-9499032
                  </a>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-4 text-primary">📍 Address</h2>
                  <p className="text-muted-foreground">
                    Charsada Road<br />
                    Sardar Colony<br />
                    Peshawar, Pakistan
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-4 text-primary">🕐 Working Hours</h2>
                  <p className="text-muted-foreground">
                    24/7 News Coverage<br />
                    Always Available for Inquiries
                  </p>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-card border border-border rounded-lg p-8">
                <h2 className="text-2xl font-semibold mb-6 text-primary">Get In Touch</h2>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Your Name"
                      className="w-full px-4 py-2 bg-background border border-border rounded focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                    <input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      className="w-full px-4 py-2 bg-background border border-border rounded focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-2">Subject</label>
                    <input
                      id="subject"
                      type="text"
                      placeholder="Subject"
                      className="w-full px-4 py-2 bg-background border border-border rounded focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                    <textarea
                      id="message"
                      placeholder="Your message..."
                      rows={5}
                      className="w-full px-4 py-2 bg-background border border-border rounded focus:outline-none focus:border-primary transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-primary text-primary-foreground rounded font-semibold hover:bg-primary/90 transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
