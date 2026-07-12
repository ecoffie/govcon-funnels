import Link from "next/link";
import { generateSeo } from "@/lib/seo";

export const metadata = generateSeo({
  title: "Privacy Policy",
  description: "Privacy Policy for GovCon Giants — how we collect, use, and protect your information.",
  path: "/privacy-policy",
  noIndex: true,
});

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        <p className="text-gray-600 mb-8">Last Updated: March 9, 2026</p>

        <div className="prose prose-lg max-w-none">
          <p className="text-gray-700 mb-6">
            GovConEdu LLC (&quot;GovCon Giants,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to protecting your privacy.
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our
            website govcongiants.com, shop.govcongiants.com, getmindy.ai, and use our services.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">1. Information We Collect</h2>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Personal Information</h3>
          <p className="text-gray-700 mb-4">We may collect personal information that you voluntarily provide to us when you:</p>
          <ul className="list-disc pl-6 mb-6 text-gray-700">
            <li>Register for an account</li>
            <li>Purchase our products or services</li>
            <li>Subscribe to our email list or SMS notifications</li>
            <li>Register for webinars or bootcamps</li>
            <li>Contact us with inquiries</li>
          </ul>
          <p className="text-gray-700 mb-4">This information may include:</p>
          <ul className="list-disc pl-6 mb-6 text-gray-700">
            <li>Name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Company name</li>
            <li>Payment information (processed securely via Stripe)</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Usage Information</h3>
          <p className="text-gray-700 mb-6">
            We automatically collect certain information when you visit our website, including your IP address,
            browser type, operating system, referring URLs, and information about how you interact with our site.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">2. How We Use Your Information</h2>
          <p className="text-gray-700 mb-4">We use the information we collect to:</p>
          <ul className="list-disc pl-6 mb-6 text-gray-700">
            <li>Provide, maintain, and improve our services</li>
            <li>Process transactions and send related information</li>
            <li>Send you marketing and promotional communications (with your consent)</li>
            <li>Send you SMS notifications and alerts (with your explicit consent)</li>
            <li>Respond to your comments, questions, and customer service requests</li>
            <li>Monitor and analyze trends, usage, and activities</li>
            <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4" id="sms-communications">3. SMS/Text Message Communications</h2>
          <p className="text-gray-700 mb-4">
            By providing your phone number and opting in to receive SMS communications, you consent to receive
            text messages from GovCon Giants. These messages may include:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700">
            <li>Daily intelligence briefings with government contracting opportunities</li>
            <li>Alerts about expiring contracts and recompete opportunities</li>
            <li>Important updates about your account or purchases</li>
            <li>Webinar and bootcamp reminders</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">SMS Opt-In and Consent</h3>
          <p className="text-gray-700 mb-4">
            You must explicitly opt in to receive SMS messages from us. We collect your consent through:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700">
            <li>Checking a checkbox or clicking a button indicating your consent to receive SMS messages</li>
            <li>Enabling SMS notifications in your account settings</li>
            <li>Providing your phone number during checkout with SMS opt-in selected</li>
          </ul>
          <p className="text-gray-700 mb-4">
            <strong>Message frequency:</strong> Varies based on your subscription. Daily briefing subscribers
            receive 1 message per day. Other notifications are sent as needed.
          </p>
          <p className="text-gray-700 mb-4">
            <strong>Message and data rates may apply.</strong> Check with your mobile carrier for details.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">How to Opt Out of SMS</h3>
          <p className="text-gray-700 mb-4">
            You can opt out of receiving SMS messages at any time by:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700">
            <li>Replying STOP to any message you receive from us</li>
            <li>Updating your preferences in your account settings</li>
            <li>Contacting us at hello@govconedu.com</li>
          </ul>
          <p className="text-gray-700 mb-6">
            After opting out, you will receive one final confirmation message. You will no longer receive
            SMS messages from us unless you opt in again.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">4. Email Communications</h2>
          <p className="text-gray-700 mb-4">
            By providing your email address, you may receive:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700">
            <li>Daily intelligence briefings</li>
            <li>Product updates and announcements</li>
            <li>Marketing and promotional content</li>
            <li>Transactional emails (receipts, confirmations)</li>
          </ul>
          <p className="text-gray-700 mb-6">
            You can unsubscribe from marketing emails at any time by clicking the &quot;unsubscribe&quot; link
            at the bottom of any email.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">5. Information Sharing</h2>
          <p className="text-gray-700 mb-4">We do not sell your personal information. We may share your information with:</p>
          <ul className="list-disc pl-6 mb-6 text-gray-700">
            <li><strong>Service Providers:</strong> Companies that help us operate our business (payment processing, email delivery, SMS delivery, analytics)</li>
            <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
            <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">6. Data Security</h2>
          <p className="text-gray-700 mb-6">
            We implement appropriate technical and organizational measures to protect your personal information.
            However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">7. Your Rights</h2>
          <p className="text-gray-700 mb-4">Depending on your location, you may have the right to:</p>
          <ul className="list-disc pl-6 mb-6 text-gray-700">
            <li>Access the personal information we hold about you</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Opt out of marketing communications</li>
            <li>Opt out of SMS communications</li>
          </ul>
          <p className="text-gray-700 mb-6">
            To exercise these rights, contact us at hello@govconedu.com.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">8. Children&apos;s Privacy</h2>
          <p className="text-gray-700 mb-6">
            Our services are not intended for individuals under 18 years of age. We do not knowingly collect
            personal information from children.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">9. Changes to This Policy</h2>
          <p className="text-gray-700 mb-6">
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting
            the new Privacy Policy on this page and updating the &quot;Last Updated&quot; date.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">10. Contact Us</h2>
          <p className="text-gray-700 mb-4">
            If you have questions about this Privacy Policy, please contact us:
          </p>
          <ul className="list-none mb-6 text-gray-700">
            <li><strong>GovConEdu LLC</strong></li>
            <li>Email: hello@govconedu.com</li>
          </ul>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link href="/" className="text-green-600 hover:text-green-700 font-medium">
            &larr; Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
