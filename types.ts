/**
 * ============================================================================
 * 🚀 CORE ARCHITECTURE: TYPES (कोर आर्किटेक्चर)
 * ============================================================================
 * यह फाइल पूरे कैलकुलेटर का "नक्शा" (Blueprint) है। 
 * हर नया चैप्टर इसी 'Chapter' इंटरफेस को फॉलो करेगा।
 * 
 * 💡 मॉड्यूलरिटी का नियम:
 * कोई भी चैप्टर दूसरे चैप्टर पर निर्भर (dependent) नहीं होना चाहिए।
 * हर चैप्टर का अपना कीबोर्ड, अपना लॉजिक और अपना UI गाइड होगा।
 */

export interface SubCategory {
  id: string;
  title: string;
  inputGuide: string;
  keyboardLayout?: (string | null)[][];
  topKeyboardLayout?: (string | null)[][];
  solve?: (inputStr: string, isShortMode: boolean) => string | { result: string; steps: string[] };
}

export interface Chapter {
  /** 
   * चैप्टर का यूनिक ID (जैसे: "ch1", "ch6", "formulas") 
   * ध्यान दें: इसे हमेशा यूनिक रखें।
   */
  id: string;

  /** 
   * चैप्टर का नाम जो सेटिंग्स और स्क्रीन पर दिखेगा 
   * (जैसे: "Chapter 6: त्रिभुज") 
   */
  title: string;

  /** 
   * यूज़र के लिए निर्देश कि इनपुट कैसे डालना है 
   * (जैसे: "लंब, आधार डालें (उदा: 3,4)") 
   */
  inputGuide: string;

  /** 
   * इस विशेष चैप्टर के लिए कस्टम कीबोर्ड लेआउट।
   * यह 2D Array है (Rows और Columns)।
   * खाली जगह के लिए "" (empty string) का प्रयोग करें।
   */
  keyboardLayout?: (string | null)[][];
  topKeyboardLayout?: (string | null)[][];

  /**
   * 🧠 मुख्य लॉजिक फंक्शन (Main Logic Function)
   * यह फंक्शन यूज़र के इनपुट को लेता है और उत्तर (String) लौटाता है।
   * 
   * @param input यूज़र द्वारा टाइप किया गया टेक्स्ट (उदा: "3,4")
   * @param isShort अगर true है, तो सिर्फ फाइनल उत्तर दें। false है तो स्टेप-बाय-स्टेप दें।
   * @returns हल किया हुआ उत्तर (String)
   */
  solve: (input: string, isShort: boolean) => string | { result: string; steps: string[] };

  /**
   * सब-कैटिगरी (Sub-categories)
   * एक चैप्टर के अंदर अलग-अलग प्रकार के सवाल हल करने के लिए।
   */
  subCategories?: SubCategory[];
}
