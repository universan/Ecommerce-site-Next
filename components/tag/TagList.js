"use client";
import { useEffect } from "react";
import { useTag } from "@/context/tag";

export default function TagList() {
  const { tags, fetchTags, setUpdatingTag } = useTag();

  useEffect(() => {
    fetchTags();
  }, []);

  return (
    <>
      {tags?.map((t) => (
        <button className="btn" onClick={() => setUpdatingTag(t)}>
          {t.name}
        </button>
      ))}
    </>
  );
}
