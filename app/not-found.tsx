// 'use client';

// import Link from 'next/link';
// import { motion } from 'framer-motion';
// import { Button } from '@/components/ui/button';
// import { ChevronRight } from 'lucide-react';
// import { useState, useEffect } from 'react';

// const BrokenChipIcon = () => (
//   <motion.div
//     animate={{
//       y: [-5, 5, -5],
//       rotate: [0, 5, -5, 0],
//     }}
//     transition={{
//       duration: 4,
//       ease: 'easeInOut',
//       repeat: Infinity,
//     }}
//   >
//     <svg
//       width="120"
//       height="120"
//       viewBox="0 0 24 24"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//       className="text-primary drop-shadow-[0_4px_4px_rgba(0,0,0,0.15)]"
//     >
//       <motion.path
//         d="M9 20H4.6C4.03995 20 3.75992 20 3.54601 19.891C3.35785 19.7951 3.20487 19.6422 3.10899 19.454C3 19.2401 3 18.9601 3 18.4V15M9 4H4.6C4.03995 4 3.75992 4 3.54601 4.10899C3.35785 4.20487 3.20487 4.35785 3.10899 4.54601C3 4.75992 3 5.03995 3 5.6V9M15 4H19.4C19.9601 4 20.2401 4 20.454 4.10899C20.6422 4.20487 20.7951 4.35785 20.891 4.54601C21 4.75992 21 5.03995 21 5.6V9M15 20H19.4C19.9601 20 20.2401 20 20.454 19.891C20.6422 19.7951 20.7951 19.6422 20.891 19.454C21 19.2401 21 18.9601 21 18.4V15"
//         stroke="currentColor"
//         strokeWidth="1.5"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         initial={{ pathLength: 0, opacity: 0 }}
//         animate={{ pathLength: 1, opacity: 1 }}
//         transition={{ duration: 1, delay: 0.2 }}
//       />
//       <motion.path
//         d="M8 14C8 15.1046 7.10457 16 6 16C4.89543 16 4 15.1046 4 14C4 12.8954 4.89543 12 6 12C7.10457 12 8 12.8954 8 14Z"
//         stroke="currentColor"
//         strokeWidth="1.5"
//         initial={{ scale: 0, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.8 }}
//       />
//       <motion.rect
//         x="8"
//         y="8"
//         width="8"
//         height="8"
//         rx="1"
//         fill="currentColor"
//         fillOpacity="0.3"
//         initial={{ scale: 0, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.5 }}
//       />
//       <motion.path
//         d="M14 19L14 21M10 19L10 21M17 14H19M17 10H19M14 3L14 5M10 3L10 5M5 14H7M5 10H7"
//         stroke="currentColor"
//         strokeWidth="1.5"
//         strokeLinecap="round"
//         initial={{ pathLength: 0, opacity: 0 }}
//         animate={{ pathLength: 1, opacity: 1 }}
//         transition={{ duration: 1, delay: 0.7 }}
//       />
//       <motion.path
//         d="M10.5 10.5L13.5 13.5M13.5 10.5L10.5 13.5"
//         stroke="white"
//         strokeWidth="1.5"
//         strokeLinecap="round"
//         initial={{ pathLength: 0, opacity: 0 }}
//         animate={{ pathLength: 1, opacity: 1 }}
//         transition={{ duration: 0.5, delay: 1.2 }}
//       />
//     </svg>
//   </motion.div>
// );

// const StaticFallback = () => (
//   <div className="mt-10">
//     <div className="w-[120px] h-[120px] mx-auto" />
//     <h1 className="mt-8 font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
//       404: Page Not Found
//     </h1>
//     <p className="mt-6 text-base leading-7 text-muted-foreground">
//       Loading...
//     </p>
//     <div className="mt-10">
//       <Button asChild size="lg" variant="outline" className="group text-lg font-semibold border-border">
//         <Link href="/">
//           Take me Home
//         </Link>
//       </Button>
//     </div>
//   </div>
// );


// export default function NotFound() {
//   const [isClient, setIsClient] = useState(false);

//   useEffect(() => {
//     setIsClient(true);
//   }, []);

//   return (
//     <div className="flex min-h-screen flex-col items-center justify-center bg-[radial-gradient(ellipse_at_center,var(--background),var(--color-rose-50),var(--color-rose-100))] text-center px-4">
//       <div className="max-w-md">
//         {!isClient ? (
//           <StaticFallback />
//         ) : (
//           <>
//             <BrokenChipIcon />
//             <motion.h1
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.2 }}
//               className="mt-8 font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
//             >
//               404: This Page is Out of Warranty
//             </motion.h1>

//             <motion.p
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.4 }}
//               className="mt-6 text-base leading-7 text-muted-foreground"
//             >
//               Oof. Looks like this digital part wasn't in stock. It might be a broken link, a deleted page, or just a glitch in the matrix.
//             </motion.p>

//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.6 }}
//               className="mt-10"
//             >
//               <Button asChild size="lg" variant="outline" className="group text-lg font-semibold border-border hover:border-primary">
//                 <Link href="/">
//                   Take me Home
//                   <ChevronRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-2" />
//                   <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full"></span>
//                 </Link>
//               </Button>
//             </motion.div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// app/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-rose-50 via-rose-100 to-rose-200 px-4">
      <div className="bg-white/80 backdrop-blur-md border border-white/30 rounded-2xl p-10 text-center shadow-lg max-w-md w-full">
        <h1 className="text-5xl font-bold text-red-600 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-8">
          Oops! The page you are looking for doesn’t exist or has been moved.
        </p>
        <Link href="/">
          <button className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-all duration-300">
            Take me Home
          </button>
        </Link>
      </div>
    </div>
  );
}
