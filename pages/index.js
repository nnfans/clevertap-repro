import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useTracker from '../hooks/useTracker';

const articles = [1, 2, 3, 4, 5];

export default function Home() {
  const router = useRouter();
  const tracker = useTracker();

  const toArticle = (item) => {
    tracker.event(`prime_view_primepage`, { articleId: item });
    router.push(`/articles/${item}`);
  }

  useEffect(() => {
    if (router.isReady && tracker.isReady) {
      tracker.event('prime_view_primepage', { home: 'home' });
    }
  }, [router, tracker]);

  return (
    <div>
      <ul>
        {articles.map((item) => (
          <li
            key={item}
            onClick={() => toArticle(item)}
            style={{ cursor: 'pointer', margin: '10px 0' }}
            >
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
