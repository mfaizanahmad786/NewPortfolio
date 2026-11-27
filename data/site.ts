/**
 * Editable site copy. Long-form project and article bodies live in
 * `data/content.json` (extracted from the reference) and are shaped by `lib/content.ts`.
 * Swap names, links, and blurbs here first.
 */

export const site = {
  name: "Majd",
  title: "Majd",
  description:
    "Majd is a software engineer and Framer creator building modern, scalable, conversion-driven web experiences.",
  email: "Mejed@Templyo.io",
  emailHref: "mailto:mejed@templyo.io",
  getStartedHref: "https://framer.link/nnhGcWR",
  useForFreeHref: "https://framer.link/bsFvFjY",
  moreTemplatesHref: "https://framer.link/5Wi1vkP",
  framerHref: "https://www.framer.com",
  socials: [
    { label: "X", href: "https://x.com/" },
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
    { label: "YouTube", href: "https://www.youtube.com/" },
  ],
  nav: [
    { label: "Home", href: "/#hero-section" },
    { label: "About Me", href: "/#bio-section" },
    { label: "Services", href: "/#services" },
    { label: "Works", href: "/work" },
    { label: "Contact", href: "/#contact" },
  ],
  hero: {
    title: ["SOFTWARE", "ENGINEER"],
    year: "©2026",
    since: "/CREATING SINCE 2020",
    portrait: "/media/haSjyjpt7FyCjJUBvXtmzCMSEQg.png",
    star: "/media/OLDYsHB9RMavvQrkVRNy08ZXYE.png",
    bolt: "/media/lIIjRX5gxRdY7UWw5wqIXicPOA.png",
  },
  bio: {
    heading: "Hey!",
    lead: "I’m Majd, a builder based in Syria, currently working on Templyo, a platform for high-quality Framer templates.",
    paragraphs: [
      "I’m a software engineer and Framer creator with a strong focus on building modern, scalable, and conversion-driven web experiences.",
      "Over the years, I’ve created and shipped multiple SaaS products and Framer templates used by global customers, helping them launch faster.",
    ],
    cta: "Get Started",
  },
  quote:
    "From idea to launch. Clean, scalable digital products built to move fast, stay simple, and perform in real-world use, driven by clarity, structured systems, and intentional design.",
  services: {
    heading: "Services",
    items: [
      {
        title: "Website Migration",
        tags: ["Web Migration", "Optimization", "Framer Rebuild"],
      },
      { title: "Framer Templates", tags: ["Startup", "Agency", "SaaS"] },
      {
        title: "Frontend Development",
        tags: ["UI Dev", "Responsive Layouts", "Web Performance"],
      },
      {
        title: "Product Consulting",
        tags: ["Product Direction", "Web Strategy", "Technical Guidance"],
      },
    ],
  },
  projectsSection: {
    heading: "Featured Projects",
    cta: "View All Work",
    href: "/work",
  },
  testimonials: {
    heading: "Testimonials",
    items: [
      {
        quote:
          "Templyo completely changed how I approach building sites in Framer. The templates are not just beautiful, they’re actually structured in a way that makes scaling so much easier.",
        name: "Yakoub Kashmiri",
        role: "Marketing Director",
        avatar: "/media/kAftuUN9iRKwIt9M6RqZo9NS314.jpg",
        logo: "/media/MG7SSqT3AUbDDMeyGynYFWvAWI.png",
      },
      {
        quote:
          "I’ve tried dozens of Framer templates, but Templyo stands out. Everything feels intentional, from the layout to the smallest interactions.",
        name: "Daniel K.",
        role: "Indie Maker",
        avatar: "/media/HqoHkPp6dpJFdgMqUKIaAXmy7o.jpg",
        logo: "/media/yceQCLz3chOtgu2oZRjmfEKjY.png",
      },
      {
        quote:
          "Templyo saved me weeks of work. I was able to launch my landing page in a day, and it still looks fully custom.",
        name: "Mark M.",
        role: "Startup Founder",
        avatar: "/media/Y9KmJAQ4w53hsc4jJojfokLZ7D8.jpg",
        logo: "/media/gN85dqTeMmVvE57UMiHhgeL4P4.png",
      },
      {
        quote:
          "The quality is insane. Clean structure, smooth animations, and super easy to customize. It feels like a premium product from start to finish.",
        name: "Omar H.",
        role: "Frontend Developer",
        avatar: "/media/HH8KrojyxZx6X20z1r13CSwiiWE.jpg",
        logo: "/media/WsYTUG4cqmLIU4lwbMUQX7FdOY.png",
      },
    ],
  },
  contact: {
    heading: "Let’s talk.",
    body: "Have a project or need help? Fill out the form, and we'll get back to you soon.",
    fields: {
      name: "Name",
      namePlaceholder: "Enter your name",
      email: "Email",
      emailPlaceholder: "Enter your email",
      project: "Your Project",
      projectPlaceholder: "Tell us about your project",
      submit: "Submit",
    },
  },
  footer: {
    role: ["Software Engineer &", "Framer Creator."],
    explore: "Explore",
    getInTouch: "Get in touch",
    copyrightName: "Majd",
    farewell: "See you around.",
    backToTop: "Back to top",
    caption: "Finally, some traffic on my website.",
    crowdDescription:
      "45 illustrated pedestrians in black-and-white ink, students, workers and older people in casual clothes and shalwar kameez, walk past in two rows. Majd stands still among them in a black shirt, loose black trousers and yellow sneakers. People pass in front of him.",
  },
  workPage: {
    title: "My Brightest Creations",
    description:
      "A showcase of my latest projects, highlighting thoughtful design, clear strategy, and impactful results.",
  },
  moreProjects: "More Projects",
};

export const projectOrder = [
  "damas",
  "najm",
  "kavi",
  "sham",
  "aiwings",
  "abjad",
  "fasselh",
] as const;

export const liveLinks: Record<string, string> = {
  damas: "https://framer.link/KhRj2A5?duplicateType=siteTemplate",
  najm: "https://framer.link/iij2V3q?duplicateType=siteTemplate",
  kavi: "https://kavi-template.framer.website/",
  sham: "https://framer.link/Kf2Jejr?duplicateType=siteTemplate",
  aiwings: "https://aiwings.io/",
  abjad: "https://framer.link/7SZ272J?duplicateType=siteTemplate",
  fasselh: "https://framer.link/QI5toer?duplicateType=siteTemplate",
};
