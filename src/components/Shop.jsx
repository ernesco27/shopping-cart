import React, { useContext } from "react";
import { ProductCard } from "./Card";
import { shopContext } from "./App";
import { SkeletonCard } from "./SkeletonCard";

function Shop() {
  const { products } = useContext(shopContext);

  if (products.loading) {
    return (
      <>
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </>
    );
  }

  if (products.error) return <div>Error</div>;

  return (
    <>
      {products.products &&
        products.products.map((product) => (
          <ProductCard
            key={product.id}
            title={product.title}
            description={product.description}
            image={product.image}
            price={product.price}
            rating={product.rating.rate}
          />
        ))}
    </>
  );
}

export { Shop };
