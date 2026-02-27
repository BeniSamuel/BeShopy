import ForMapping from "./ForMapping";

const ForYou = () => {
  return (
    <section className="py-16 px-6 md:px-20 flex flex-col gap-10 items-center bg-white">
      {/* Header */}
      <div className="flex flex-col gap-4 items-center text-center max-w-2xl">
        <h2 className="text-3xl md:text-4xl font-bold text-[#224F34] font-roboto relative inline-block">
          Designer Clothes For You
          <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-[#224F34] to-[#6BC785] rounded-full" />
        </h2>
        <p className="text-[#267D49] text-sm md:text-base font-medium font-poppins">
          Immerse yourself in the world of luxury fashion with carefully curated
          categories tailored to elevate every part of your wardrobe.
        </p>
      </div>

      {/* Cards */}
      <ForMapping />
    </section>
  );
};

export default ForYou;
