import React from "react";

const Row = ({ yellowStars }) => {
  return Array.from({ length: 5 }, (v, i) => i).map((rate) => {
    return (
      <i
        className={`fas fa-star mr-1 ${
          yellowStars >= rate ? "text-yellow-400" : "text-gray-300"
        }`}
        key={rate}
      ></i>
    );
  });
};

const Progress = ({ reviews }) => {
  const avgRate =
    reviews?.map((rate) => rate.rates).reduce((a, b) => a + b, 0) /
      reviews.length || 0;

  return (
    <>
      <div className="flex flex-col md:flex-row items-center md:space-x-12">
        <div>
          <p className="text-3xl text-gray-500 font-bold">
            <span className="text-4xl text-black">{avgRate.toFixed(1)}</span>
            /5
          </p>
          <div>
            <div className="star-outer relative text-xl inline-block">
              <div
                className="star-inner absolute top-0 start-0"
                style={{
                  width: `${avgRate * 20}%`,
                }}
              ></div>
            </div>
            <h1>({reviews.length || 0} Reviews)</h1>
          </div>
        </div>
        <div className="mt-5 md:mt-0 w-full md:w-auto">
          {Array.from({ length: 5 }, (v, i) => i).map((rate, index) => {
            return (
              <div key={rate} className="flex items-center space-x-5">
                <div>
                  <Row yellowStars={index}></Row>
                </div>
                <h1>
                  ( {reviews?.filter((r) => r.rates === index + 1).length || 0}{" "}
                  )
                </h1>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Progress;
