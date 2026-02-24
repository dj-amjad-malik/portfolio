// import { lazy, Suspense, useEffect } from "react";  // add useEffect
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import MediaHero from "@/components/MediaHero";

// const PhotoGallery = lazy(() => import("@/components/PhotoGallery"));
// const VideoGallery = lazy(() => import("@/components/VideoGallery"));
// const TechnicalRider = lazy(() => import("@/components/TechnicalRider"));

// // AFTER — use min-height on skeletons + aspect-ratio based estimate
// const SectionSkeleton = ({ height = 400 }: { height?: number }) => (
//   <div
//     style={{ minHeight: height, width: "100%" }}  // ✅ minHeight not height
//     className="bg-background"  // ✅ remove animate-pulse, it causes repaints
//     aria-hidden="true"
//   />
// );
// const MediaTech = () => {
//   // ✅ ADD THIS — pauses grain + blob animations during scroll
//   useEffect(() => {
//     let timeout: ReturnType<typeof setTimeout>;
//     const onScroll = () => {
//       document.documentElement.classList.add("is-scrolling");
//       clearTimeout(timeout);
//       timeout = setTimeout(() => {
//         document.documentElement.classList.remove("is-scrolling");
//       }, 150);
//     };
//     window.addEventListener("scroll", onScroll, { passive: true });
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   return (
//     <div className="min-h-screen bg-background">
//       <Header />
//       <main className="pt-20">
//         <MediaHero />
//         <Suspense fallback={<SectionSkeleton height={500} />}>
//           <PhotoGallery />
//         </Suspense>
//         <Suspense fallback={<SectionSkeleton height={700} />}>
//           <VideoGallery />
//         </Suspense>
//         <Suspense fallback={<SectionSkeleton height={400} />}>
//           <TechnicalRider />
//         </Suspense>
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default MediaTech;

// MediaTech.tsx
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MediaHero from "@/components/MediaHero";

const PhotoGallery = lazy(() => import("@/components/PhotoGallery"));
const VideoGallery = lazy(() => import("@/components/VideoGallery"));
const TechnicalRider = lazy(() => import("@/components/TechnicalRider"));

const SectionSkeleton = ({ height = 400 }: { height?: number }) => (
  <div
    className="w-full rounded-2xl bg-neutral-900/60 border border-white/5 animate-pulse"
    style={{ minHeight: height }}
  />
);

const LazySection = ({
  children,
  height = 400,
}: {
  children: React.ReactNode;
  height?: number;
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref}>
      {show ? (
        <Suspense fallback={<SectionSkeleton height={height} />}>
          {children}
        </Suspense>
      ) : (
        <SectionSkeleton height={height} />
      )}
    </div>
  );
};

const MediaTech = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <MediaHero />

      <main>
        <LazySection height={520}>
          <PhotoGallery />
        </LazySection>

        <LazySection height={520}>
          <VideoGallery />
        </LazySection>

        <LazySection height={420}>
          <TechnicalRider />
        </LazySection>
      </main>

      <Footer />
    </div>
  );
};

export default MediaTech;
