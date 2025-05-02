import CategoryPage from "./CategoryPage";

export default function CategoryCardAttraction({ segment }) {
    return (
      <>
      <img src={segment.image} alt={segment.name} />
      <h3>{segment.name}</h3>
      </>
    );
}

