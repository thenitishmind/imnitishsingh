"use client";

import { useState } from "react";
import Image from "next/image";
import { FaQuoteLeft } from "react-icons/fa";
import { testimonials } from "@/lib/github";

const Testimonials = () => {
  const [imageErrors, setImageErrors] = useState<{[key: number]: boolean}>({});

  const handleImageError = (id: number) => {
    setImageErrors(prev => ({ ...prev, [id]: true }));
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 via-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
            Developer Testimonials
          </h2>
          <p className="mt-3 text-base md:text-lg text-gray-400 max-w-2xl mx-auto">
            What fellow developers say about working with me
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="relative rounded-2xl border border-white/10 bg-white/5 p-6 md:p-7 shadow-xl overflow-hidden"
            >
              <div className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full bg-gradient-to-tr from-blue-500/10 via-cyan-400/10 to-transparent" />
              <div className="absolute top-5 left-5 text-blue-400/30">
                <FaQuoteLeft className="w-12 h-12" />
              </div>

              <figure className="relative z-10" aria-label={`Testimonial by ${testimonial.name}`}>
                <blockquote className="text-gray-200 leading-relaxed text-base md:text-lg">
                  &ldquo;{testimonial.text}&rdquo;
                </blockquote>

                <figcaption className="mt-5 pt-5 border-t border-white/10 flex items-center">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-white/10 mr-4" aria-hidden="true">
                    <Image
                      src={imageErrors[testimonial.id]
                        ? "/images/default-avatar.jpg"
                        : encodeURI(testimonial.avatar)}
                      alt={testimonial.name}
                      className="object-cover"
                      fill
                      sizes="56px"
                      onError={() => handleImageError(testimonial.id)}
                    />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-white font-semibold truncate">{testimonial.name}</h4>
                    <p className="text-gray-400 text-sm truncate">
                      {testimonial.role} at {testimonial.company}
                    </p>
                  </div>
                </figcaption>
              </figure>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
