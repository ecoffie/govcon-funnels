import { featuredEpisodes } from '@/data/featuredEpisodes';
import SectionHeader from '@/components/SectionHeader';
import GuestCard from '@/components/podcast/GuestCard';

/**
 * Featured Episodes section (FEATURED_EPISODES_BRIEF.md): curated
 * conversations with government insiders — 3-col grid of guest cards with
 * real headshots from /public/faces (NOT RSS artwork).
 */
export default function FeaturedGuests() {
  return (
    <section className="py-16 md:py-24">
      <div className="container-gg">
        <SectionHeader
          kicker="CONVERSATIONS WITH GOVERNMENT INSIDERS"
          title={
            <>
              Featured <em>Episodes</em>
            </>
          }
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredEpisodes.map((episode, i) => (
            <GuestCard key={episode.link} episode={episode} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
