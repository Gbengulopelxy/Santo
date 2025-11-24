// lib/socialConfig.ts
// Centralized social media configuration

import { Linkedin, Twitter, Instagram, Facebook, Youtube } from "lucide-react"

export interface SocialLink {
  name: string
  url: string
  icon: typeof Linkedin
  color: string
  hoverColor: string
  username: string
  label: string
}

export const socialLinks: SocialLink[] = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/santoshkmis/",
    icon: Linkedin,
    color: "#6B7280",
    hoverColor: "#0A66C2",
    username: "santoshkmis",
    label: "Connect on LinkedIn",
  },
  {
    name: "Twitter",
    url: "https://twitter.com/santoshmgeecon",
    icon: Twitter,
    color: "#6B7280",
    hoverColor: "#1DA1F2",
    username: "@santoshmgeecon",
    label: "Follow on Twitter",
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/santoshkumar.uk/",
    icon: Instagram,
    color: "#6B7280",
    hoverColor: "#E1306C",
    username: "santoshkumar.uk",
    label: "Follow on Instagram",
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com/santkmis",
    icon: Facebook,
    color: "#6B7280",
    hoverColor: "#1877F2",
    username: "santkmis",
    label: "Follow on Facebook",
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/@Santosh.Kumar801",
    icon: Youtube,
    color: "#6B7280",
    hoverColor: "#FF0000",
    username: "@Santosh.Kumar801",
    label: "Subscribe on YouTube",
  },
]


