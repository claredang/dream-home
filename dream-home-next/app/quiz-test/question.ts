import { shuffleArray } from "../_utilities/sharedFunction";

export const questionsData = [
  {
    id: 1,
    question: "What color palette do you envision for your living room?",
    options: [
      {
        text: "Soft blues, greens, and sandy neutrals",
        image: "coastal_1.jpg",
        type: "coastal",
      },
      {
        text: "Light neutrals with pops of pastels",
        image: "scandinavian_1.jpg",
        type: "scandinavian",
      },
      {
        text: "Warm whites, earthy tones, and rustic finishes",
        image: "farm-house_1.jpg",
        type: "farm-house",
      },
      {
        text: "Bold and vibrant colors with a mix of neutral",
        image: "midcentury-modern_1.jpg",
        type: "midcentury-modern",
      },
      {
        text: "Luxurious metallics, whites, and blacks",
        image: "glam_1.jpg",
        type: "glam",
      },
      {
        text: "Industrial grays, blacks, and metallic accents",
        image: "industrial_1.jpg",
        type: "industrial",
      },
    ],
  },
  {
    id: 2,
    question:
      "Are you interested in a specific theme or mood, such as a cozy retreat, a modern sanctuary, or a vintage-inspired haven?",
    options: [
      {
        text: "Coastal retreat",
        image: "coastal_2.jpg",
        type: "coastal",
      },
      {
        text: "Modern sanctuary",
        image: "scandinavian_2.jpg",
        type: "scandinavian",
      },
      {
        text: "Vintage-inspired haven",
        image: "farm-house_2.jpg",
        type: "farm-house",
      },
      {
        text: "A mix of styles for an eclectic feel",
        image: "midcentury-modern_2.jpg",
        type: "midcentury-modern",
      },
      {
        text: "Luxurious and glamorous ambiance",
        image: "glam_2.jpg",
        type: "glam",
      },
      {
        text: "Industrial and utilitarian",
        image: "industrial_2.jpg",
        type: "industrial",
      },
    ],
  },
  {
    id: 3,
    question: "Are you interested in a specific color scheme for your kitchen?",
    options: [
      {
        text: "Sea-inspired blues and whites",
        image: "coastal_3.jpg",
        type: "coastal",
      },
      {
        text: "Light and airy with whites and pastels",
        image: "scandinavian_3.jpg",
        type: "scandinavian",
      },
      {
        text: "Warm and cozy with wood tones and neutral colors",
        image: "farm-house_3.jpg",
        type: "farm-house",
      },
      {
        text: "Playful with bold pops of color",
        image: "midcentury-modern_3.jpg",
        type: "midcentury-modern",
      },
      {
        text: "Elegant blacks, whites, and metallics",
        image: "glam_3.jpg",
        type: "glam",
      },
      {
        text: "Industrial grays and raw materials",
        image: "industrial_3.jpg",
        type: "industrial",
      },
    ],
  },
  {
    id: 4,
    question: "What ambiance do you want to create in your home?",
    options: [
      {
        text: "Serene and beachy",
        image: "coastal_4.jpg",
        type: "coastal",
      },
      {
        text: "Clean and minimalist",
        image: "scandinavian_4.jpg",
        type: "scandinavian",
      },
      {
        text: "Cozy and rustic",
        image: "farm-house_4.jpg",
        type: "farm-house",
      },
      {
        text: "Chic and glamorous",
        image: "midcentury-modern_4.jpg",
        type: "midcentury-modern",
      },
      {
        text: "Modern and sophisticated",
        image: "glam_4.jpg",
        type: "glam",
      },
      {
        text: "Industrial and utilitarian",
        image: "industrial_4.jpg",
        type: "industrial",
      },
    ],
  },
  {
    id: 5,
    question:
      "What role does natural light play in your preferences for each room?",
    options: [
      {
        text: "Essential for a bright and airy feel",
        image: "coastal_5.jpg",
        type: "coastal",
      },
      {
        text: "Important for creating a fresh and natural look",
        image: "scandinavian_5.jpg",
        type: "scandinavian",
      },
      {
        text: "Welcoming, with a balance of natural and ambient light",
        image: "farm-house_5.jpg",
        type: "farm-house",
      },
      {
        text: "Embracing natural light, but also open to dramatic lighting",
        image: "midcentury-modern_5.jpg",
        type: "midcentury-modern",
      },
      {
        text: "Utilizing natural light for a luxurious and elegant atmosphere",
        image: "glam_5.jpg",
        type: "glam",
      },
      {
        text: "Incorporating natural light with an industrial edge",
        image: "industrial_5.jpg",
        type: "industrial",
      },
    ],
  },
  {
    id: 6,
    question:
      "How important is the inclusion of plants and greenery in your interior design?",
    options: [
      {
        text: "Essential for creating a natural and coastal atmosphere",
        image: "coastal_6.jpg",
        type: "coastal",
      },
      {
        text: "Important to bring a touch of nature indoors",
        image: "scandinavian_6.jpg",
        type: "scandinavian",
      },
      {
        text: "A must-have for a cozy house look",
        image: "farm-house_6.jpg",
        type: "farm-house",
      },
      {
        text: "Nice to have, but not a top priority",
        image: "midcentury-modern_6.jpg",
        type: "midcentury-modern",
      },
      {
        text: "Minimal, but perhaps some elegant floral arrangements",
        image: "glam_6.jpg",
        type: "glam",
      },
      {
        text: "Not a priority; prefer an eclectic aesthetic",
        image: "industrial_6.jpg",
        type: "industrial",
      },
    ],
  },
  {
    id: 7,
    question: "What are you most inspired by in your design",
    options: [
      {
        text: "Nature's serenity and the calming influence of the outdoors",
        image: "coastal_7.jpg",
        type: "coastal",
      },
      {
        text: "Simplicity, functionality, and the beauty of clean lines",
        image: "scandinavian_7.jpg",
        type: "scandinavian",
      },
      {
        text: "The rustic charm, warmth, and authenticity of natural materials",
        image: "farm-house_7.jpg",
        type: "farm-house",
      },
      {
        text: "Opulence, sophistication, and a touch of glamour",
        image: "midcentury-modern_7.jpg",
        type: "midcentury-modern",
      },
      {
        text: "Timeless design principles with iconic shapes and classic elements",
        image: "glam_7.jpg",
        type: "glam",
      },
      {
        text: "The utilitarian beauty of raw materials and industrial aesthetics",
        image: "industrial_7.jpg",
        type: "industrial",
      },
    ],
  },
];

