import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="headline-serif text-4xl md:text-5xl mb-8 text-primary">Privacy Policy</h1>

          <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-primary">1. Introduction</h2>
              <p>
                RT News ("we," "us," or "our") operates the website and applications. This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our service and the choices you have associated with that data.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-primary">2. Information Collection and Use</h2>
              <p>
                We collect several different types of information for various purposes to provide and improve our service to you.
              </p>
              <h3 className="text-xl font-semibold mt-4 mb-2">Types of Data Collected:</h3>
              <ul className="space-y-2 list-disc list-inside">
                <li><strong>Personal Data:</strong> While using our service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). This may include, but is not limited to: Email address, First name and last name, Phone number, Cookies and usage data.</li>
                <li><strong>Usage Data:</strong> We may also collect information on how the service is accessed and used ("Usage Data").</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-primary">3. Use of Data</h2>
              <p>RT News uses the collected data for various purposes:</p>
              <ul className="space-y-2 list-disc list-inside">
                <li>To provide and maintain our service</li>
                <li>To notify you about changes to our service</li>
                <li>To allow you to participate in interactive features of our service when you choose to do so</li>
                <li>To provide customer support</li>
                <li>To gather analysis or valuable information so that we can improve our service</li>
                <li>To monitor the usage of our service</li>
                <li>To detect, prevent and address technical issues</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-primary">4. Security of Data</h2>
              <p>
                The security of your data is important to us but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-primary">5. Contact Us</h2>
              <p>If you have any questions about this Privacy Policy, please contact us at:</p>
              <div className="mt-4 p-4 bg-card border border-border rounded">
                <p><strong>Email:</strong> engryaseen93@gmail.com</p>
                <p><strong>Phone:</strong> +92-314-9499032</p>
                <p><strong>Address:</strong> Charsada Road, Sardar Colony, Peshawar</p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
