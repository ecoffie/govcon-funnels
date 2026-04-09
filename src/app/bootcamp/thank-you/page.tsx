import ThankYouPage from '@/components/ThankYouPage';

export default function BootcampThankYou() {
  return (
    <ThankYouPage
      title="Handouts On Their Way! 📬"
      message="Check your email for event details, and download your free handouts below."
      primaryCtaUrl="/resources/handouts"
      primaryCtaText="Download Free Handouts"
      nextSteps={[
        "Download your free handouts using the button above",
        "Add Feb 28, 9am-5pm ET to your calendar",
        "Review the handouts before the bootcamp",
        "Prepare your questions for the live Q&A"
      ]}
      upsellTitle="Get VIP Access to the Bootcamp"
      upsellDescription="Upgrade to Pro for priority seating, 1-on-1 hot seat coaching, and exclusive bonuses."
    />
  );
}
