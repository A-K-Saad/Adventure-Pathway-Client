import React from "react";

const Stars = ({ rates, setRates }) => {
  const rate = [1, 2, 3, 4, 5];
  return (
    <>
      {rate.map((rate) => {
        return (
          <i
            className={`fas fa-star text-yellow-400 mx-1 cursor-pointer text-xl transition-all star-${rate}`}
            key={rate}
            onMouseOver={() => {
              for (let i = 1; i <= rate; i++) {
                document
                  .querySelector(`.star-${i}`)
                  .classList.add("text-yellow-400");
              }
              for (let i = 5; i > rate; i--) {
                document
                  .querySelector(`.star-${i}`)
                  .classList.remove("text-yellow-400");
              }
            }}
            onClick={() => setRates(rate)}
            onMouseOut={() => {
              for (let i = 1; i <= rates; i++) {
                document
                  .querySelector(`.star-${i}`)
                  .classList.add("text-yellow-400");
              }
              for (let i = 5; i > rates; i--) {
                document
                  .querySelector(`.star-${i}`)
                  .classList.remove("text-yellow-400");
              }
            }}
          ></i>
        );
      })}
    </>
  );
};

export default Stars;
