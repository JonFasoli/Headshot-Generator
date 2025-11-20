
import { GoogleGenAI, Modality } from "@google/genai";
import { HeadshotStyle, ClothingOption, HairStyleOption, PoseOption } from "../types";

// Helper to clean base64 string (remove data:image/...;base64, prefix)
const cleanBase64 = (base64: string): string => {
  return base64.replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, "");
};

const getPromptForStyle = (style: HeadshotStyle, customValue: string = ""): string => {
  if (customValue && customValue.trim().length > 0) {
     return `Custom Style: ${customValue}. The image should follow this specific description for background, lighting, and overall vibe.`;
  }

  switch (style) {
    case HeadshotStyle.CORPORATE:
      return "Background should be a blurred modern office interior or a solid neutral grey studio backdrop. Lighting should be soft, professional studio lighting (Rembrandt or Butterfly). Posture should be confident and authoritative. Default clothing: Professional dark navy or charcoal suit with a crisp white shirt.";
    case HeadshotStyle.STARTUP:
      return "Background should be a bright, modern co-working space or a clean, solid light color. Lighting should be bright and inviting. Expression should be approachable and energetic. Default clothing: Smart casual, high-quality t-shirt with a blazer, or a nice button-down shirt.";
    case HeadshotStyle.CREATIVE:
      return "Background can have artistic elements or colored studio lighting (e.g., deep blue or warm amber hues). Lighting should be dramatic but flattering, emphasizing facial structure. Default clothing: Stylish, textured clothing like a turtleneck or structured jacket.";
    case HeadshotStyle.OUTDOOR:
      return "Background should be a naturally lit outdoor setting with pleasant bokeh (blurred trees or city street). Lighting should be golden hour natural light. The vibe should be fresh and organic. Default clothing: Smart casual outdoor attire.";
    case HeadshotStyle.MINIMALIST:
      return "Background should be pure white or very light grey. Lighting should be high-key and very soft, minimizing shadows. The look should be clean and modern. Default clothing: Simple, solid-colored clothing (black, white, or beige).";
    case HeadshotStyle.PIXAR:
      return "Transform the subject into a high-quality 3D animated character in the style of a modern Pixar movie. Features should be stylized (large expressive eyes, smooth skin) but clearly recognizable. Lighting should be warm, cinematic, and soft. Background should be a colorful, soft-focus animated environment.";
    case HeadshotStyle.TED:
      return "Background should be a dark stage with blurred red branding elements and stage lights. Lighting should be dramatic spotlighting (rim light). Posture should be dynamic. Default clothing: Smart business attire with a visible lapel microphone.";
    case HeadshotStyle.PODCAST:
      return "Background should be a professional recording studio with acoustic foam panels and a blurred microphone in the foreground. Lighting should be moody with neon accents. Default clothing: Casual, trendy clothing, potentially with large headphones.";
    case HeadshotStyle.FANTASY:
      return "Transform the subject into a high-fantasy RPG character. Background should be an epic, cinematic landscape. Lighting should be ethereal and magical. Art style: Realistic digital painting. Default clothing: Medieval armor or mage robes.";
    default:
      return "Professional business attire. Neutral studio background.";
  }
};

const getPromptForClothing = (clothing: ClothingOption, customValue: string = ""): string => {
  if (customValue && customValue.trim().length > 0) {
    return `Wear specific custom clothing: ${customValue}.`;
  }

  switch (clothing) {
    case ClothingOption.CHARCOAL_SUIT:
      return "Wear a tailored charcoal grey business suit with a white dress shirt and a subtle tie.";
    case ClothingOption.NAVY_SUIT:
      return "Wear a sharp navy blue suit with a crisp white shirt.";
    case ClothingOption.WHITE_SHIRT:
      return "Wear a crisp, clean white button-down dress shirt, top button unbuttoned, no jacket.";
    case ClothingOption.TURTLENECK:
      return "Wear a sophisticated black turtleneck sweater.";
    case ClothingOption.TSHIRT:
      return "Wear a high-quality, solid color crew-neck t-shirt (black or white).";
    case ClothingOption.HOODIE:
      return "Wear a comfortable, stylish pullover hoodie.";
    case ClothingOption.LEATHER_JACKET:
      return "Wear a sleek black leather motorcycle jacket over a simple shirt.";
    case ClothingOption.EVENING_GOWN:
      return "Wear an elegant formal evening gown/dress.";
    case ClothingOption.DOCTOR_COAT:
      return "Wear a professional white medical lab coat over business casual attire.";
    case ClothingOption.POLO_SHIRT:
      return "Wear a smart-casual polo shirt.";
    case ClothingOption.CHECKERED_SHIRT:
      return "Wear a casual checkered or flannel button-down shirt.";
    case ClothingOption.KNIT_SWEATER:
      return "Wear a cozy, textured knit sweater.";
    case ClothingOption.TWEED_JACKET:
      return "Wear a classic tweed jacket with a dress shirt (academic look).";
    case ClothingOption.BLUE_SCRUBS:
      return "Wear blue medical scrubs.";
    case ClothingOption.CONSTRUCTION_VEST:
      return "Wear a high-visibility safety vest over work clothes and a hard hat.";
    case ClothingOption.CHEF_COAT:
      return "Wear a professional white chef's coat.";
    case ClothingOption.FLORAL_DRESS:
      return "Wear a nice floral pattern dress.";
    case ClothingOption.TUXEDO:
      return "Wear a formal black tuxedo with a bow tie.";
    case ClothingOption.CYBERPUNK_JACKET:
      return "Wear a futuristic cyberpunk style jacket with neon accents.";
    case ClothingOption.DEFAULT:
    default:
      return ""; // Let the style dictate clothing
  }
};

