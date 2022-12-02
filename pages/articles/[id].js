import { useRouter } from "next/router";

const Article = () => {
  const router = useRouter();
  const { id } = router.query;

  const goHome = () => {
    router.back();
  }

  return (
    <div>
      <li onClick={goHome} style={{ cursor: 'pointer' }}>Home</li>
      <h2>Article {id}</h2>
    </div>
  )
}

export default Article;