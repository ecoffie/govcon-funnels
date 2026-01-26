import ThankYouPage from '@/components/ThankYouPage';

export default function SurgeThankYou() {
  return (
    <ThankYouPage
      title="Resources Unlocked! ⚡"
      message="Check your email for download links to all 10 free resources."
      nextSteps={[
        "Check your inbox for the download links",
        "Start with the 12-Month Action Plan",
        "Review the AI Prompts Library",
        "Explore the contact directories"
      ]}
      upsellTitle="Want Fresh Resources Every Month?"
      upsellDescription="Pro members get new hit lists, updated directories, and exclusive tools delivered monthly."
    />
  );
}
