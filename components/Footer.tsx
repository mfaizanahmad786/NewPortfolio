import Link from "next/link";
import { site } from "@/data/site";
import { BlurWords } from "./BlurWords";

export function Footer() {
  return (
    <footer className="bg-ink text-cream">
      <div className="mx-auto grid w-full max-w-page items-start gap-12 px-5 pb-6 pt-24 min-[810px]:px-12 min-[1280px]:grid-cols-[1.15fr_0.85fr] min-[1280px]:px-0 min-[1280px]:pt-28">
        <BlurWords
          as="h2"
          text={site.footer.heading}
          blur={6}
          duration={1.4}
          className="max-w-[520px] text-[46px] font-semibold leading-[1] tracking-[-0.02em] min-[810px]:text-[58px] min-[1280px]:text-[72px]"
        />
        <div className="grid gap-10 sm:grid-cols-2">
          <div>
            <p className="text-[16px] tracking-[-0.03em] text-cream/55">{site.footer.quickLinks}</p>
            <div className="mt-4 flex max-w-[300px] flex-wrap gap-2">
              {site.nav.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="rounded-[8px] bg-cream px-3 py-1.5 text-[15px] tracking-[-0.03em] text-ink transition-colors hover:bg-white"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[16px] tracking-[-0.03em] text-cream/55">{site.footer.contact}</p>
            <a href={site.emailHref} className="mt-4 inline-block text-[16px] tracking-[-0.03em] text-cream/80 hover:text-cream">
              {site.email}
            </a>
          </div>
        </div>
      </div>
      <div className="overflow-hidden leading-none">
        <p className="select-none translate-y-[22%] text-center text-[34vw] font-extrabold tracking-[-0.07em] text-[#242424] min-[1280px]:text-[300px]">
          {site.footer.watermark}
        </p>
      </div>
    </footer>
  );
}
