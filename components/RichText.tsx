import { isListItem, media, type RawBlock } from "@/lib/content";

type Node =
  | { kind: "h2" | "h3"; text: string }
  | { kind: "p"; text: string }
  | { kind: "quote"; text: string }
  | { kind: "ul"; items: string[] }
  | { kind: "images"; srcs: string[] };

function isQuote(text: string) {
  return /^[“"]/.test(text) || (text.includes("–") && text.length < 220 && /[“"]/.test(text));
}

export function blocksToNodes(blocks: RawBlock[]): Node[] {
  const nodes: Node[] = [];
  const items: string[] = [];

  const flushItems = () => {
    if (items.length >= 2) nodes.push({ kind: "ul", items: [...items] });
    else if (items.length === 1) nodes.push({ kind: "p", text: items[0] });
    items.length = 0;
  };

  const flushImagesInto = (srcs: string[]) => {
    if (!srcs.length) return;
    nodes.push({ kind: "images", srcs: [...srcs] });
    srcs.length = 0;
  };

  const imageBuf: string[] = [];

  for (const block of blocks) {
    if (block.type === "img" && block.src) {
      flushItems();
      imageBuf.push(media(block.src));
      if (imageBuf.length === 2) flushImagesInto(imageBuf);
      continue;
    }
    flushImagesInto(imageBuf);
    if ((block.type === "h2" || block.type === "h3") && block.text) {
      flushItems();
      nodes.push({ kind: block.type, text: block.text });
      continue;
    }
    if (block.type === "p" && block.text) {
      if (isQuote(block.text)) {
        flushItems();
        nodes.push({ kind: "quote", text: block.text });
      } else if (isListItem(block.text)) {
        items.push(block.text);
      } else {
        flushItems();
        nodes.push({ kind: "p", text: block.text });
      }
    }
  }
  flushItems();
  flushImagesInto(imageBuf);
  return nodes;
}

export function RichText({ blocks, wide = false }: { blocks: RawBlock[]; wide?: boolean }) {
  const nodes = blocksToNodes(blocks);
  return (
    <div className="space-y-7">
      {nodes.map((node, i) => {
        if (node.kind === "h2") {
          return (
            <h2 key={i} className="max-w-[720px] pt-6 text-[34px] font-semibold leading-[1.05] tracking-[-0.03em] min-[810px]:text-[42px]">
              {node.text}
            </h2>
          );
        }
        if (node.kind === "h3") {
          return (
            <h3 key={i} className="max-w-[720px] pt-2 text-[26px] font-medium leading-[1.2] tracking-[-0.02em]">
              {node.text}
            </h3>
          );
        }
        if (node.kind === "quote") {
          return (
            <blockquote key={i} className="max-w-[680px] text-[22px] font-medium leading-[1.35] tracking-[-0.03em]">
              {node.text}
            </blockquote>
          );
        }
        if (node.kind === "ul") {
          return (
            <ul key={i} className="max-w-[680px] list-disc space-y-1.5 pl-5 text-[16px] leading-[1.55] tracking-[-0.02em]">
              {node.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          );
        }
        if (node.kind === "images") {
          if (node.srcs.length === 1) {
            return (
              <img key={i} src={node.srcs[0]} alt="" className={`w-full rounded-card object-cover ${wide ? "" : ""}`} />
            );
          }
          return (
            <div key={i} className="grid gap-6 min-[810px]:grid-cols-2 min-[810px]:gap-10">
              {node.srcs.map((src) => (
                <img key={src} src={src} alt="" className="aspect-[4/3] w-full rounded-card object-cover" />
              ))}
            </div>
          );
        }
        return (
          <p key={i} className="max-w-[680px] text-[16px] leading-[1.55] tracking-[-0.02em] text-ink/90">
            {node.text}
          </p>
        );
      })}
    </div>
  );
}