questionsData.forEach((question) => {
  question.options = shuffleArray(question.options);
});

export const styleDescriptions = {
  farm_house:
    "The utilitarian beauty of raw materials and industrial aesthetics",
  glam: "You love the glitz and glamour. Your space is filled with luxurious fabrics, metallic accents, and bold statements.",
  industrial:
    "Raw and edgy defines your style. Exposed bricks, metal finishes, and a utilitarian vibe dominate your space.",
  midcentury_modern:
    "You're all about the retro charm. Clean lines, organic shapes, and a mix of materials give your space a timeless appeal.",
  coastal:
    "Peace, love, and patterns. Your love of vibrant colors, layered textures, and ornate embellishments create a whimsical lair with let-down-your-hair flair.",
  scandinavian:
    "Simplicity is your secret to a classic life. You love clean lines, plush fabrics, and handcrafted things. You get really excited about functional storage solutions and cozy pants on Sundays.",
};

export const text = {
  quiz: {
    do_quiz_test: "Do Quiz Test!",
    upload_image: "Upload Image",
    main_style: "Your Main Style",
    sub_style: "Your SubStyles",
    explore_more: "Explore More",
    do_quiz_again: "Do Quiz Again",
    explore_your_style: "Explore More Style",
  },
  quiz_upload: {
    upload_title: "Unleash Your Imagination",
    upload_subtitle:
      "Embark on an extraordinary journey with our advanced service. Upload image of your dream home and we help you analyze your style",
  },
  explore: {
    explore_title:
      "Let your imagination run wild as we guide you towards the most awe-inspiring homestay",
  },
};
