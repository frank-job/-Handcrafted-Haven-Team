import Image from 'next/image';

export default function Hero() {
  return (
  <div className="max-w-7xl mx-auto px-4 py-8">
  <div className="flex flex-col lg:flex-row gap-4">

    {/* Left Card */}
   <div className="relative w-full lg:flex-[2] h-72 lg:h-[450px] rounded-xl overflow-hidden md:p-4">
  <Image
    src="/images/hero-003.webp"
    alt="Birthday"
    className="absolute inset-0 w-full h-full object-cover"
    width={500}
    height={500}
  />

  {/* gradient overlay — sits above the image, below the text */}
  <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />

  <div className="absolute bottom-6 left-6 text-white">
        <h2 className="text-xl lg:text-2xl font-bold">
          Handcraft with Love
        </h2>
        <p>Discover unique, handcrafted items made by talented artisans from around the world.</p>
      </div>
</div>

    {/* Right Card */}
    <div className="relative w-full lg:flex-1 h-72 lg:h-[450px] rounded-xl overflow-hidden">
      <Image
        src="/images/hero-001.jpg"
        alt="Ring"
        className="absolute inset-0 w-full h-full object-cover"
        width={500}
        height={500}
      />

      {/* gradient overlay — sits above the image, below the text */}
  <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />

      <div className="absolute bottom-6 left-6 text-white">
        <h2 className="text-xl lg:text-2xl font-bold">
          Every Detail, Made by Hand
        </h2>
        <p>Handcrafted by Artisans</p>
      </div>
    </div>

  </div>
</div>
  )
}
