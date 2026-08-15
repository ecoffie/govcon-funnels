import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router';
import Layout from '@/components/Layout';
import Home from '@/pages/Home';
import Podcast from '@/pages/Podcast';
import EpisodePage from '@/pages/EpisodePage';
import FeaturedEpisodePage from '@/pages/FeaturedEpisodePage';
import Blog from '@/pages/Blog';
import BlogPost from '@/pages/BlogPost';
import About from '@/pages/About';
import Resources from '@/pages/Resources';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/** Fires a GA4 page_view on every client-side route change. */
function PageViewTracker() {
  const location = useLocation();
  useEffect(() => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', { page_path: location.pathname });
    }
  }, [location.pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <PageViewTracker />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="podcast" element={<Podcast />} />
          <Route path="podcast/featured/:index" element={<FeaturedEpisodePage />} />
          <Route path="podcast/:index" element={<EpisodePage />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:slug" element={<BlogPost />} />
          <Route path="about" element={<About />} />
          <Route path="resources" element={<Resources />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </>
  );
}
