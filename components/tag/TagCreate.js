"use client";
import { useEffect } from "react";
import { useTag } from "@/context/tag";
import { useCategory } from "@/context/category";
import { useSession } from "next-auth/react";

export default function TagCreate() {
  // context
  const {
    name,
    setName,
    parentCategory,
    setParentCategory,
    updatingTag,
    setUpdatingTag,
    createTag,
    updateTag,
    deleteTag,
  } = useTag();

  const { status } = useSession();

  const { fetchCategories, categories } = useCategory();

  useEffect(() => {
    if (status === "authenticated") {
      console.log("fuck");
      fetchCategories();
    } else {
      console.log("suck");
    }
  }, [status]);

  return (
    <div>
      <input
        type="text"
        value={updatingTag ? updatingTag?.name : name}
        onChange={(e) => {
          if (updatingTag) {
            setUpdatingTag({ ...updatingTag, name: e.target.value });
          } else {
            setName(e.target.value);
          }
        }}
        className="form-control my-2 p-2"
      />
      <div className="form-group mt-4">
        <label>Parent category</label>
        <select
          name="category"
          className="form-control"
          onChange={(e) =>
            updatingTag
              ? setUpdatingTag({
                  ...updatingTag,
                  parentCategory: e.target.value,
                })
              : setParentCategory(e.target.value)
          }
        >
          <option>Select a category</option>
          {categories?.map((c) => (
            <option
              key={c._id}
              value={c._id}
              selected={
                c?._id === updatingTag?.parentCategory ||
                c?._id === parentCategory
              }
            >
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div className="d-flex justify-content-between">
        <button
          className={`btn bg-${updatingTag ? "info" : "primary"} text-light`}
          onClick={(e) => {
            e.preventDefault();
            updatingTag ? updateTag() : createTag();
          }}
        >
          {updatingTag ? "Update" : "Create"}
        </button>

        {updatingTag && (
          <>
            <button
              className="btn bg-danger text-light"
              onClick={(e) => {
                e.preventDefault();
                deleteTag();
              }}
            >
              Delete
            </button>

            <button
              className="btn bg-success text-light"
              onClick={(e) => {
                e.preventDefault();
                setUpdatingTag(null);
              }}
            >
              Clear
            </button>
          </>
        )}
      </div>
    </div>
  );
}
