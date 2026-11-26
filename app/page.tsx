import { HomePage } from "@/components/HomePage";
import { posts, projects } from "@/lib/content";

export default function Page() {
  return <HomePage featured={projects.slice(0, 4)} thoughts={posts.slice(0, 3)} />;
}
