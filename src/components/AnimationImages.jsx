import React from "react";
import ScrollReveal from "@/components/ScrollReveal";
import Image from "next/image";

const AnimationImages = ({ images }) => {
  return (
    <>
      {/* Photo 1 */}
      <div className="w-5/6 md:w-2/6 mx-auto md:ml-44 md:mt-10 mb-4 md:mb-0 relative md:rounded-sm z-10">
        <ScrollReveal move="left" delay="300" duration="1000">
          <Image
            src={images[0].path}
            width={630}
            height={630}
            alt={images[0].name}
            className="bg-cover rounded-md border-white md:border-4"
          />
        </ScrollReveal>
        <ScrollReveal move="left" delay="500" duration="1000">
          <h2 className="absolute bottom-5 right-7 text-2xl md:text-3xl text-white font-mono font-semibold">
            {images[0].name}
          </h2>
        </ScrollReveal>
      </div>

      {/* Photo 2 */}
      <div className="w-5/6 mx-auto md:w-2/6 md:mr-32 md:ml-auto md:mt-10 mb-4 md:mb-0 relative md:rounded-sm z-10">
        <ScrollReveal move="right" delay="300" duration="1000">
          <Image
            src={images[1].path}
            width={630}
            height={255}
            alt={images[1].name}
            className="bg-cover rounded-md border-white md:border-4"
          />
        </ScrollReveal>
        <ScrollReveal move="right" delay="500" duration="1000">
          <h2 className="absolute bottom-5 right-7 text-2xl md:text-3xl text-white font-mono font-semibold">
            {images[1].name}
          </h2>
        </ScrollReveal>
      </div>

      {/* Photo 3 */}
      <div className="w-5/6 md:w-2/6 mx-auto md:ml-44 md:mt-10 mb-4 md:mb-0 relative md:rounded-sm z-10">
        <ScrollReveal move="left" delay="500" duration="1000">
          <Image
            src={images[2].path}
            width={630}
            height={255}
            alt={images[2].name}
            className="bg-cover rounded-md border-white md:border-4"
          />
        </ScrollReveal>
        <ScrollReveal move="left" delay="800" duration="1000">
          <h2 className="absolute bottom-5 right-7 text-2xl md:text-3xl text-white font-mono font-semibold">
            {images[2].name}
          </h2>
        </ScrollReveal>
      </div>

      {/* Photo 4 */}
      <div className="w-5/6 mx-auto md:w-2/6 md:mr-32 md:ml-auto md:mt-10 mb-4 md:mb-0 relative md:rounded-sm z-10">
        <ScrollReveal move="right" delay="500" duration="1000">
          <Image
            src={images[3].path}
            width={630}
            height={255}
            alt={images[3].name}
            className="bg-cover rounded-md border-white md:border-4"
          />
        </ScrollReveal>
        <ScrollReveal move="right" delay="800" duration="1000">
          <h2 className="absolute bottom-5 right-7 text-2xl md:text-3xl text-white font-mono font-semibold">
            {images[3].name}
          </h2>
        </ScrollReveal>
      </div>
      {/* Photo 5 */}
      <div className="w-5/6 md:w-2/6 mx-auto md:ml-44 md:mt-10 mb-4 md:mb-0 relative md:rounded-sm z-10">
        <ScrollReveal move="left" delay="500" duration="1000">
          <Image
            src={images[4].path}
            width={630}
            height={255}
            alt={images[4].name}
            className="bg-cover rounded-md border-white md:border-4"
          />
        </ScrollReveal>
        <ScrollReveal move="left" delay="800" duration="1000">
          <h2 className="absolute bottom-5 right-7 text-2xl md:text-3xl text-white font-mono font-semibold">
            {images[4].name}
          </h2>
        </ScrollReveal>
      </div>
      {/* Photo 6 */}
      <div className="w-5/6 mx-auto md:w-2/6 md:mr-32 md:ml-auto md:mt-10 mb-4 md:mb-0 relative md:rounded-sm z-10">
        <ScrollReveal move="right" delay="500" duration="1000">
          <Image
            src={images[5].path}
            width={630}
            height={255}
            alt={images[5].name}
            className="bg-cover rounded-md border-white md:border-4"
          />
        </ScrollReveal>
        <ScrollReveal move="right" delay="800" duration="1000">
          <h2 className="absolute bottom-5 right-7 text-2xl md:text-3xl text-white font-mono font-semibold">
            {images[5].name}
          </h2>
        </ScrollReveal>
      </div>
    </>
  );
};

export default AnimationImages;
