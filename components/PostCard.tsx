import Link from "next/link";

export function PostCard({
  href,
  image,
  date,
  title,
  excerpt,
}: {
  href: string;
  image: string;
  date: string;
  title: string;
  excerpt: string;
}) {
  return (
    <Link href={href} className="group relative block h-[420px] overflow-hidden rounded-card min-[810px]:h-[460px]">
      <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-5 text-cream">
        <p className="text-[16px] tracking-[-0.04em] text-cream/90">{date}</p>
        <h3 className="mt-1 text-[28px] font-medium leading-[1.15] tracking-[-0.02em] min-[1280px]:text-[32px]">{title}</h3>
        <p className="mt-2 text-[16px] leading-[1.4] tracking-[-0.04em] text-cream/85">{excerpt}</p>
      </div>
    </Link>
  );
}
