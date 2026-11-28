/**
 * Editable site copy. Long-form project and article bodies live in
 * `data/content.json` (extracted from the reference) and are shaped by `lib/content.ts`.
 * Swap names, links, and blurbs here first.
 */

export const site = {
  name: "Faizan",
  title: "Faizan",
  description:
    "Faizan is a Software Engineer at Saak Remit, building scalable software and AI-powered tools.",
  email: "mfaizanahmad009@gmail.com",
  emailHref: "mailto:mfaizanahmad009@gmail.com",
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
    portrait: "/media/haSjyjpt7FyCjJUBvXtmzCMSEQg.png",
    star: "/media/OLDYsHB9RMavvQrkVRNy08ZXYE.png",
    bolt: "/media/lIIjRX5gxRdY7UWw5wqIXicPOA.png",
  },
  bio: {
    greeting: ["Hi, I’m", "Faizan."],
    role: "AI Engineer & Full-Stack Developer.",
    currentLabel: "Currently at",
    company: "Saak Remit",
    position: "Software Engineer",
    location: "Remote, UK",
    // **double asterisks** mark the bold phrases.
    tagline:
      "I build **scalable software** and **AI-powered tools** that turn complex workflows into simple, reliable products.",
    cta: "Explore projects",
    ctaHref: "/#projects",
  },
  services: {
    heading: "Services",
    items: [
      {
        title: "Website Development",
        description: "Fast, polished websites and web apps built in Next.js, from freelance builds to Speed Speak.",
        tags: ["Next.js", "Web Apps", "Performance"],
      },
      {
        title: "Enterprise Software Development",
        description: "Internal tools and fintech platforms, like the digital wallet and remittance app at Saak Remit.",
        tags: ["Internal Tools", "Fintech", "Remittance"],
      },
      {
        title: "E-commerce Solutions",
        description: "Storefronts with secure payments and a checkout that makes buying effortless.",
        tags: ["Storefronts", "Payments", "Checkout"],
      },
      {
        title: "AI-Native Software",
        description: "Multi-agent workflows, custom Claude skills and MCP integrations that do real work.",
        tags: ["Multi-Agent", "Claude Skills", "MCP"],
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
    role: ["AI Engineer &", "Full-Stack Developer."],
    explore: "Explore",
    getInTouch: "Get in touch",
    copyrightName: "Muhammad Faizan Ahmad",
    farewell: "See you around.",
    backToTop: "Back to top",
    caption: "Finally, some traffic on my website.",
    crowdDescription:
      "45 illustrated pedestrians in black-and-white ink, students, workers and older people in casual clothes and shalwar kameez, walk past in two rows. Faizan stands still among them in a black shirt, loose black trousers and emerald sneakers. People pass in front of him.",
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
