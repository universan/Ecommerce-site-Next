import ProductList from "@/components/admin/ProductList";

export default function AdminProductsList() {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <p className="lead">List of products</p>
          <hr />
          <ProductList />
        </div>
      </div>
    </div>
  );
}
