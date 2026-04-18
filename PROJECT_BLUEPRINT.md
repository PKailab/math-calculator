# 🚀 PROJECT BLUEPRINT & MASTER GUIDE (Super Math Calculator)

**⚠️ AI AGENTS ATTENTION:** इस फाइल को हमेशा सटीक और अपडेटेड रखें। जब भी कोडबेस (Codebase) में कोई नई फाइल बने, डिलीट हो या कोई नया बड़ा फंक्शन जोड़ा जाए, तो इस फाइल को **अपडेट करना अनिवार्य है** (Check `AGENTS.md`)।

यह प्रोजेक्ट ब्लूप्रिंट भविष्य में किसी भी AI को पूरा प्रोजेक्ट समझाने, इसे किसी और प्रोग्रामिंग भाषा (जैसे Android/Flutter/Swift) में बदलने (Convert) या खुद पढ़कर फंक्शन में बदलाव करने के उद्देश्य से बनाया गया है।

---

## 📂 कुल फाइलों की संख्या (Total Files): ~32+

### 1️⃣ Root Directory (मुख्य फोल्डर)
1. **`package.json`**: पूरे प्रोजेक्ट (प्रोजेक्ट) की जानकारी और डिपेंडेंसी (Libraries) की लिस्ट होती है।
2. **`vite.config.ts`**: Vite बिल्ड टूल की सेटिंग्स होती हैं (प्रोजेक्ट को रन करने और बिल्ड करने के लिए)।
3. **`index.html`**: वेब पेज की मुख्य HTML फाइल, जहाँ रिएक्ट प्रोजेक्ट माउंट (Mount) होता है।
4. **`keyboard-layout.json`**: कीबोर्ड का डिज़ाइन और बटनों का ढांचा (Blueprint) इसमें JSON फॉरमेट में सेव है। इससे कोई भी AI भविष्य में पलक झपकते ही बटनों का लेआउट बना सकता है।
5. **`keyboard-logic.md`**: कीबोर्ड के खास बटनों का लॉजिक (Special Keys Functionality) लिख कर रखा गया है कि कौन-सी बटन प्रेस होने पर पर्दे के पीछे क्या गणित (Math) काम करेगा।
6. **`AGENTS.md`**: यह फाइल अन्य AI एजेंट्स को निर्देश देती है कि जब भी प्रोजेक्ट में बदलाव हो, उन्हें इस `PROJECT_BLUEPRINT.md` वाली फाइल को हमेशा ऑटो-अपडेट करना है ताकि जानकारी कभी पुरानी न हो।

### 2️⃣ `src/` (सोर्स कोड)
7. **`main.tsx`**: यह एंट्री पॉइंट (Entry Point) है जहाँ से React ऐप चालू होता है।
8. **`App.tsx`**: यह पूरे ऐप का दिमाग (Master Orchestrator) है।
   - **फंक्शन:** 
     - स्टेट मैनेजमेंट (Theme, Language, History, Keyboard Visibility)।
     - `handleKeyPress()`: कीबोर्ड से आने वाले सभी बटनों के इनपुट को प्रोसेस करता है और `AC` (All Clear), `DEL` (Delete), `Ans`, `÷R` जैसे बटनों का खास लॉजिक हैंडल करता है।
9. **`index.css`**: ग्लोबल CSS और Tailwind CSS की इम्पोर्ट फाइल।

### 3️⃣ `src/components/` (यूआई कंपोनेंट्स - UI Components)
यह सभी फाइलें छोटे-छोटे ब्लॉक्स हैं जो मिलकर ऐप की डिज़ाइन बनाते हैं।
10. **`Display.tsx`**: कैलकुलेटर की स्क्रीन को दिखाता है।
    - *Unified LCD Screen*: यह मुख्य कैलकुलेटर डिस्प्ले है। यह सभी गणित के उत्तर शॉर्ट में (Math mode) दिखाता है। अगर समस्या के लिए कोई स्टेप्स (Steps) उपलब्ध होता है, तो उत्तर के बगल में 'स्टेप्स' (Steps) बटन दिखाई देता है।
    - **फंक्शन:** हिस्ट्री (History) को ऊपर की तरफ स्क्रॉल करना। (नोट: `DEG`/`RAD` स्क्रीन से हटा दिया गया है)।
