import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(ScrollTrigger, CustomEase);

CustomEase.create("gearEase", "0.45, 0, 0.2, 1");

export { gsap, ScrollTrigger, CustomEase };
