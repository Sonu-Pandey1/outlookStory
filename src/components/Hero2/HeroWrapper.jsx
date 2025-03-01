"use client";

import { usePathname } from "next/navigation";
import Hero from "./Hero";

// Demo data for different pages
const pageData = {
  stories: [
    {
      image:
        "https://jnews.io/magazine/wp-content/uploads/sites/34/2017/12/jnews-demo-3-750x536.jpg",
      title: "The Untold Stories of the Modern World",
      category: "Story",
    },
    {
      image:
        "https://jnews.io/magazine/wp-content/uploads/sites/34/2017/12/jnews-demo-20-350x250.jpg",
      title: "Discover Hidden Gems Around You",
      category: "Story",
    },
    {
      image:
        "https://jnews.io/magazine/wp-content/uploads/sites/34/2017/12/jnews-demo-4-350x250.jpg",
      title: "How Stories Shape Our Lives",
      category: "Story",
    },
    {
      image:
        "https://jnews.io/magazine/wp-content/uploads/sites/34/2017/12/jnews-demo-20-350x250.jpg",
      title: "Storytelling: The Art of Engagement",
      category: "Story",
    },
  ],
  business: [
    {
      category: "Business",
      title: "Global Markets Hit by New Economic Challenges in 2023",
      image:
        "https://jnews.io/magazine/wp-content/uploads/sites/34/2017/11/jnews-demo-23-120x86.jpg",
    },
    {
      category: "Business",
      title: "Top CEOs Announce Bold Plans for 2025",
      image:
        "https://jnews.io/magazine/wp-content/uploads/sites/34/2017/12/jnews-demo-3-750x536.jpg",
    },
    {
      category: "Business",
      title: "Cryptocurrency Adoption Grows Despite Market Volatility",
      image:
        "https://jnews.io/magazine/wp-content/uploads/sites/34/2017/12/jnews-demo-1-750x536.jpg",
    },
    {
      image:
        "https://jnews.io/magazine/wp-content/uploads/sites/34/2017/12/jnews-demo-3-750x536.jpg",
      title: "Top 10 Trending Videos of 2023",
      category: "Business",
    },
  ],
  cityConnect: [
    {
      image:
        "https://jnews.io/magazine/wp-content/uploads/sites/34/2017/12/jnews-demo-1-750x536.jpg",
      title: "Top 10 Trending Videos of 2023",
      category: "cityConnect",
    },
    {
      image:
        "https://jnews.io/magazine/wp-content/uploads/sites/34/2017/12/jnews-demo-3-750x536.jpg",
      title: "Must-Watch Documentaries",
      category: "cityConnect",
    },
    {
      image:
        "https://jnews.io/magazine/wp-content/uploads/sites/34/2017/12/jnews-demo-1-750x536.jpg",
      title: "Viral Clips: What's Hot This Week",
      category: "cityConnect",
    },
    {
      image:
        "https://jnews.io/magazine/wp-content/uploads/sites/34/2017/12/jnews-demo-1-750x536.jpg",
      title: "Behind the Scenes of Viral Videos",
      category: "cityConnect",
    },
  ],
  launchPad: [
    {
      image:
        "https://jnews.io/magazine/wp-content/uploads/sites/34/2017/12/jnews-demo-24-750x536.jpg",
      title: "Top 10 Trending Videos of 2023",
      category: "launchPad",
    },
    {
      image:
        "https://jnews.io/magazine/wp-content/uploads/sites/34/2017/12/jnews-demo-3-750x536.jpg",
      title: "Must-Watch Documentaries",
      category: "launchPad",
    },
    {
      image:
        "https://jnews.io/magazine/wp-content/uploads/sites/34/2017/12/jnews-demo-3-750x536.jpg",
      title: "Viral Clips: What's Hot This Week",
      category: "launchPad",
    },
    {
      image:
        "https://jnews.io/magazine/wp-content/uploads/sites/34/2017/12/jnews-demo-1-750x536.jpg",
      title: "Behind the Scenes of Viral Videos",
      category: "launchPad",
    },
  ],
  videos: [
    {
      image:
        "https://jnews.io/magazine/wp-content/uploads/sites/34/2017/12/jnews-demo-3-750x536.jpg",
      title: "Top 10 Trending Videos of 2023",
      category: "Videos",
    },
    {
      image: "https://via.placeholder.com/300x200?text=Videos+1",
      title: "Must-Watch Documentaries",
      category: "Videos",
    },
    {
      image: "https://via.placeholder.com/300x200?text=Videos+2",
      title: "Viral Clips: What's Hot This Week",
      category: "Videos",
    },
    {
      image: "https://via.placeholder.com/600x250?text=Videos+Footer",
      title: "Behind the Scenes of Viral Videos",
      category: "Videos",
    },
  ],
  events: [
    {
      image:
        "https://jnews.io/magazine/wp-content/uploads/sites/34/2017/12/jnews-demo-3-750x536.jpg",
      title: "Upcoming Events You Can't Miss",
      category: "Events",
    },
    {
      image: "https://via.placeholder.com/300x200?text=Events+1",
      title: "Concerts and Festivals Near You",
      category: "Events",
    },
    {
      image: "https://via.placeholder.com/300x200?text=Events+2",
      title: "Workshops to Elevate Your Skills",
      category: "Events",
    },
    {
      image: "https://via.placeholder.com/600x250?text=Events+Footer",
      title: "Highlights from Last Year's Best Events",
      category: "Events",
    },
  ],
  default: [
    {
      image:
        "https://jnews.io/magazine/wp-content/uploads/sites/34/2017/12/jnews-demo-3-750x536.jpg",
      title: "Explore the Unknown",
      category: "Default",
    },
    {
      image: "https://via.placeholder.com/300x200?text=Default+1",
      title: "Discover New Horizons",
      category: "Default",
    },
    {
      image: "https://via.placeholder.com/300x200?text=Default+2",
      title: "Where Creativity Meets Reality",
      category: "Default",
    },
    {
      image: "https://via.placeholder.com/600x250?text=Default+Footer",
      title: "A Glimpse into the Future",
      category: "Default",
    },
  ],
};

export default function HeroWrapper({ theme }) {
  const pathname = usePathname(); // Get the current path
  const pageType = pathname.split("/")[2]; // Extract page type from the URL (e.g., "/story" -> "story")
  // console.log(pageType)
  // Custom default data for homepage or 404
  const defaultData = Object.values(pageData).map((category) => category[0]); // Take 1 story from each category

  // Select data based on the dynamic pageType
  const heroData =
    pageType === "" || pageType === "404"
      ? defaultData
      : pageData[pageType] || defaultData;

  // console.log("Page Type:", pageType);
  // console.log("Hero Data:", heroData);

  return <Hero data={heroData} theme={theme} />;
}
