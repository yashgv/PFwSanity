import { groq } from "next-sanity";

export const homeQuery = groq`*[_type == "home"][0]`;

export const workQuery = groq`*[_type == "project"] {
  ...,
  "technologies": technologies[]
}`;

export const experienceQuery = groq`*[_type == "experience"] | order(orderAsc asc, startDateDesc desc)`;

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]`;

export const aboutQuery = groq`*[_type == "about"][0]`;

export const servicesQuery = groq`*[_type == "service"]`;

export const achievementsQuery = groq`*[_type == "achievement"] | order(dateDesc desc)`;

export const contactQuery = groq`*[_type == "contact"][0]`;
