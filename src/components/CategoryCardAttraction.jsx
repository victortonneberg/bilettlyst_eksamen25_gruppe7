import CategoryPage from "./CategoryPage";

export default function CategoryCardAttraction({ category }) {
    return (
      <>
      <img src={category.image} alt={category.name} />
      <h3>{category.name}</h3>
      </>
    );
}


// export default function CategoryCardAttraction({ category }) {
//   return (
//     <>
//       <img src={category.images?.[0]?.url} alt={category.name} />
//       <h3>{category.name}</h3>
//     </>
//   );
// }
