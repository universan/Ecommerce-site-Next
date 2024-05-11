"use client";
import { createContext, useState, useContext } from "react";
import toast from "react-hot-toast";

export const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  // to create a category
  const [name, setName] = useState("");
  // for fetching all categories
  const [categories, setCategories] = useState([]);
  // for update and delete
  const [updatingCategory, setUpdatingCategory] = useState(null);

  const createCategory = async () => {
    try {
      const response = await fetch(`${process.env.API}/admin/category`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      const data = await response.json();

      if (!response.ok) {
        // console.log("data.err", data);
        toast.error(data);
      } else {
        toast.success("Category created");
        setName("");
        setCategories([data, ...categories]);
      }
    } catch (err) {
      console.log(err);
      toast.error("An error occurred. Try again");
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${process.env.API}/admin/category`);
      const data = await response.json();

      if (!response.ok) {
        toast.error(data);
      } else {
        setCategories(data);
      }
    } catch (err) {
      console.log(err);
      toast.error("An error occurred. Try again");
    }
  };

  const fetchCategoriesPublic = async () => {
    try {
      const response = await fetch(`${process.env.API}/categories`);
      const data = await response.json();

      if (!response.ok) {
        toast.error(data);
      } else {
        setCategories(data);
      }
    } catch (err) {
      console.log(err);
      toast.error("An error occurred. Try again");
    }
  };

  const updateCategory = async () => {
    try {
      const response = await fetch(
        `${process.env.API}/admin/category/${updatingCategory?._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatingCategory),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data);
      } else {
        toast.success("Category updated");
        setUpdatingCategory(null);
        setCategories(
          categories.map((category) =>
            category._id === updatingCategory._id ? data : category
          )
        );
        setUpdatingCategory(null);
      }
    } catch (err) {
      console.log(err);
      toast.error("An error occurred. Try again");
    }
  };

  const deleteCategory = async () => {
    try {
      const response = await fetch(
        `${process.env.API}/admin/category/${updatingCategory?._id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data);
      } else {
        toast.success("Category deleted");
        setCategories(
          categories.filter((category) => category._id !== updatingCategory._id)
        );
        setUpdatingCategory(null);
      }
    } catch (err) {
      console.log(err);
      toast.error("An error occurred. Try again");
    }
  };

  return (
    <CategoryContext.Provider
      value={{
        name,
        setName,
        categories,
        setCategories,
        updatingCategory,
        setUpdatingCategory,
        createCategory,
        fetchCategories,
        fetchCategoriesPublic,
        updateCategory,
        deleteCategory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => useContext(CategoryContext);
