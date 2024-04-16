import React from "react";
import { useEffect, useState } from "react";

const useProductData = (url) => {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from the API when component mounts.
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("HTTP error: Status ${response.status}");
        }

        const data = await response.json();

        setProducts(data);
        setError(null);
      } catch (error) {
        setError(error.message);
        setProducts(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [url]);

  return { products, loading, error };
};

export { useProductData };