11. **`Keyboard.tsx`**: बटनों के ढाँचे (Grid) को स्क्रीन पर दिखाता है। JSON के आधार पर बटन बनाता है और क्लिक होने पर `App.tsx` को सिग्नल (Key pressed) भेजता है। इसके अंदर **Top Keyboard System** जुड़ा है जो यह तय करता है कि चैप्टर के आधार पर सिर्फ़ ऊपर की बटनें बदलें और नीचे का नंबर पैड (`STANDARD_NUMPAD`) वही रहे।
12. **`Sidebar.tsx`**: बायीं तरफ से खुलने वाला (Slide out) मेनू।
    - **फंक्शन:** इसके अंदर "मेनू" विकल्प (Menu Options) और "कैलकुलेशन हिस्ट्री" (Calculation History) का पेज मौजूद है जिसमें पुराने जवाब सेव रहते हैं।
13. **`ControlCenter.tsx`**: डिस्प्ले और कीबोर्ड के बीच की जादुई पट्टी (Bar)।
    - **फंक्शन:** यहाँ से मोड चेंज, सब-कैटिगरी और अन्य मेनू एक्सेस की जा सकती हैं। (नोट: Math/Step टॉगल बटन अब रिमूव कर दिया गया है)।
14. **`ModeDialog.tsx`**: अलग-अलग चैप्टर (जैसे Polynomials, Real Numbers) चुनने के लिए डायलॉग।
15. **`FeatureDialogs.tsx`**: इसमें थीम (Theme), सेटिंग (Settings), फॉर्मूले (Formulas), डिक्शनरी (Dictionary), यूनिट कनवर्टर (Unit Converter), वेरिएबल वैल्यू (Variables), क्विज़ (Quiz) और रिजल्ट फॉर्मेट (Result Format) जैसे सभी विकल्पों का डेटा और UI लॉजिक है। यह फुल-पेज में खुलता है।
16. **`StepsDialog.tsx`**: जटिल उत्तर के सभी स्टेप-बाय-स्टेप हल (Steps) दिखाने के लिए डायलॉग।

### 4️⃣ `src/utils/` (यूटिलिटी और हेल्पर्स)
17. **`mathFormats.ts`**: यह फ़ाइल कैलकुलेशन के परिणाम को अलग-अलग मैथेमेटिकल फॉर्मेट्स में बदलती है (जैसे भिन्न, दशमलव, रोमन अंक, बाइनरी, प्राइम फ़ैक्टराइज़ेशन आदि)। इसमें भविष्य के लिए एक शक्तिशाली (Future-proof) वाइटलिस्ट मैकेनिज्म बनाया गया है जो कस्टम फंक्शन्स (जैसे Factor, Euclid, Solve) को Algebra Engine में पार्स होने से रोकता है। साथ ही, बहुत बड़ी संख्याओं (21 अंकों तक) को साइंटिफिक नोटेशन (e.g. 10^14) में बदलने से रोकने के लिए इसमें `lowerExp` और `upperExp` का उपयोग करके और Integers के लिए `toLocaleString` का उपयोग करके कस्टम बाईपास जोड़ा गया है।
18. **`MathView.tsx`**: यह फाइल LaTeX (KaTeX) का इस्तेमाल करके स्क्रीन पर सुन्दर गणितीय सूत्र दिखाती है। अगर रिजल्ट कोई साधारण गिनती (Number) है तो यह Mathjs के Parser को बाईपास कर देता है ताकि बड़ी संख्याओं का रूप (Scientific Power) न बदले और KaTeX को थ्रो एरर से बचाता है।
18. **`i18n.ts`**: यह फ़ाइल सभी टेक्स्ट का हिंदी और अंग्रेजी में अनुवाद (Translation) करने का काम करती है।

