import React from "react";

function MainImage({ image, title, text }) {
  console.log(image, title, text);
  return (
    <div
      className={` w-full relative bg-center bg-cover h-[500px] `}
      style={{ backgroundImage: `url(${image})` }}
    >
      <div>
        <div className={`absolute max-w-lg bottom-8 `}>
          <h2 className={` text-white`}>{title}</h2>
          <p className={` text-white text-base`}>{text}</p>
        </div>
      </div>
    </div>
  );
}

export default MainImage;

// <div style={{

// background: `linear-gradient(to bottom, rgba(0,0,0,0)

//     39%, rgba(0,0,0,0)

//     41%, rgba(0,0,0,0.65)

//     100%),

//     url('${props.image}'), #1c1c1c`,

// height : '500px',

// backgroundSize : '100%, cover',

// backgroundPosition:'center, center',

// width:'100%',

// position:'relative'

// }}>
