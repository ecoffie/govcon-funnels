// Mindy IS the homepage now - redirect any /mindy links to /
import { redirect } from 'next/navigation';

export default function MindyRedirectPage() {
  redirect('/');
}
