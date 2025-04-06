export const formFields: Record<string, Record<string, string[]>> = {
  navbar: {
    Navbar1: ["title", "buttonText"],
    Navbar2: ["title", "buttonText", "avatarSrc", "navItems"],
    Navbar3: ["title", "buttonText"],
    Navbar4: ["title", "buttonText", "navItems"],
    Navbar5: ["title", "navItems"],
    Navbar6: ["title", "navItems"]
  },
  hero: {
    Hero1: [
      "title",
      "name",
      "subtitle",
      "description",
      "primaryButton.label",
      "primaryButton.link",
      "secondaryButton.label",
      "secondaryButton.link",
      "avatarSrc"
    ],
    Hero2: ["heading", "buttonText", "videoURL"],
    Hero3: ["mainText", "ctaText"],
  },
  footer: {
    Footer1: ["contactEmail", "socialLinks"],
    Footer2: ["address", "newsletterSignup"],
    Footer3: ["copyrightText", "privacyPolicyLink"],
  },
};
