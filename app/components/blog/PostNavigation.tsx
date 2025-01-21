import Link from 'next/link';

interface Post {
  slug: string;
  title: string;
  sidebar: string;
}

interface PostNavigationProps {
  currentSlug: string;
  posts: Post[];
}

const PostNavigation: React.FC<PostNavigationProps> = ({ currentSlug, posts }) => {
  const currentIndex = posts.findIndex(post => post.slug === currentSlug);
  const prevPost = posts[currentIndex - 1];
  const nextPost = posts[currentIndex + 1];

  return (
    <div className="flex justify-between mt-8">
      {prevPost ? (
        <Link href={`/blog/${prevPost.slug}`}>
          <p className="text-neutral-400 hover:text-white transition-colors">
            ← {prevPost.sidebar}
          </p>
        </Link>
      ) : (
        <span />
      )}
      {nextPost ? (
        <Link href={`/blog/${nextPost.slug}`}>
          <p className="text-neutral-400 hover:text-white transition-colors">
            {nextPost.sidebar} →
          </p>
        </Link>
      ) : (
        <span />
      )}
    </div>
  );
};

export default PostNavigation;