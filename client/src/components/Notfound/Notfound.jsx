import React from "react";
import no_data_img from "../../assets/no_data_img.png";

const Notfound = () => {
  return (
    <div className="h-[86vh] flex items-center justify-center">
      <img src={no_data_img} alt="No data" className="h-full object-contain" />
    </div>
  );
};

export default Notfound;
