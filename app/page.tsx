import { HomePage } from "@/components/HomePage";
import { projects } from "@/lib/content";

export default function Page() {
  return <HomePage featured={projects.slice(0, 4)} />;
}
