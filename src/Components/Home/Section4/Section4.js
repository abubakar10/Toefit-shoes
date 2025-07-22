// import React from "react";
// import "./Section4.css";
// import Slider from "react-slider";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import shoe1 from "./../../../Assets/images/shoe1.jpg";
// import shoe2 from "./../../../Assets/images/shoe2.jpg";
// import shoe3 from "./../../../Assets/images/shoe3.jpg";

// const Section4 = () => {
  
//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 4,
//     slidesToScroll: 4,
//     autoplay: true,
//     autoplaySpeed: 3000,
//   };
//   return (
//     <div classname="section4">
//   <h1>Trending Products</h1>
//   <ul classname="nav nav-pills mb-3" id="pills-tab" role="tablist">
//     <li classname="nav-item" role="presentation">
//       <button classname="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">
//         MEN
//       </button>
//     </li>
//     <li classname="nav-item" role="presentation">
//       <button classname="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">
//         WOMEN
//       </button>
//     </li>
//     <li classname="nav-item" role="presentation">
//       <button classname="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">
//         Kids
//       </button>
//     </li>
//     <li classname="nav-item" role="presentation">
//       <button classname="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">
//         SALES
//       </button>
//     </li>
//   </ul>
//   <div classname="tab-content" id="pills-tabContent">
//     <div classname="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabIndex={0}>
//       <Slider {...settings}>
//         <div classname="slideshoes">
//           <img src="{shoe1}" alt="Slide 1" />
//           <h4>Men Sneakers</h4>
//           <h4>price $20</h4>
//         </div>
//         <div classname="slideshoes">
//           <img src="{shoe2}" alt="Slide 2" />
//           <h4>Men Sneakers</h4>
//           <h4>price $20</h4>
//         </div>
//         <div classname="slideshoes">
//           <img src="{shoe3}" alt="Slide 3" />
//           <h4>Men Sneakers</h4>
//           <h4>price $20</h4>
//         </div>
//         <div classname="slideshoes">
//           <img src="{shoe1}" alt="Slide 4" />
//           <h4>Men Sneakers</h4>
//           <h4>price $10</h4>
//         </div>
//         <div classname="slideshoes">
//           <img src="{shoe3}" alt="Slide5 " />
//           <h4>Men Sneakers</h4>
//           <h4>price $10</h4>
//         </div>
//         <div classname="slideshoes">
//           <img src="{shoe2}" alt="Slide6 " />
//           <h4>Men Sneakers</h4>
//           <h4>price $24</h4>
//         </div>
//         <div classname="slideshoes">
//           <img src="{shoe1}" alt="Slide7 " />
//           <h4>Men Sneakers</h4>
//           <h4>price $30</h4>
//         </div>
//         <div classname="slideshoes">
//           <img src="{shoe3}" alt="Slide8 " />
//           <h4>Men Sneakers</h4>
//           <h4>price $40</h4>
//         </div>
        
//       </Slider>
//     </div>
//     <div classname="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" tabIndex={0}>
//       <Slider {...settings}>
//         <div classname="slideshoes">
//           <img src="{shoe1}" alt="Slide 1" />
//           <h4>Men Sneakers</h4>
//           <h4>price $20</h4>
//         </div>
//         <div classname="slideshoes">
//           <img src="{shoe2}" alt="Slide 2" />
//           <h4>Men Sneakers</h4>
//           <h4>price $20</h4>
//         </div>
//         <div classname="slideshoes">
//           <img src="{shoe3}" alt="Slide 3" />
//           <h4>Men Sneakers</h4>
//           <h4>price $20</h4>
//         </div>
//         <div classname="slideshoes">
//           <img src="{shoe1}" alt="Slide 4" />
//           <h4>Men Sneakers</h4>
//           <h4>price $10</h4>
//         </div>
//         <div classname="slideshoes">
//           <img src="{shoe3}" alt="Slide5 " />
//           <h4>Men Sneakers</h4>
//           <h4>price $10</h4>
//         </div>
//         <div classname="slideshoes">
//           <img src="{shoe2}" alt="Slide6 " />
//           <h4>Men Sneakers</h4>
//           <h4>price $24</h4>
//         </div>
//         <div classname="slideshoes">
//           <img src="{shoe1}" alt="Slide7 " />
//           <h4>Men Sneakers</h4>
//           <h4>price $30</h4>
//         </div>
//         <div classname="slideshoes">
//           <img src="{shoe3}" alt="Slide8 " />
//           <h4>Men Sneakers</h4>
//           <h4>price $40</h4>
//         </div>
        
