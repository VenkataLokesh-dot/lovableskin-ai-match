import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Note: In production, use a backend proxy
});

// Types matching the result_Example.json structure
export interface SkinAnalysisResult {
  analysis_id: string;
  timestamp: string;
  skin_profile: {
    type: string;
    concerns: string[];
    skin_tone: string;
    age_range: string;
  };
  immediate_concerns: Array<{
    issue: string;
    urgency: string;
    recommendation: string;
  }>;
  skincare_routine: {
    morning: Array<{
      step: number;
      product_type: string;
      ingredients: string[];
      purpose: string;
    }>;
    evening: Array<{
      step: number;
      product_type: string;
      ingredients: string[];
      purpose: string;
    }>;
  };
  product_filters: {
    avoid_ingredients: string[];
    preferred_ingredients: string[];
    skin_type_tags: string[];
    price_range: string;
  };
  progress_tracking: {
    check_in_days: number;
    expected_improvements: string[];
    warning_signs: string[];
  };
}

// Convert image to base64
const imageToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      // Remove data URL prefix to get just the base64 string
      const base64 = result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

// Convert canvas to base64
const canvasToBase64 = (canvas: HTMLCanvasElement): string => {
  const dataURL = canvas.toDataURL('image/jpeg', 0.8);
  return dataURL.split(',')[1];
};

// Main skin analysis function
export const analyzeSkinWithOpenAI = async (
  imageSource: File | HTMLCanvasElement
): Promise<SkinAnalysisResult> => {
  try {
    // Convert image to base64
    let base64Image: string;
    if (imageSource instanceof File) {
      base64Image = await imageToBase64(imageSource);
    } else {
      base64Image = canvasToBase64(imageSource);
    }

    // Validate image size (OpenAI has limits)
    const imageSizeKB = (base64Image.length * 3) / 4 / 1024;
    if (imageSizeKB > 5000) { // 5MB limit
      throw new Error('Image size too large. Please use a smaller image.');
    }

    // Create the analysis prompt
    const analysisPrompt = `
You are an expert dermatologist and skincare specialist.

Your task is to analyze the provided facial image and return a comprehensive skin assessment in the form of a **valid JSON object**.

Your analysis must cover:
1. Skin type (e.g., oily, dry, combination, normal, sensitive)
2. Visible concerns (e.g., acne, pores, pigmentation, wrinkles, redness)
3. Skin tone (e.g., light, medium, dark)
4. Estimated age range (e.g., 20-30)
5. Immediate skincare concerns with urgency and treatment
6. A complete morning and evening skincare routine
7. Product ingredient preferences and restrictions
8. Progress tracking plan

⚠️ **VERY IMPORTANT RULES**:
- If NO visible issues are detected, set \`"concerns"\` to \`["no visible issues found"]\`
- If no immediate concerns, set \`"immediate_concerns"\` to an **empty array** \`[]\`
- ONLY list concerns that are clearly visible — DO NOT assume or invent problems
- Be conservative in diagnosis — healthy skin should be recognized as such
- Ingredient recommendations should be evidence-based and safe

⛔ Do NOT return any explanation, just a valid JSON object in this exact structure:

{
  "analysis_id": "skin_analysis_[random_id]",
  "timestamp": "[current_iso_timestamp]",
  "skin_profile": {
    "type": "[skin_type]",
    "concerns": ["concern1", "concern2"],
    "skin_tone": "[light/medium/dark]",
    "age_range": "[age_range]"
  },
  "immediate_concerns": [
    {
      "issue": "[concern]",
      "urgency": "[high/medium/low]",
      "recommendation": "[specific_advice]"
    }
  ],
  "skincare_routine": {
    "morning": [
      {
        "step": 1,
        "product_type": "[cleanser/serum/moisturizer/sunscreen]",
        "ingredients": ["ingredient1", "ingredient2"],
        "purpose": "[specific_purpose]"
      }
    ],
    "evening": [
      {
        "step": 1,
        "product_type": "[product_type]",
        "ingredients": ["ingredient1"],
        "purpose": "[purpose]"
      }
    ]
  },
  "product_filters": {
    "avoid_ingredients": ["ingredient1", "ingredient2"],
    "preferred_ingredients": ["ingredient1", "ingredient2"],
    "skin_type_tags": ["tag1", "tag2"],
    "price_range": "[budget/mid_range/luxury]"
  },
  "progress_tracking": {
    "check_in_days": 14,
    "expected_improvements": ["improvement1", "improvement2"],
    "warning_signs": ["sign1", "sign2"]
  }
}

Be specific with ingredient recommendations and ensure all advice is evidence-based and safe.
`;

    // Make the API call
    const response = await openai.chat.completions.create({
      model: import.meta.env.VITE_OPENAI_MODEL || 'gpt-4o-mini',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: analysisPrompt
            },
            {
              type: 'image_url',
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`,
                detail: import.meta.env.VITE_IMAGE_DETAIL_LEVEL || 'high'
              }
            }
          ]
        }
      ],
      max_tokens: parseInt(import.meta.env.VITE_OPENAI_MAX_TOKENS || '4000'),
      temperature: parseFloat(import.meta.env.VITE_OPENAI_TEMPERATURE || '0.3'),
      response_format: { type: 'json_object' }
    });

    const analysisText = response.choices[0]?.message?.content;
    if (!analysisText) {
      throw new Error('No analysis received from OpenAI');
    }

    // Parse and validate the JSON response
    let analysisResult: SkinAnalysisResult;
    try {
      analysisResult = JSON.parse(analysisText);
    } catch (parseError) {
      console.error('Failed to parse OpenAI response:', analysisText);
      throw new Error('Invalid response format from AI analysis');
    }

    // Validate required fields
    if (!analysisResult.analysis_id || !analysisResult.skin_profile || !analysisResult.skincare_routine) {
      throw new Error('Incomplete analysis result from AI');
    }

    // Add timestamp if missing
    if (!analysisResult.timestamp) {
      analysisResult.timestamp = new Date().toISOString();
    }

    // Add analysis_id if missing
    if (!analysisResult.analysis_id) {
      analysisResult.analysis_id = `skin_analysis_${Date.now()}`;
    }

    return analysisResult;

  } catch (error) {
    console.error('OpenAI Analysis Error:', error);
    
    // Return fallback analysis if API fails
    if (error instanceof Error && error.message.includes('API key')) {
      throw new Error('Analysis service not configured. Please check your configuration.');
    }
    
    throw new Error(`Skin analysis failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

// Utility function to validate API key
export const validateOpenAIConfig = (): boolean => {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  return !!(apiKey && apiKey !== 'your_openai_api_key_here');
};

// Export for debugging
export const getOpenAIConfig = () => {
  return {
    hasApiKey: !!import.meta.env.VITE_OPENAI_API_KEY,
    model: import.meta.env.VITE_OPENAI_MODEL || 'gpt-4o-mini',
    maxTokens: import.meta.env.VITE_OPENAI_MAX_TOKENS || '4000',
    temperature: import.meta.env.VITE_OPENAI_TEMPERATURE || '0.3',
    detailLevel: import.meta.env.VITE_IMAGE_DETAIL_LEVEL || 'high'
  };
};