const getPromptForHair = (hair: HairStyleOption, customValue: string = ""): string => {
  if (customValue && customValue.trim().length > 0) {
    return `Custom hairstyle: ${customValue}.`;
  }

  switch (hair) {
    case HairStyleOption.SHORT_NEAT:
      return "Short, neat, and professionally styled hair.";
    case HairStyleOption.BUZZ_CUT:
      return "Very short buzz cut.";
    case HairStyleOption.BALD:
      return "Completely bald / shaven head.";
    case HairStyleOption.LONG_STRAIGHT:
      return "Long, straight, silky hair draped over shoulders.";
    case HairStyleOption.LONG_WAVY:
      return "Long, loose wavy hair with volume.";
    case HairStyleOption.CURLY:
      return "Curly / Afro textured hair.";
    case HairStyleOption.BOB_CUT:
      return "Classic bob cut.";
    case HairStyleOption.BUN:
      return "Hair tied back in a bun or man bun.";
    case HairStyleOption.PONYTAIL:
      return "Hair tied back in a ponytail.";
    case HairStyleOption.PIXIE_CUT:
      return "Short pixie cut.";
    case HairStyleOption.SIDE_PART:
      return "Classic side part.";
    case HairStyleOption.POMPADOUR:
      return "Stylish pompadour.";
    case HairStyleOption.UNDERCUT:
      return "Undercut style.";
    case HairStyleOption.DREADLOCKS:
      return "Dreadlocks.";
    case HairStyleOption.BRAIDS:
      return "Box braids.";
    case HairStyleOption.MESSY_SHAG:
      return "Messy shag cut.";
    case HairStyleOption.MULLET:
      return "Modern mullet.";
    case HairStyleOption.SPIKY:
      return "Spiky textured hair.";
    case HairStyleOption.WAVY_LOB:
      return "Wavy lob (long bob).";
    case HairStyleOption.DEFAULT:
    default:
      return ""; // Keep original hair roughly
  }
};

const getPromptForPose = (pose: PoseOption, customValue: string = ""): string => {
  if (customValue && customValue.trim().length > 0) {
    return `Pose: ${customValue}.`;
  }

  switch (pose) {
    case PoseOption.ARMS_CROSSED:
      return "Pose: Arms crossed confidently.";
    case PoseOption.HANDS_ON_HIPS:
      return "Pose: Hands placed on hips, power pose.";
    case PoseOption.HAND_ON_CHIN:
      return "Pose: One hand resting on chin, thinking expression.";
    case PoseOption.LEANING:
      return "Pose: Leaning casually against a wall or surface.";
    case PoseOption.SITTING:
      return "Pose: Sitting comfortably.";
    case PoseOption.SIDE_PROFILE:
      return "Pose: Side profile view.";
    case PoseOption.WALKING:
      return "Pose: Walking towards the camera.";
    case PoseOption.HANDS_CLASPED:
      return "Pose: Hands clasped together.";
    case PoseOption.LOOKING_OVER_SHOULDER:
      return "Pose: Looking back over the shoulder.";
    case PoseOption.DEFAULT:
    default:
      return "Pose: Natural professional headshot pose, facing forward or slightly angled.";
  }
}

export const generateProfessionalHeadshot = async (
  imageBase64: string, 
  style: HeadshotStyle,
  clothing: ClothingOption,
  hair: HairStyleOption,
  customStyle: string = "",
  customClothing: string = "",
  customHair: string = "",
  pose: PoseOption = PoseOption.DEFAULT,
  customPose: string = ""
): Promise<string> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found");
  }

  const ai = new GoogleGenAI({ apiKey });
  
  const stylePrompt = getPromptForStyle(style, customStyle);
  const clothingPrompt = getPromptForClothing(clothing, customClothing);
  const hairPrompt = getPromptForHair(hair, customHair);
  const posePrompt = getPromptForPose(pose, customPose);

  const fullPrompt = `
    Generate a professional photorealistic headshot based on the input image.
    Maintain the subject's facial identity, key features, and ethnicity strictly. 
    
    Style Instructions: ${stylePrompt}
    Clothing Instructions: ${clothingPrompt}
    Hair Instructions: ${hairPrompt}
    Pose Instructions: ${posePrompt}

    The result should be a high-quality, high-resolution portrait suitable for a professional profile.
    Do not distort the face. Ensure eyes are looking at the camera unless specified otherwise.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image', // Using nano banana for editing/generation
      contents: {
        parts: [
          {
            text: fullPrompt,
          },
          {
            inlineData: {
              mimeType: 'image/png', // Assuming png for base64, actual mime type handled by browser FileReader usually
              data: cleanBase64(imageBase64),
            },
          },
        ],
      },
      config: {
         // Nano banana series doesn't support responseMimeType or responseSchema
      },
    });

    // Iterate through parts to find the image
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    
    throw new Error("No image generated in response");

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
