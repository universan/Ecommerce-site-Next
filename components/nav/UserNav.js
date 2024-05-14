import Link from "next/link";

export default function UserNav() {
  return (
    <nav className="nav justify-content-center mb-3">
      <Link href="/dashboard/user" className="nav-link">
        Dashboard
      </Link>
      <Link href="/dashboard/user/orders" className="nav-link">
        Orders
      </Link>
    </nav>
  );
}