//       </Slider>
//     </div>
//     <div classname="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab" tabIndex={0}>
//       <Slider {...settings}>
//         <div classname="slideshoes">
//           <img src="{shoe1}" alt="Slide 1" />
//           <h4>Men Sneakers</h4>
//           <h4>price $20</h4>
//         </div>
//         <div classname="slideshoes">
//           <img src="{shoe2}" alt="Slide 2" />
//           <h4>Men Sneakers</h4>
//           <h4>price $20</h4>
//         </div>
//         <div classname="slideshoes">
//           <img src="{shoe3}" alt="Slide 3" />
//           <h4>Men Sneakers</h4>
//           <h4>price $20</h4>
//         </div>
//         <div classname="slideshoes">
//           <img src="{shoe1}" alt="Slide 4" />
//           <h4>Men Sneakers</h4>
//           <h4>price $10</h4>
//         </div>
//         <div classname="slideshoes">
//           <img src="{shoe3}" alt="Slide5 " />
//           <h4>Men Sneakers</h4>
//           <h4>price $10</h4>
//         </div>
//         <div classname="slideshoes">
//           <img src="{shoe2}" alt="Slide6 " />
//           <h4>Men Sneakers</h4>
//           <h4>price $24</h4>
//         </div>
//         <div classname="slideshoes">
//           <img src="{shoe1}" alt="Slide7 " />
//           <h4>Men Sneakers</h4>
//           <h4>price $30</h4>
//         </div>
//         <div classname="slideshoes">
//           <img src="{shoe3}" alt="Slide8 " />
//           <h4>Men Sneakers</h4>
//           <h4>price $40</h4>
//         </div>
        
//       </Slider>
//     </div>
//     <div classname="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab" tabIndex={0}>
//       <Slider {...settings}>
//         <div classname="slideshoes">
//           <img src="{shoe1}" alt="Slide 1" />
//           <h4>Men Sneakers</h4>
//           <h4>price $20</h4>
//         </div>
//         <div classname="slideshoes">
//           <img src="{shoe2}" alt="Slide 2" />
//           <h4>Men Sneakers</h4>
//           <h4>price $20</h4>
//         </div>
//         <div classname="slideshoes">
//           <img src="{shoe3}" alt="Slide 3" />
//           <h4>Men Sneakers</h4>
//           <h4>price $20</h4>
//         </div>
//         <div classname="slideshoes">
//           <img src="{shoe1}" alt="Slide 4" />
//           <h4>Men Sneakers</h4>
//           <h4>price $10</h4>
//         </div>
//         <div classname="slideshoes">
//           <img src="{shoe3}" alt="Slide5 " />
//           <h4>Men Sneakers</h4>
//           <h4>price $10</h4>
//         </div>
//         <div classname="slideshoes">
//           <img src="{shoe2}" alt="Slide6 " />
//           <h4>Men Sneakers</h4>
//           <h4>price $24</h4>
//         </div>
//         <div classname="slideshoes">
//           <img src="{shoe1}" alt="Slide7 " />
//           <h4>Men Sneakers</h4>
//           <h4>price $30</h4>
//         </div>
//         <div classname="slideshoes">
//           <img src="{shoe3}" alt="Slide8 " />
//           <h4>Men Sneakers</h4>
//           <h4>price $40</h4>
//         </div>
//       </Slider>
//     </div>
//   </div>
// </div>

//   );
// };



// export default Section4;
