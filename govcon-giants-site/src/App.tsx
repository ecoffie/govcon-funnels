import { Routes, Route } from 'react-router';
import Layout from '@/components/Layout';
import Home from '@/pages/Home';
import Podcast from '@/pages/Podcast';
import EpisodePage from '@/pages/EpisodePage';
import Blog from '@/pages/Blog';
import BlogPost from '@/pages/BlogPost';
import About from '@/pages/About';
import Resources from '@/pages/Resources';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="podcast" element={<Podcast />} />
        <Route path="podcast/:index" element={<EpisodePage />} />
        <Route path="blog" element={<Blog />} />
        <Route path="blog/:slug" element={<BlogPost />} />
        <Route path="about" element={<About />} />
        <Route path="resources" element={<Resources />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
}
