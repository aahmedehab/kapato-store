import { Mail } from "lucide-react";

const Policies = () => {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="py-20 md:py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          {/* <p className="text-sm font-medium tracking-widest text-primary-70 uppercase mb-4">
            Customer Information
          </p> */}

          <h1 className="text-4xl md:text-5xl font-bold text-primary tracking-tight">
            KAPATO Policies
          </h1>

          <p className="text-gray-600 text-lg mt-5 max-w-2xl mx-auto">
            Everything you need to know about shipping, returns, exchanges,
            orders, payments, privacy, and more.
          </p>

          <p className="text-sm text-gray-400 mt-4">
            Last updated: August 2026
          </p>
        </div>
      </section>

      {/* Policies */}
      <section className="pb-20 md:pb-28">
        <div className="max-w-5xl mx-auto px-6 space-y-6">

          {/* Shipping */}
          <section
            id="shipping"
            className="bg-secondary rounded-3xl p-8 md:p-10"
          >
            <h2 className="text-2xl font-semibold text-primary mb-5">
              1. Shipping Policy
            </h2>

            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                We currently offer delivery within the areas covered by our
                delivery service in Egypt.
              </p>

              <h3 className="font-semibold text-primary">
                Delivery Time
              </h3>

              <p>
                Orders are normally processed after they are successfully
                placed. Delivery time may vary depending on your location,
                order volume, weekends, holidays, and other circumstances.
              </p>

              <p>
                Our team may contact you by phone to confirm your order before
                dispatch.
              </p>

              <h3 className="font-semibold text-primary">
                Shipping Fee
              </h3>

              <p>
                The standard shipping fee currently displayed at checkout is{" "}
                <strong className="text-primary">LE 60</strong>.
              </p>

              <h3 className="font-semibold text-primary">
                Delivery Address
              </h3>

              <p>Customers are responsible for providing accurate:</p>

              <ul className="list-disc pl-6 space-y-2">
                <li>Full name</li>
                <li>Phone number</li>
                <li>Address</li>
                <li>City</li>
                <li>Governorate</li>
                <li>Apartment or unit number, when applicable</li>
                <li>Postal code, when available</li>
              </ul>

              <p>
                KAPATO is not responsible for delays or failed deliveries
                caused by incorrect or incomplete information provided by the
                customer.
              </p>
            </div>
          </section>

          {/* Returns */}
          <section
            id="returns"
            className="bg-secondary rounded-3xl p-8 md:p-10"
          >
            <h2 className="text-2xl font-semibold text-primary mb-5">
              2. Return Policy
            </h2>

            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                We want you to be satisfied with your purchase.
              </p>

              <p>
                If you receive a product that is defective, damaged, or
                significantly different from what you ordered, please contact
                us as soon as possible after receiving your order.
              </p>

              <h3 className="font-semibold text-primary">
                Return Conditions
              </h3>

              <ul className="list-disc pl-6 space-y-2">
                <li>The product must be unused.</li>
                <li>The product must be in its original condition.</li>
                <li>
                  The product must include its original packaging and
                  accessories, where applicable.
                </li>
                <li>Proof of purchase or order information may be required.</li>
              </ul>

              <p>
                Products that have been worn, washed, damaged, altered, or
                used may not be eligible for return.
              </p>

              <h3 className="font-semibold text-primary">
                Return Requests
              </h3>

              <p>To request a return, provide:</p>

              <ul className="list-disc pl-6 space-y-2">
                <li>Order number</li>
                <li>Customer name</li>
                <li>Reason for the return</li>
                <li>Photos or videos of the product if it is damaged or defective</li>
              </ul>
            </div>
          </section>

          {/* Exchange */}
          <section
            id="exchange"
            className="bg-secondary rounded-3xl p-8 md:p-10"
          >
            <h2 className="text-2xl font-semibold text-primary mb-5">
              3. Exchange Policy
            </h2>

            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                If you received the wrong product, wrong color, or a defective
                item, you may request an exchange.
              </p>

              <p>
                Exchange requests are subject to product availability.
              </p>

              <h3 className="font-semibold text-primary">
                Exchange Conditions
              </h3>

              <ul className="list-disc pl-6 space-y-2">
                <li>Be unused.</li>
                <li>Be in its original condition.</li>
                <li>Have its original packaging where applicable.</li>
                <li>Not have been washed, altered, or damaged after delivery.</li>
              </ul>

              <p>
                If the requested replacement is unavailable, KAPATO may offer
                an alternative solution.
              </p>
            </div>
          </section>

          {/* Cancellation */}
          <section
            id="cancellation"
            className="bg-secondary rounded-3xl p-8 md:p-10"
          >
            <h2 className="text-2xl font-semibold text-primary mb-5">
              4. Cancellation Policy
            </h2>

            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                You may request cancellation of your order before it has been
                processed for shipment.
              </p>

              <p>
                Once an order has been shipped or handed over for delivery,
                cancellation may no longer be possible.
              </p>

              <p>
                To request cancellation, contact us as soon as possible and
                provide your order number.
              </p>

              <p>
                KAPATO cannot guarantee cancellation requests made after the
                order has entered the shipping process.
              </p>
            </div>
          </section>

          {/* Payment */}
          <section
            id="payment"
            className="bg-secondary rounded-3xl p-8 md:p-10"
          >
            <h2 className="text-2xl font-semibold text-primary mb-5">
              5. Payment Policy
            </h2>

            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                KAPATO currently accepts{" "}
                <strong className="text-primary">
                  Cash on Delivery (COD)
                </strong>{" "}
                for eligible orders.
              </p>

              <p>
                Payment is made to the delivery representative when your order
                is delivered.
              </p>

              <p>
                The total amount payable is the amount shown at checkout,
                including the applicable shipping fee.
              </p>

              <p>
                KAPATO reserves the right to change or add payment methods in
                the future.
              </p>
            </div>
          </section>

          {/* Order */}
          <section
            id="orders"
            className="bg-secondary rounded-3xl p-8 md:p-10"
          >
            <h2 className="text-2xl font-semibold text-primary mb-5">
              6. Order Policy
            </h2>

            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                After placing an order, you will receive an order confirmation.
              </p>

              <p>
                Orders are subject to availability and successful confirmation.
              </p>

              <p>
                KAPATO reserves the right to contact customers to verify order
                details before processing an order.
              </p>

              <p>We may cancel an order in situations including:</p>

              <ul className="list-disc pl-6 space-y-2">
                <li>Product unavailability</li>
                <li>Incorrect or incomplete customer information</li>
                <li>Invalid contact information</li>
                <li>Suspected fraudulent activity</li>
                <li>Pricing or technical errors</li>
                <li>Delivery limitations</li>
              </ul>
            </div>
          </section>

          {/* Product Information */}
          <section className="bg-secondary rounded-3xl p-8 md:p-10">
            <h2 className="text-2xl font-semibold text-primary mb-5">
              7. Product Information
            </h2>

            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                We make reasonable efforts to ensure that product names,
                descriptions, colors, images, prices, and other information
                displayed on the website are accurate.
              </p>

              <p>
                However, colors may appear slightly different depending on the
                customer's screen, display settings, lighting, or photography
                conditions.
              </p>

              <p>
                Product availability and prices may change without prior
                notice.
              </p>
            </div>
          </section>

          {/* Damaged Orders */}
          <section className="bg-secondary rounded-3xl p-8 md:p-10">
            <h2 className="text-2xl font-semibold text-primary mb-5">
              8. Damaged or Incorrect Orders
            </h2>

            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                If your order arrives damaged or contains an incorrect item,
                please contact us as soon as possible.
              </p>

              <p>Please provide:</p>

              <ul className="list-disc pl-6 space-y-2">
                <li>Your order number</li>
                <li>A description of the issue</li>
                <li>Clear photos of the product</li>
                <li>Photos of the packaging when relevant</li>
              </ul>

              <p>
                Our team will review the case and determine the appropriate
                solution.
              </p>
            </div>
          </section>

          {/* Privacy */}
          <section
            id="privacy"
            className="bg-secondary rounded-3xl p-8 md:p-10"
          >
            <h2 className="text-2xl font-semibold text-primary mb-5">
              9. Privacy Policy
            </h2>

            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                KAPATO respects your privacy.
              </p>

              <p>
                When you place an order or contact us, we may collect
                information necessary to process your request, such as:
              </p>

              <ul className="list-disc pl-6 space-y-2">
                <li>Name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Delivery address</li>
                <li>City</li>
                <li>Governorate</li>
                <li>Order information</li>
              </ul>

              <p>This information may be used to:</p>

              <ul className="list-disc pl-6 space-y-2">
                <li>Process and deliver orders</li>
                <li>Contact customers regarding their orders</li>
                <li>Respond to customer inquiries</li>
                <li>Provide customer support</li>
                <li>Improve our services</li>
                <li>Prevent fraudulent or unauthorized activity</li>
              </ul>
            </div>
          </section>

          {/* Security */}
          <section className="bg-secondary rounded-3xl p-8 md:p-10">
            <h2 className="text-2xl font-semibold text-primary mb-5">
              10. Website Security
            </h2>

            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                We take reasonable measures to protect information submitted
                through our website.
              </p>

              <p>
                However, no online transmission or storage system can be
                guaranteed to be completely secure.
              </p>
            </div>
          </section>

          {/* Terms */}
          <section
            id="terms"
            className="bg-secondary rounded-3xl p-8 md:p-10"
          >
            <h2 className="text-2xl font-semibold text-primary mb-5">
              11. Terms & Conditions
            </h2>

            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                By using the KAPATO website, you agree to use the website
                lawfully and responsibly.
              </p>

              <p>You may not:</p>

              <ul className="list-disc pl-6 space-y-2">
                <li>Use the website for fraudulent purposes.</li>
                <li>Attempt to gain unauthorized access to our systems.</li>
                <li>Interfere with the operation of the website.</li>
                <li>Copy or misuse KAPATO content without permission.</li>
                <li>Submit false or misleading information.</li>
              </ul>

              <p>
                KAPATO reserves the right to update products, prices, services,
                policies, and website content at any time.
              </p>
            </div>
          </section>

          {/* Intellectual Property */}
          <section className="bg-secondary rounded-3xl p-8 md:p-10">
            <h2 className="text-2xl font-semibold text-primary mb-5">
              12. Intellectual Property
            </h2>

            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                All KAPATO branding, logos, product images, graphics, text,
                designs, and website content are owned by or used by KAPATO
                with permission.
              </p>

              <p>
                Content may not be copied, reproduced, modified, distributed,
                or commercially used without prior permission.
              </p>
            </div>
          </section>

          {/* Updates */}
          <section className="bg-secondary rounded-3xl p-8 md:p-10">
            <h2 className="text-2xl font-semibold text-primary mb-5">
              13. Policy Updates
            </h2>

            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                KAPATO may update these policies from time to time.
              </p>

              <p>
                When changes are made, the updated version will be published on
                this page with a revised "Last updated" date.
              </p>
            </div>
          </section>

          {/* Contact */}
          <section
            id="contact"
            className="bg-primary text-white rounded-3xl p-8 md:p-10"
          >
            <h2 className="text-2xl font-semibold mb-5">
              14. Contact & Support
            </h2>

            <div className="space-y-4 leading-relaxed text-gray-200">
              <p>
                If you have any questions regarding an order, return,
                exchange, shipping, or any of these policies, please contact
                us.
              </p>

              <a
                href="mailto:kapato.eg@gmail.com"
                className="inline-flex items-center gap-3 text-white font-medium hover:underline"
              >
                <Mail size={18} />
                kapato.eg@gmail.com
              </a>

              <p>
                We aim to respond to customer inquiries within{" "}
                <strong className="text-white">
                  24–48 hours
                </strong>
                .
              </p>
            </div>
          </section>

          {/* Bottom */}
          <div className="text-center pt-8">
            <p className="text-gray-500 text-sm">
              Thank you for choosing{" "}
              <span className="font-semibold text-primary">
                KAPATO
              </span>
              .
            </p>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Policies;