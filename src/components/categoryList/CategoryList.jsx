import React from "react";
import styles from "./categoryList.module.css";
import Link from "next/link";
import Image from "next/image";

const getData = async () => {
  const res = await fetch("http://localhost:3000/api/categories", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  return res.json();
};

const CategoryList = async () => {
  let data;
  try {
    data = await getData();
  } catch (error) {
    console.error("Error fetching categories:", error);
    data = []; // Set data to an empty array if fetching fails
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Popular Categories</h1>
      <div className={styles.categories}>
        {data?.length === 0 ? (
          <p>There was an issue fetching the categories. Please try again later.</p>
        ) : (
          data?.map((item) => (
            <Link
              key={item._id}
              href={`/blog?cat=${item.slug || 'default-category'}`}  // Ensure slug is valid
              className={`${styles.category} ${styles[item.slug]}`}
            >
              {item.img && (
                <Image
                  src={item.img.startsWith('/') ? item.img : `/images/${item.img}`}  // Correct relative path handling
                  alt={item.title}
                  width={32}
                  height={32}
                  className={styles.image}
                />
              )}
              {item.title}
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default CategoryList;
