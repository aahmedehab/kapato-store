import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { FaInstagram, FaFacebookF, FaTiktok } from "react-icons/fa";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  setLoading(true);
  setSent(false);

  try {
    const response = await fetch(
      `${API_URL}/api/contact`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject || "New Contact Message",
          message: formData.message,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || "Failed to send message");
    }

    setSent(true);

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  } catch (error) {
    console.error("Contact form error:", error);
    alert("Failed to send your message. Please try again.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-secondary-30">

      {/* Hero */}
      <section className="py-20 md:py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-sm font-medium tracking-widest text-primary-70 uppercase mb-4">
            Get in touch
          </p>

          <h1 className="text-4xl md:text-5xl font-bold text-primary tracking-tight">
            Contact KAPATO
          </h1>

          <p className="text-gray-600 text-lg mt-5 max-w-2xl mx-auto">
            Have a question about your order, our products, or anything else?
            We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="pb-20 md:pb-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">

            {/* Contact Info */}
            <div className="bg-secondary rounded-3xl p-8 md:p-10">

              <h2 className="text-2xl font-semibold text-primary">
                Let's talk
              </h2>

              <p className="text-gray-600 mt-3 leading-relaxed">
                Whether you have a question about an order, need help choosing
                a product, or simply want to say hello, feel free to reach out.
              </p>

              {/* Email */}
              <a
                href="mailto:kapato.eg@gmail.com"
                className="flex items-center gap-4 mt-10 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary text-secondary flex items-center justify-center">
                  <Mail size={21} />
                </div>

                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium text-primary group-hover:underline">
                    kapato.eg@gmail.com
                  </p>
                </div>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/kapato.eg/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 mt-6 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary text-secondary flex items-center justify-center">
                  <FaInstagram size={21} />
                </div>

                <div>
                  <p className="text-sm text-gray-500">Instagram</p>
                  <p className="font-medium text-primary group-hover:underline">
                    @kapato.eg
                  </p>
                </div>
              </a>

              {/* Response Time */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  Response time
                </p>

                <p className="font-medium text-primary mt-1">
                  We usually respond within 24–48 hours.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-3xl p-8 md:p-10 border border-gray-200">

              <div className="flex items-center gap-3 mb-8">
                <div className="w-11 h-11 rounded-xl bg-primary text-secondary flex items-center justify-center">
                  <Send size={19} />
                </div>

                <div>
                  <h2 className="text-2xl font-semibold text-primary">
                    Send us a message
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    We'll get back to you as soon as possible.
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">

                {/* Name */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Subject
                  </label>

                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What can we help you with?"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Message
                  </label>

                  <textarea
                    name="message"
                    required
                    rows="6"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your message..."
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm resize-none focus:outline-none focus:border-primary transition"
                  />
                </div>

                {/* Success */}
                {sent && (
                  <div className="bg-green-50 border border-green-200 text-green-700 rounded-xl px-4 py-3 text-sm">
                    Your message has been sent successfully. We'll get back to
                    you soon.
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary text-white py-3.5 rounded-xl font-medium hover:bg-primary-dark transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>

              </form>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default Contact;
