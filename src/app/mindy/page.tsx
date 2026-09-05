// Keep legacy Mindy links on the dedicated product landing page now that
// the GovCon Giants brand site owns the homepage.
import { redirect } from 'next/navigation';

export default function MindyRedirectPage() {
  redirect('/mi');
}
