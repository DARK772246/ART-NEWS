import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const AboutUs = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="headline-serif text-4xl md:text-5xl mb-8 text-primary">RT News کے بارے میں</h1>

          <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
            <p className="text-lg leading-relaxed">
              RT News ایک آزادانہ اور جدید ڈیجیٹل نیوز پلیٹ فارم ہے، جو قومی و بین الاقوامی حالات و واقعات کو مستند، تیز اور ذمہ دارانہ انداز میں عوام تک پہنچانے کے لیے قائم کیا گیا۔ ہمارا مقصد سچائی کو بغیر کسی دباؤ اور مفاد کے پیش کرنا اور وہ خبریں سامنے لانا ہے جو عوام کے اصل مسائل سے جڑی ہوں۔
            </p>

            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4 text-primary">🎯 ہمارا مشن</h2>
              <p>
                RT News کا مشن عوام کو درست، بروقت اور تصدیق شدہ معلومات فراہم کرنا ہے۔ ہم ایسی صحافت کے قائل ہیں جو سچائی، شفافیت، دیانت اور غیر جانبداری پر مبنی ہو۔
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4 text-primary">📰 ہم کیا فراہم کرتے ہیں؟</h2>
              <ul className="space-y-2 list-disc list-inside">
                <li>بریکنگ نیوز</li>
                <li>نیشنل اور انٹرنیشنل خبریں</li>
                <li>مقامی عوامی مسائل پر خصوصی رپورٹس</li>
                <li>تحقیقاتی صحافت</li>
                <li>تجزیے اور آراء</li>
                <li>فیچر اسٹوریز</li>
                <li>انٹرویوز اور گراؤنڈ رپورٹس</li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4 text-primary">⚖️ ہمارے بنیادی اصول</h2>
              <ul className="space-y-2 list-disc list-inside">
                <li>خبروں کی درستگی اور تصدیق</li>
                <li>غیر جانبدار رپورٹنگ</li>
                <li>عوامی مفاد کو ترجیح</li>
                <li>پیشہ ورانہ صحافتی ذمہ داری</li>
                <li>شفافیت اور دیانتداری</li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4 text-primary">👥 ہماری ٹیم</h2>
              <p>
                RT News کی ٹیم تجربہ کار رپورٹرز، تحقیقاتی صحافیوں، ایڈیٹرز، کیمرہ پرسنز اور سوشل میڈیا اینالسٹس پر مشتمل ہے جو 24/7 محنت سے مستند خبریں فراہم کرتے ہیں۔
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4 text-primary">🌍 ہمارا وژن</h2>
              <p>
                ڈیجیٹل میڈیا کی دنیا میں ایک ایسا معتبر نیوز پلیٹ فارم بننا جو قابلِ اعتماد معلومات، حقیقت پر مبنی رپورٹنگ اور عوامی آواز کی علامت ہو۔
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-8 text-center">
              <h2 className="text-2xl font-semibold mb-6 text-primary">👨‍💼 CEO</h2>
              <div className="flex flex-col items-center">
                <img 
                  src="/images/ceo/ceo-profile.jpg" 
                  alt="سنیئر صحافی یاسین ظہور" 
                  className="w-40 h-40 rounded-full object-cover mb-4 border-4 border-primary shadow-lg"
                  onError={(e) => {
                    e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect fill='%23ddd' width='200' height='200'/%3E%3Ctext x='50%' y='50%' font-size='20' fill='%23999' text-anchor='middle' dy='.3em'%3ENo Image%3C/text%3E%3C/svg%3E";
                  }}
                />
                <h3 className="text-xl font-semibold text-primary mb-2">سنیئر صحافی یاسین ظہور</h3>
                <p className="text-muted-foreground text-sm">
                  پرنٹ میڈیاء ، الیکڑانک میڈیاء اور سوشل میڈیا سپیشلسٹ
                </p>
              </div>
            </div>

            <div className="bg-primary/10 border border-primary rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4 text-primary">📞 رابطہ</h2>
              <div className="space-y-2">
                <p><strong>Email:</strong> engryaseen93@gmail.com</p>
                <p><strong>Phone:</strong> +92-314-9499032</p>
                <p><strong>Address:</strong> Charsada Road, Sardar Colony, Peshawar</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutUs;
