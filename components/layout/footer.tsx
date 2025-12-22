"use client";
import Link from "next/link";
import { Facebook, Instagram } from "lucide-react";
// import { useEffect } from "react";

const Logo = () => (
  <svg width="46" height="23" viewBox="0 0 46 23" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#filter0_n_32_43)">
      <path d="M24.9259 13.3857L27.5031 16.0398L28.7786 17.3011L29.6067 17.9464C30.0428 18.2862 30.5109 18.5827 31.0045 18.8318C32.0601 19.3646 33.2151 19.6718 34.3959 19.7339L35.1043 19.7711C35.8462 19.7711 36.5837 19.6576 37.2912 19.4344L37.4732 19.377L38.1513 19.0765C39.1123 18.6506 39.9767 18.0338 40.692 17.2636C41.2669 16.6446 41.7369 15.9357 42.0832 15.1651L42.3674 14.5329C42.6782 13.8414 42.8937 13.1109 43.0079 12.3614C43.1354 11.525 43.1354 10.6742 43.0079 9.8378L42.9549 9.49029C42.8756 8.97003 42.7505 8.4578 42.581 7.95957L42.5081 7.74523C42.1408 6.66582 41.5442 5.67875 40.7592 4.85188C40.3573 4.42856 39.9097 4.0511 39.4246 3.72644L39.1293 3.52875C38.2259 2.92417 37.2071 2.51341 36.137 2.3224C34.4213 2.01615 32.6525 2.28852 31.1084 3.09672L31.065 3.11943C30.3433 3.49719 29.6834 3.98288 29.1082 4.55971L22.0104 11.6777L17.9494 15.9084L15.945 17.8003L15.7094 17.9975C14.4736 19.032 12.9485 19.6597 11.3425 19.7948C10.906 19.8315 10.4671 19.8315 10.0306 19.7948L9.83856 19.7786C8.35103 19.6535 6.92815 19.1149 5.73067 18.2235C5.23561 17.8551 4.78484 17.4305 4.38733 16.9585L4.10051 16.6179L3.69893 16.0337C3.37743 15.5659 3.10414 15.0668 2.88326 14.544C2.6026 13.8797 2.40863 13.182 2.30614 12.4682L2.28808 12.3424C2.22957 11.9348 2.2002 11.5236 2.2002 11.1118C2.2002 10.3191 2.30905 9.53016 2.52371 8.76706L2.79893 7.78866C3.10724 6.76854 3.64424 5.83221 4.36905 5.05096L4.80337 4.58282L5.63544 3.88897C6.27323 3.35713 6.99949 2.94147 7.7811 2.66094C8.54954 2.38514 9.35984 2.24414 10.1763 2.24414H10.5936C11.2601 2.24414 11.9236 2.33189 12.5672 2.50513C13.2195 2.68071 13.8455 2.94256 14.4285 3.28373L14.611 3.39052C15.1001 3.67674 15.5616 4.00769 15.9896 4.37912L16.83 5.10837L18.1316 6.42224L20.3964 8.76092" stroke="url(#paint0_linear_32_43)" strokeWidth="4.4" strokeLinejoin="round" />
    </g>
    <defs>
      <filter id="filter0_n_32_43" x="0" y="0" width="45.3037" height="22.0223" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feTurbulence type="fractalNoise" baseFrequency="5 5" stitchTiles="stitch" numOctaves="3" result="noise" seed="3363" />
        <feColorMatrix in="noise" type="luminanceToAlpha" result="alphaNoise" />
        <feComponentTransfer in="alphaNoise" result="coloredNoise1">
          <feFuncA type="discrete" tableValues="0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 " />
        </feComponentTransfer>
        <feComposite operator="in" in2="shape" in="coloredNoise1" result="noise1Clipped" />
        <feFlood floodColor="rgba(0, 0, 0, 0.25)" result="color1Flood" />
        <feComposite operator="in" in2="noise1Clipped" in="color1Flood" result="color1" />
        <feMerge result="effect1_noise_32_43">
          <feMergeNode in="shape" />
          <feMergeNode in="color1" />
        </feMerge>
      </filter>
      <linearGradient id="paint0_linear_32_43" x1="43.2262" y1="10.8368" x2="2.2002" y2="10.8368" gradientUnits="userSpaceOnUse">
        <stop stopColor="#f12778" stopOpacity="0.6" />
        <stop offset="0.4" stopColor="#f12778" stopOpacity="0.8" />
        <stop offset="1" stopColor="#f12778" />
      </linearGradient>
    </defs>
  </svg>
);
const ig = "https://instagram.com"
const fb = "https://facebook.com"
// const wa = "https://whatsapp.com"

