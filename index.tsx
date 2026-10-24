import { createFileRoute } from "@tanstack/react-router";

// Hosts the plain HTML/CSS/JS calculator from public/calculator/.
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Frosted Glass Calculator" },
      { name: "description", content: "A glassmorphism calculator with live preview and keyboard support." },
      { property: "og:title", content: "Frosted Glass Calculator" },
      { property: "og:description", content: "A glassmorphism calculator with live preview and keyboard support." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <iframe
      src="/calculator/index.html"
      title="Calculator"
      className="fixed inset-0 h-full w-full border-0"
    />
  );
}
