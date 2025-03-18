export const formFields: Record<string, Record<string, string[]>> = {
    navbar: {
        Navbar1: ["title", "buttonText",],
        Navbar2: ["title", "buttonText", "avatarSrc", "navItems"],
        Navbar3: ["title", "ctaButton"],
    },
    hero: {
      Hero1: ["title", "subtitle", "backgroundImage"],
      Hero2: ["heading", "buttonText", "videoURL"],
      Hero3: ["mainText", "ctaText"],
    },
    footer: {
      Footer1: ["contactEmail", "socialLinks"],
      Footer2: ["address", "newsletterSignup"],
      Footer3: ["copyrightText", "privacyPolicyLink"],
    },
  };
  