import type { Metadata } from "next";
import { PageIntro } from "@/components/HomePage";
import { PostCard } from "@/components/PostCard";
import { site } from "@/data/site";
import { posts } from "@/lib/content";

export const metadata: Metadata = { title: site.blogPage.title };

export default function BlogPage() {
  const title = site.blogPage.title.replace("Thoughts", "\nThoughts");
  return (
    <main>
      <div className="mx-auto max-w-prose">
        <PageIntro title={title} description={site.blogPage.description} />
      </div>
      <section className="mx-auto grid w-full max-w-prose gap-4 px-5 pb-28 min-[810px]:grid-cols-2 min-[810px]:px-10 min-[1100px]:grid-cols-3">
        {posts.map((post) => (
          <PostCard
            key={post.slug}
            href={`/blog/${post.slug}`}
            image={post.image}
            date={post.date}
            title={post.title}
            excerpt={post.blurb}
          />
        ))}
      </section>
    </main>
  );
}
