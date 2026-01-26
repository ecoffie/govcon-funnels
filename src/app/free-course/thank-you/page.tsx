import ThankYouPage from '@/components/ThankYouPage';

export default function FreeCourseThankYou() {
  return (
    <ThankYouPage
      title="You're In! 🎉"
      message="Check your email for Day 1 of your free 12-day government contracting course."
      nextSteps={[
        "Check your inbox (and spam folder) for the welcome email",
        "Complete Day 1 lesson today",
        "Join our free community for support",
        "Share your progress with #GovConGiants"
      ]}
    />
  );
}
