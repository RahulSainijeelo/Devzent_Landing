// Services data for the Tiles and Labour Contractor site

export type Service = {
  id: string;
  title: string;
  description: string;
  imageUrl: string; // Using public stock photos from Pexels
};

export const services: Service[] = [
  {
    id: "tiles-work",
    title: "Tiles Installation",
    description: "Professional installation of ceramic, porcelain, and vitrified tiles for floors and walls with precision and expertise.",
    imageUrl: "https://images.pexels.com/photos/5712145/pexels-photo-5712145.jpeg?auto=compress&cs=tinysrgb&w=1280"
  },
  {
    id: "marble-work",
    title: "Marble Flooring",
    description: "Elegant marble installation for floors, countertops, and decorative elements to enhance the aesthetic appeal of your space.",
    imageUrl: "https://images.pexels.com/photos/1571472/pexels-photo-1571472.jpeg?auto=compress&cs=tinysrgb&w=1280"
  },
  {
    id: "kota-stone",
    title: "Kota Stone Work",
    description: "Durable and economical Kota stone installation for floors and outdoor spaces with superior finishing and polishing.",
    imageUrl: "https://images.pexels.com/photos/631411/pexels-photo-631411.jpeg?auto=compress&cs=tinysrgb&w=1280"
  },
  {
    id: "ladi-work",
    title: "Ladi Work",
    description: "Custom ladi installations for patios, walkways, and decorative areas with attention to design and durability.",
    imageUrl: "https://images.pexels.com/photos/5708081/pexels-photo-5708081.jpeg?auto=compress&cs=tinysrgb&w=1280"
  },
  {
    id: "bathroom-tiling",
    title: "Bathroom Tiling",
    description: "Waterproof and aesthetic tiling solutions for bathrooms, including shower areas, floors, and feature walls.",
    imageUrl: "https://images.pexels.com/photos/6585757/pexels-photo-6585757.jpeg?auto=compress&cs=tinysrgb&w=1280"
  },
  {
    id: "stone-cladding",
    title: "Stone Cladding",
    description: "Decorative stone cladding for interior and exterior walls to add texture and visual interest to your property.",
    imageUrl: "https://images.pexels.com/photos/276528/pexels-photo-276528.jpeg?auto=compress&cs=tinysrgb&w=1280"
  }
];

// Portfolio items data
export type PortfolioItem = {
  id: string;
  title: string;
  category: string;
  images:[string];
  description: string;
};

export const portfolioItems: PortfolioItem[] = [
  {
    id: "portfolio-1",
    title: "Luxury Marble Flooring",
    category: "Marble",
    images:[ "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1280"],
    description: "Complete marble flooring installation for a 3BHK apartment in Nerul."
  },
  {
    id: "portfolio-2",
    title: "Modern Bathroom Renovation",
    category: "Tiles",
    images:[ "https://images.pexels.com/photos/6585754/pexels-photo-6585754.jpeg?auto=compress&cs=tinysrgb&w=1280"],
    description: "Full bathroom renovation with premium tiles and fittings."
  },
  {
    id: "portfolio-3",
    title: "Outdoor Patio Design",
    category: "Kota Stone",
    images:[ "https://images.pexels.com/photos/1643389/pexels-photo-1643389.jpeg?auto=compress&cs=tinysrgb&w=1280"],
    description: "Kota stone installation for a residential backyard patio."
  },
  {
    id: "portfolio-4",
    title: "Kitchen Backsplash",
    category: "Tiles",
    images: ["https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1280"],
    description: "Designer kitchen backsplash with premium ceramic tiles."
  },
  {
    id: "portfolio-5",
    title: "Office Flooring Project",
    category: "Vitrified Tiles",
    images:[ "https://images.pexels.com/photos/1643389/pexels-photo-1643389.jpeg?auto=compress&cs=tinysrgb&w=1280"],
    description: "Complete office space flooring with durable vitrified tiles."
  },
  {
    id: "portfolio-6",
    title: "Residential Pathway",
    category: "Ladi",
        images: ["https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1280"],
    description: "Decorative pathway using custom ladi work for a garden area."
  }
];

// Reviews data
export type Review = {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
};

export const reviews: Review[] = [
  {
    id: "review-1",
    name: "Rajesh Sharma",
    rating: 5,
    comment: "Excellent craftsmanship! Kailash did a fantastic job with our kitchen tiles. Very professional and completed the work on time.",
    date: "2023-08-15"
  },
  {
    id: "review-2",
    name: "Priya Mehta",
    rating: 5,
    comment: "We hired Kailash for our bathroom renovation and are extremely happy with the results. Great attention to detail and very reasonable pricing.",
    date: "2023-09-22"
  },
  {
    id: "review-3",
    name: "Sunil Patel",
    rating: 4,
    comment: "Good quality work for our marble flooring. The team was punctual and finished the job as promised. Would recommend.",
    date: "2023-10-05"
  },
  {
    id: "review-4",
    name: "Anjali Desai",
    rating: 5,
    comment: "Kailash and his team did an amazing job with the stone cladding for our living room wall. Very skilled and professional.",
    date: "2023-11-19"
  },
  {
    id: "review-5",
    name: "Vikram Singh",
    rating: 4,
    comment: "Hired for ladi work in our garden path. Good quality work and reasonable rates. They cleaned up well after completing the job.",
    date: "2024-01-08"
  }
];