const legalLinks = [
  { title: "Shipping Policy", href: "/legal/shipping-policy" },
  { title: "Return Policy", href: "/legal/return-policy" },
  { title: "Warranty", href: "/legal/warranty" },
  { title: "Terms & Conditions", href: "/legal/terms-and-conditions" },
  { title: "Privacy Policy", href: "/legal/privacy-policy" },
]

export default function Footer() {
  return (
    <section
      className="relative bg-background"
    >
      {/* Separation line */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-0.5 bg-primary/10"></div>

      <div className="relative max-w-7xl mx-auto px-12 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Logo + Socials */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <Logo />
              <span className="text-2xl font-bold font-headline">Computer Plus</span>
            </Link>

            <div className="flex gap-3 mt-2">
              {[{ icon: Instagram, href: ig, label: "Instagram", target: "_blank" }, { icon: Facebook, href: fb, label: "Facebook", target: "_blank" }].map((s, idx) => (
                <Link
                  key={idx}
                  href={s.href}
                  aria-label={s.label}
                  target={s.target}
                  className="group relative flex h-10 w-10 items-center justify-center rounded-full bg-muted/10 text-muted-foreground hover:text-primary transition-colors"
                >
                  <s.icon className="h-5 w-5" />
                  <span className="absolute inset-0 rounded-full bg-primary/20 opacity-0 group-hover:opacity-30 animate-ripple"></span>
                </Link>
              ))}
              {/* WhatsApp icon */}
              {/* <Link
                href={wa}
                target="_blank"
                aria-label="WhatsApp"
                className="group relative flex h-10 w-10 items-center justify-center rounded-full bg-muted/10 text-muted-foreground hover:text-primary transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="h-5 w-5" fill="currentColor">
                  <path d="M380.9 97.1c-41.9-42-97.7-65.1-157-65.1-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480 117.7 449.1c32.4 17.7 68.9 27 106.1 27l.1 0c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3 18.6-68.1-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1s56.2 81.2 56.1 130.5c0 101.8-84.9 184.6-186.6 184.6zM325.1 300.5c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8s-14.3 18-17.6 21.8c-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7s-12.5-30.1-17.1-41.2c-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2s-9.7 1.4-14.8 6.9c-5.1 5.6-19.4 19-19.4 46.3s19.9 53.7 22.6 57.4c2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4s4.6-24.1 3.2-26.4c-1.3-2.5-5-3.9-10.5-6.6z" />
                </svg>
                <span className="absolute inset-0 rounded-full bg-primary/20 opacity-0 group-hover:opacity-30 animate-ripple"></span>
              </Link> */}
            </div>
          </div>

          {/* Legal links */}
          <div className="justify-self-center md:justify-self-end">
            <h4 className="font-headline font-semibold mb-4 text-center md:text-left">Legal</h4>
            <nav className="flex flex-col gap-2 text-sm text-center md:text-left">
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative group text-muted-foreground transition-colors hover:text-primary"
                >
                  <span className="relative z-10">{link.title}</span>
                  <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-primary transition-all group-hover:w-full"></span>
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-8 pt-4 border-t border-primary/30">
          <p className="text-center text-sm text-muted-foreground">
            © 2025 Computer Plus. All Rights Reserved. Made with ❤️ by{' '}
            <a
              href="https://github.com/VoidNebulon"
              target="_blank"
              className="font-medium text-pink-500 hover:text-pink-600 transition-colors duration-200 hover:underline hover:underline-offset-4"
            >
              Ali{' '}
            </a>
            and{' '}
            <a
              href="https://github.com/taimoorsafdardev"
              target="_blank"
              className="font-medium text-pink-500 hover:text-pink-600 transition-colors duration-200 hover:underline hover:underline-offset-4"
            >
              Taimoor
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
