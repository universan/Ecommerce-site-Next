import CategoryCreate from "@/components/category/CategoryCreate";
import CategoryList from "@/components/category/CategoryList";

export default function AdminCategory() {
  return (
    <div className="container mb-5">
      <div className="row">
        <div className="col">
          <p className="lead">Create Category</p>
          <CategoryCreate />
        </div>
      </div>

      <div className="row">
        <div className="col">
          <p className="lead">List of Categories</p>
          <CategoryList />
        </div>
      </div>
    </div>
  );
}