### 5️⃣ `src/chapters/` (गणित और फॉर्मूले की लॉजिक फाइलें)
यह फोल्डर पूरे कैलकुलेटर का मैथमेटिकल (Mathematical Engine) इंजन है। हर चैप्टर के लिए एक अलग फाइल है ताकि कोड साफ़-सुथरा रहे।
19. **`index.ts`**: सभी चैप्टर्स को एक जगह लोड (Auto-discover) करने का काम करता है।
20. **`types.ts`**: सभी चैप्टर्स का प्रकार (Typescript Interfaces) तय करता है जैसे `Chapter`, `SubCategory`। 
21. **`ch0_simple_calc.ts`**: साधारण और साइंटिफिक कैलकुलेशन का मुख्य सॉल्वर (math.js का इस्तेमाल करके)।
22. **`ch1_real_numbers.ts`**: वास्तविक संख्याएं जैसे कि अभाज्य गुणनखंड (Prime Factorization), HCF, LCM आदि।
23. **`ch2_polynomials.ts`**: बहुपद (Polynomials)।
24. **`ch3_linear_equations.ts`**: दो चर वाले रैखिक समीकरण (Linear Equations)।
25. **`ch4_quadratic.ts`**: द्विघात समीकरण (Quadratic Equations), श्रीधराचार्य सूत्र, मूलों की प्रकृति।
26. **`ch5_ap.ts`**: समांतर श्रेढ़ी (Arithmetic Progressions - AP)।
27. **`ch6_triangles.ts`**: त्रिभुज (Triangles), थेल्स प्रमेय और समरूपता।
28. **`ch7_coordinate.ts`**: निर्देशांक ज्यामिति (Coordinate Geometry), दुरी सूत्र, विभाजन सूत्र।
29. **`ch8_trigonometry.ts`**: त्रिकोणमिति (Trigonometry), कोणों के मान (Sin, Cos, Tan)।
30. **`ch9_applications_trigonometry.ts`**: त्रिकोणमिति के अनुप्रयोग (ऊंचाई और दूरी)।
31. **`ch10_circles.ts`**: वृत्त (Circles), स्पर्श रेखाएँ।
32. **`ch12_areas_related_to_circles.ts`**: वृत्तों से सम्बंधित क्षेत्रफल (Area of Sector and Segment)।
33. **`ch13_mensuration.ts`**: पृष्ठीय क्षेत्रफल और आयतन (Surface Area and Volumes - Cube, Cylinder, Cone, Sphere)।
34. **`ch14_statistics.ts`**: सांख्यिकी (Statistics - Mean, Median, Mode)।
35. **`ch15_probability.ts`**: प्रायिकता (Probability - Coins, Dice, Cards)।

---

## 🧩 भविष्य के लिए अनुवाद (Translation & Offline PWA)
यदि भविष्य में इसे किसी नई भाषा में बदलना हो या नए सिस्टम (जैसे Android-APK) में बनाना हो:
- **UI Translation (React/Web):** `App.tsx` में एक `language` स्टेट है। इसके आधार पर हर कंपोनेंट में `t(englishString, hindiString)` फंक्शन कॉल होता है।
- **Business Logic & Math Engine:** सारा गणित `src/chapters/*.ts` में है। UI वाला कोई भी हिस्सा लॉजिक में नहीं घुसा है, इसलिए सिर्फ `chapters` फोल्डर को दूसरी भाषा (Dart, Kotlin, Swift, Python) में ले जाना होगा, बाकी UI नया बनाया जा सकता है।
- **Offline / Android APK (PWA Ready):** `vite-plugin-pwa` का इस्तेमाल करके इसे पूरी तरह ऑफलाइन रेडी और इन्स्टॉल होने योग्य (Progressive Web App) बनाया गया है। बिना इंटरनेट यह तुरंत खुलता है, और भविष्य में इसे CapacitorJS के ज़रिए `.apk` में आसानी से कन्वर्ट किया जा सकता है।

## 🤖 मुख्य लॉजिक निर्देश (Core Functions & Features Memory)
- **`Ans` Button:** हिस्ट्री ऐरे (History array) से पिछली वैल्यू उठाता है और स्क्रीन में प्रिंट करता है।
- **`AC` Button (Two-stage Clean):** पहली बार दबाने पर स्क्रीन खली होती है और आउटपुट हिस्ट्री में भाग जाता है। दूसरी बार दबाने पर हिस्ट्री डिलीट हो जाती है।
- **`÷R` Button:** शेषफल सहित भागफल (`[ Quotient : R=Remainder ]`) देने का लॉजिक `App.tsx` के `SOLVE` वाले ब्लॉक में लिखा गया है।
- **रिपीटिंग डेसिमल (`\u0305`):** 0.5̅ या खाली डिब्बों (`□`) का सारा स्मार्ट लॉजिक `handleKeyPress` (`App.tsx`) में सेव है।
- **`π` (Pi) & `∞` (Infinity) Handling:** गणितीय इंजन (math.js) में भेजने से पहले `π` को `pi` और `∞` को `Infinity` में बदल दिया जाता है। `tan(90 deg)` में इंफिनिटी को भी हैंडल कर लिया गया है।
- **TopKeyboard System:** हर मॉड़्यूल में बार-बार नंबर वाला बड़ा कीबोर्ड न लिखना पड़े इसके लिए `topKeyboardLayout` लाया गया है जो सिर्फ ऊपर का कीबोर्ड बदलता है और नीचे वाला (`STANDARD_NUMPAD`) वही रहता है।

*This file acts as the persistent AI Context. You can copy the structure above, share it with ChatGPT/Claude/Gemini, and say "Translate this React architecture to Flutter/Android." - and it will flawlessly understand everything.*
