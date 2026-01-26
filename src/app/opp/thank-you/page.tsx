import ThankYouPage from '@/components/ThankYouPage';

export default function OppThankYou() {
  return (
    <ThankYouPage
      title="Access Granted! 🎯"
      message="Check your email for your login credentials to the Opportunity Finder tool."
      nextSteps={[
        "Check your inbox for login details",
        "Log in and enter your business info",
        "Review your personalized agency matches",
        "Save your top 5 target agencies"
      ]}
      upsellTitle="Want More Opportunities?"
      upsellDescription="Pro members get unlimited searches, advanced filters, and weekly opportunity alerts."
    />
  );
}
