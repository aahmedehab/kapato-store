const Terms = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-10">Terms & Policies</h1>

      <div className="prose prose-lg text-gray-700 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">1. General</h2>
          <p>
            Welcome to KAPATO. By accessing or using our website, you agree to be bound by these Terms and Conditions.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">2. Shipping & Delivery</h2>
          <p>
            We offer standard shipping within Egypt. Delivery usually takes 5-7 business days. 
            Free shipping on orders above 800 EGP.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">3. Returns & Exchanges</h2>
          <p>
            You have 30 days from the date of delivery to return any item. Items must be unused, 
            in original packaging, and with all tags attached.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">4. Privacy Policy</h2>
          <p>
            We respect your privacy. Your personal information is used only for order processing 
            and improving your shopping experience. We do not sell your data to third parties.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">5. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at:
            <br />
            <strong>support@kapato.com</strong>
          </p>
        </section>
      </div>
    </div>
  );
};

export default Terms;