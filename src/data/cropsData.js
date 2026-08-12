// Supported crops with metadata, icons, and vulnerability triggers

export const CROPS = [
  {
    id: 'tomato',
    name: 'Tomato',
    scientificName: 'Solanum lycopersicum',
    category: 'Vegetable',
    icon: '🍅',
    color: '#EF4444',
    bgGradient: 'from-red-500/10 to-rose-500/20',
    borderColor: 'border-red-500/30',
    description: 'Highly sensitive to moisture, fungal blights, and leaf curl viruses.',
    commonProblems: ['Early Blight', 'Late Blight', 'Tomato Yellow Leaf Curl', 'Bacterial Spot', 'Calcium Deficiency (Blossom End Rot)']
  },
  {
    id: 'rice',
    name: 'Rice',
    scientificName: 'Oryza sativa',
    category: 'Cereal Grain',
    icon: '🌾',
    color: '#EAB308',
    bgGradient: 'from-amber-500/10 to-yellow-500/20',
    borderColor: 'border-amber-500/30',
    description: 'Requires careful water management. Vulnerable to blast fungi and stem borers.',
    commonProblems: ['Rice Leaf Blast', 'Bacterial Leaf Blight', 'Brown Planthopper', 'Sheath Blight', 'Zinc Deficiency']
  },
  {
    id: 'wheat',
    name: 'Wheat',
    scientificName: 'Triticum aestivum',
    category: 'Cereal Grain',
    icon: '🌽',
    color: '#D97706',
    bgGradient: 'from-yellow-600/10 to-amber-600/20',
    borderColor: 'border-yellow-600/30',
    description: 'Cool season cereal. Vulnerable to rust fungi, powdery mildew, and aphids.',
    commonProblems: ['Yellow Stripe Rust', 'Powdery Mildew', 'Wheat Aphids', 'Loose Smut', 'Nitrogen Deficiency']
  },
  {
    id: 'cotton',
    name: 'Cotton',
    scientificName: 'Gossypium hirsutum',
    category: 'Cash Crop',
    icon: '☁️',
    color: '#0EA5E9',
    bgGradient: 'from-sky-500/10 to-blue-500/20',
    borderColor: 'border-sky-500/30',
    description: 'Fiber crop susceptible to pink bollworm, whiteflies, and wilt diseases.',
    commonProblems: ['Pink Bollworm', 'Cotton Leaf Curl Virus', 'Fusarium Wilt', 'Whitefly Attack', 'Potassium Deficiency']
  },
  {
    id: 'maize',
    name: 'Maize',
    scientificName: 'Zea mays',
    category: 'Cereal Grain',
    icon: '🌽',
    color: '#84CC16',
    bgGradient: 'from-lime-500/10 to-emerald-500/20',
    borderColor: 'border-lime-500/30',
    description: 'Staple grain vulnerable to fall armyworm, leaf blight, and stem borers.',
    commonProblems: ['Fall Armyworm', 'Turcicum Leaf Blight', 'Common Rust', 'Maize Stem Borer', 'Nitrogen Deficiency']
  },
  {
    id: 'chilli',
    name: 'Chilli',
    scientificName: 'Capsicum annuum',
    category: 'Spice / Vegetable',
    icon: '🌶️',
    color: '#DC2626',
    bgGradient: 'from-red-600/10 to-orange-500/20',
    borderColor: 'border-red-600/30',
    description: 'High value crop prone to leaf curl virus, thrips, and anthracnose fruit rot.',
    commonProblems: ['Chilli Leaf Curl Virus', 'Thrips & Mites Damage', 'Anthracnose Fruit Rot', 'Powdery Mildew', 'Magnesium Deficiency']
  },
  {
    id: 'potato',
    name: 'Potato',
    scientificName: 'Solanum tuberosum',
    category: 'Tuber',
    icon: '🥔',
    color: '#A16207',
    bgGradient: 'from-amber-700/10 to-yellow-700/20',
    borderColor: 'border-amber-700/30',
    description: 'Tuber crop affected heavily by late blight epidemics and aphid-borne viruses.',
    commonProblems: ['Late Blight', 'Early Blight', 'Black Scurf', 'Potato Aphids', 'Potassium Deficiency']
  },
  {
    id: 'groundnut',
    name: 'Groundnut',
    scientificName: 'Arachis hypogaea',
    category: 'Oilseed / Legume',
    icon: '🥜',
    color: '#D97706',
    bgGradient: 'from-amber-600/10 to-orange-600/20',
    borderColor: 'border-amber-600/30',
    description: 'Leguminous oilseed prone to tikka leaf spot, collar rot, and aphid infestations.',
    commonProblems: ['Tikka Leaf Spot', 'Collar Rot', 'Peanut Bud Necrosis', 'Aphid Infestation', 'Iron Chlorosis']
  }
];

export const getCropById = (id) => CROPS.find(c => c.id === id) || CROPS[0];
