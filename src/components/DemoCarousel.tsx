'use client';

import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';

const demos = [
  { before: "https://pub-6870195e15d044f2944fc59f9ee569df.r2.dev/demos/before1.jpg", after: "https://pub-6870195e15d044f2944fc59f9ee569df.r2.dev/demos/after1.mp4", label: "Coffee Morning" },
  { before: "https://pub-6870195e15d044f2944fc59f9ee569df.r2.dev/demos/before2.jpg", after: "https://pub-6870195e15d044f2944fc59f9ee569df.r2.dev/demos/after2.mp4", label: "Cozy Vibes" },
  { before: "https://pub-6870195e15d044f2944fc59f9ee569df.r2.dev/demos/before3.jpg", after: "https://pub-6870195e15d044f2944fc59f9ee569df.r2.dev/demos/after3.mp4", label: "Study Break" },
];

export default function DemoCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="md:hidden">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {demos.map((demo, idx) => (
            <div key={idx} className="flex-[0_0_100%] px-4">
              <div className="aspect-[9/16] rounded-2xl overflow-hidden relative bg-white/5 border border-white/10">
                <Image
                  src={demo.before}
                  alt={`${demo.label} - before`}
                  fill
                  sizes="100vw"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <video src={demo.after} className="absolute inset-0 w-full h-full object-cover" autoPlay muted loop playsInline />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <span className="text-sm font-medium">{demo.label}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center gap-2 mt-4">
        {demos.map((_, idx) => (
          <button
            key={idx}
            onClick={() => emblaApi?.scrollTo(idx)}
            className={`h-2 rounded-full transition-all ${idx === selectedIndex ? 'w-8 bg-purple-500' : 'w-2 bg-white/20'}`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
      <p className="text-center text-gray-500 text-xs mt-3">Swipe to see more</p>
    </div>
  );
}
