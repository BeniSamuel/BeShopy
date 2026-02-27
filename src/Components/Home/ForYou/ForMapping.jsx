import forYou from "../../../Data/ForYou/ForYou.js";
import ForCard from "./ForYouCard.jsx";

const ForMapping = () => {
  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
        {forYou.map((item, index) => (
          <ForCard
            key={item.id}
            imgSource={item.imgSource}
            title={item.title}
            description={item.description}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default ForMapping;
