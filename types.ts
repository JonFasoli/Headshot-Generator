
export enum HeadshotStyle {
  CORPORATE = 'Corporate Executive',
  STARTUP = 'Startup Founder',
  CREATIVE = 'Creative Studio',
  OUTDOOR = 'Natural Outdoor',
  MINIMALIST = 'Modern Minimalist',
  PIXAR = 'Pixar Character',
  TED = 'TED Speaker',
  PODCAST = 'Podcast Host',
  FANTASY = 'Fantasy Hero',
  CUSTOM = 'Custom Style'
}

export enum ClothingOption {
  DEFAULT = 'Match Style',
  CHARCOAL_SUIT = 'Charcoal Suit',
  NAVY_SUIT = 'Navy Blue Suit',
  WHITE_SHIRT = 'Crisp White Shirt',
  TURTLENECK = 'Black Turtleneck',
  TSHIRT = 'Plain T-Shirt',
  HOODIE = 'Casual Hoodie',
  LEATHER_JACKET = 'Leather Jacket',
  EVENING_GOWN = 'Evening Gown',
  DOCTOR_COAT = 'Medical Coat',
  POLO_SHIRT = 'Polo Shirt',
  CHECKERED_SHIRT = 'Checkered Shirt',
  KNIT_SWEATER = 'Knit Sweater',
  TWEED_JACKET = 'Tweed Jacket',
  BLUE_SCRUBS = 'Blue Scrubs',
  CONSTRUCTION_VEST = 'Construction Vest',
  CHEF_COAT = 'Chef Coat',
  FLORAL_DRESS = 'Floral Dress',
  TUXEDO = 'Tuxedo',
  CYBERPUNK_JACKET = 'Cyberpunk Jacket',
  CUSTOM = 'Custom Outfit'
}

export enum HairStyleOption {
  DEFAULT = 'Original Hair',
  SHORT_NEAT = 'Short & Neat',
  BUZZ_CUT = 'Buzz Cut',
  BALD = 'Bald / Shaved',
  LONG_STRAIGHT = 'Long Straight',
  LONG_WAVY = 'Long Wavy',
  CURLY = 'Curly / Afro',
  BOB_CUT = 'Bob Cut',
  BUN = 'Man Bun / Bun',
  PONYTAIL = 'Ponytail',
  PIXIE_CUT = 'Pixie Cut',
  SIDE_PART = 'Classic Side Part',
  POMPADOUR = 'Pompadour',
  UNDERCUT = 'Undercut',
  DREADLOCKS = 'Dreadlocks',
  BRAIDS = 'Box Braids',
  MESSY_SHAG = 'Messy Shag',
  MULLET = 'Mullet',
  SPIKY = 'Spiky Texture',
  WAVY_LOB = 'Wavy Lob',
  CUSTOM = 'Custom Hair'
}

export enum PoseOption {
  DEFAULT = 'Natural / Standard',
  ARMS_CROSSED = 'Arms Crossed',
  HANDS_ON_HIPS = 'Hands on Hips',
  HAND_ON_CHIN = 'Hand on Chin',
  LEANING = 'Leaning',
  SITTING = 'Sitting',
  SIDE_PROFILE = 'Side Profile',
  WALKING = 'Walking',
  HANDS_CLASPED = 'Hands Clasped',
  LOOKING_OVER_SHOULDER = 'Looking Over Shoulder',
  CUSTOM = 'Custom Pose'
}

export interface GeneratedImage {
  id: string;
  data: string; // Base64 string
  timestamp: number;
  style: HeadshotStyle;
}

export interface ProcessingState {
  isUploading: boolean;
  isGenerating: boolean;
  error: string | null;
}
