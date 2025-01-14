// import Link from "next/link";
// import "./Breadcrumb.scss";
// export default function Breadcrumb({ category, category1, category2 }) {
//   console.log(category);
//   console.log(category2);
//   return (
//     <nav aria-label="breadcrumb">
//       <ol className="breadcrumb">
//         <li className="breadcrumb-item">
//           <Link href="/">Home</Link>
//         </li>
//         {category && (
//           <li className="breadcrumb-item">
//             <Link href={`/category/${category}`}>Category</Link>
//           </li>
//         )}
//         {category && (
//           <li className="breadcrumb-item active" aria-current="page">
//             {category}
//           </li>
//         )}

//         {category1 && (
//           <>
//             <li className="breadcrumb-item active" aria-current="page">
//               <Link href={`/category/${category1}`}>{category1}</Link>
//             </li>
//             <li className="breadcrumb-item active" aria-current="page">
//               {category2}
//             </li>
//           </>
//         )}
//       </ol>
//     </nav>
//   );
// }


