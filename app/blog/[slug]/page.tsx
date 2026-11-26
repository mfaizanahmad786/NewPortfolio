import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NewsletterForm } from "@/components/HomePage";
import { PostCard } from "@/components/PostCard";
import { RichText } from "@/components/RichText";
import { site } from "@/data/site";
import { getPost, posts } from "@/lib/content";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  return { title: post?.title ?? "Journal", description: post?.excerpt };
}

export default async function BlogArticle({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <main className="mx-auto w-full max-w-prose px-5 pb-28 pt-36 min-[810px]:px-10 min-[1280px]:pt-40">
      <h1 className="max-w-[860px] text-[42px] font-semibold leading-[0.98] tracking-[-0.03em] min-[810px]:text-[64px]">
        {post.title}
      </h1>
      <p className="mt-4 max-w-[640px] text-[16px] leading-[1.5] tracking-[-0.02em] text-ink/80">{post.excerpt}</p>
      <div className="mt-8 flex max-w-[740px] items-center justify-between text-[15px] tracking-[-0.02em] text-ink/70">
        <span>{post.date}</span>
        <span>{post.readTime}</span>
      </div>
      {post.image && (
        <img src={post.image} alt="" className="mt-6 aspect-[740/430] w-full max-w-[740px] rounded-card object-cover" />
      )}
      <div className="mt-12 grid items-start gap-12 min-[1100px]:grid-cols-[minmax(0,1fr)_280px]">
        <RichText blocks={post.blocks} />
        <aside className="min-[1100px]:sticky min-[1100px]:top-28">
          <NewsletterForm />
        </aside>
      </div>
      {post.related.length > 0 && (
        <section className="mt-20">
          <h2 className="text-[40px] font-semibold tracking-[-0.03em]">{site.moreArticles}</h2>
          <div className="mt-8 grid gap-4 min-[810px]:grid-cols-3">
            {post.related.slice(0, 3).map((item) => (
              <PostCard
                key={item.slug}
                href={`/blog/${item.slug}`}
                image={item.image}
                date={item.date}
                title={item.title}
                excerpt={item.excerpt}
              />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
