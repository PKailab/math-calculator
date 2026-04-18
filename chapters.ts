// chapters.ts - यह फाइल आपके सारे चैप्टर्स को जोड़ती है
import { ch0 } from './ch0_simple_calc';
import { ch1 } from './ch1_real_numbers';
import { ch2 } from './ch2_polynomials';
import { ch3 } from './ch3_linear_equations';
import { ch4 } from './ch4_quadratic';
import { ch5 } from './ch5_ap';
import { ch6 } from './ch6_triangles';
import { ch7 } from './ch7_coordinate';
import { ch8 } from './ch8_trigonometry';
import { ch9 } from './ch9_applications_trigonometry';
import { ch10 } from './ch10_circles';
import { ch13 } from './ch13_mensuration';
import { ch14 } from './ch14_statistics';
import { ch15 } from './ch15_probability';

// यहाँ CHAPTERS (Capital और Plural) लिखना बहुत ज़रूरी है 
// क्योंकि App.tsx इसी नाम को ढूँढ रहा है
export const CHAPTERS = [
  ch0, ch1, ch2, ch3, ch4, ch5, ch6, ch7, ch8, ch9, ch10, ch13, ch14, ch15
];
