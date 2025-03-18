// import { ThemeContext } from "@/context/ThemeContext";
// import Image from "next/image";
// import React, { useContext } from "react";
// import "./Card3.scss"
// import Link from "next/link";

// export default function Card3({ item }) {
//   const { theme } = useContext(ThemeContext);
//   return (
//     <div className=" col-md-6 col-12 mb-3 ">
//       <Link className=" text-decoration-none" href={`/category/${item.catSlug}/${item.slug}`}>

//         <div className="card card3 border-0 shadow-sm">
//           <div className="position-relative">
//             <Image
//               src={item.img || "/fallback-image.jpg" }
//               alt={item.title || "title"}
//               width={350}
//               height={200}
//               className="card-img-top rounded-0"
//               style={{ objectFit: "cover" }}
//             />
//             <span className="position-absolute bottom-0 m-3 badge bg-warning">
//               {item.category}
//             </span>
//           </div>
//           {/* Badge on Image */}
//           <span className="badge bg-primary text-light position-absolute" style={{ top: "165px", left: "10px" }}>
//             {item.category}
//           </span>
//           <div
//             className={`card-body p-0 py-3 px-2 `}
//           >
//             <h5 className="card-title text-truncate-3">{item.title}</h5>
//             <small>December 15, 2017</small>
//           </div>
//         </div>
//       </Link>

//     </div>


//   );
// }

import { ThemeContext } from "@/context/ThemeContext";
import Image from "next/image";
import React, { useContext } from "react";
import "./Card3.scss";
import Link from "next/link";

export default function Card3({ item }) {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="col-md-6 col-12 mb-3">
      <Link className="text-decoration-none" href={`/category/${item.catSlug}/${item.slug}`} passHref>
        <div className="card card3 border-0 shadow-sm">
          <div className="position-relative">
            <Image
              src={item.img || "/fallback-image.jpg"}
              alt={item.title || "title"}
              width={350}
              height={200}
              className="card-img-top rounded-0"
              priority={true}
              style={{ objectFit: "cover" }}
            />
            <span className="position-absolute bottom-0 m-3 badge bg-warning">
              {item.catSlug}
            </span>
          </div>

          {/* Badge on Image */}
          <span className="badge bg-primary text-light position-absolute" style={{ top: "165px", left: "10px" }}>
            {item.catSlug}
          </span>

          <div className="card-body p-0 py-3 px-2">
            <h5 className="card-title text-truncate-3">{item.title}</h5>
            <small>
              {new Date(item.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </small>
          </div>
        </div>
      </Link>
    </div>
  );
}
