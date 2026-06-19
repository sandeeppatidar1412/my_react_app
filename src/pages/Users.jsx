import { useEffect, useMemo, useState } from "react";
import axios from "axios";

const ITEMS_PER_PAGE = 8;
const DISCOUNT_RATE = 0.1;
const GST_RATE = 0.18;

function Users() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortField, setSortField] = useState("title");
  const [sortDirection, setSortDirection] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Unable to fetch products.",
        );
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const categories = useMemo(() => {
    const unique = new Set(products.map((product) => product.category));
    return ["all", ...Array.from(unique)];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        const query = searchTerm.trim().toLowerCase();
        const matchesSearch =
          product.title.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query);

        const matchesCategory =
          categoryFilter === "all" || product.category === categoryFilter;

        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        const fieldA = a[sortField];
        const fieldB = b[sortField];

        if (sortField === "price") {
          return sortDirection === "asc" ? fieldA - fieldB : fieldB - fieldA;
        }

        if (typeof fieldA === "string" && typeof fieldB === "string") {
          return sortDirection === "asc"
            ? fieldA.localeCompare(fieldB)
            : fieldB.localeCompare(fieldA);
        }

        return 0;
      });
  }, [products, searchTerm, categoryFilter, sortField, sortDirection]);

  const pageCount = Math.max(
    1,
    Math.ceil(filteredProducts.length / ITEMS_PER_PAGE),
  );

  const currentProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const calculatePriceDetails = (price) => {
    const discount = price * DISCOUNT_RATE;
    const discountedPrice = price - discount;
    const gst = discountedPrice * GST_RATE;
    const total = discountedPrice + gst;

    return {
      discount: discount.toFixed(2),
      gst: gst.toFixed(2),
      total: total.toFixed(2),
    };
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (event) => {
    setCategoryFilter(event.target.value);
    setCurrentPage(1);
  };

  const handleSortFieldChange = (event) => {
    setSortField(event.target.value);
  };

  const handleSortDirectionChange = () => {
    setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="space-y-6">
      <header className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">
              Product catalog
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Search, filter, sort, and page through the public Fake Store API
              products.
            </p>
          </div>

          <div className="grid w-full gap-3 sm:grid-cols-2 lg:w-auto lg:grid-cols-3">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">
                Search
              </span>
              <input
                type="search"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search by title, description, or category"
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">
                Category
              </span>
              <select
                value={categoryFilter}
                onChange={handleCategoryChange}
                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === "all" ? "All categories" : category}
                  </option>
                ))}
              </select>
            </label>
            <div className="flex items-center gap-3">
              <div className="w-full">
                <span className="mb-2 block text-sm font-medium text-slate-700">
                  Sort by
                </span>
                <select
                  value={sortField}
                  onChange={handleSortFieldChange}
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
                >
                  <option value="title">Title</option>
                  <option value="price">Price</option>
                </select>
              </div>
              <button
                type="button"
                onClick={handleSortDirectionChange}
                className="h-12 rounded-2xl border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                {sortDirection === "asc" ? "Asc" : "Desc"}
              </button>
            </div>
          </div>
        </div>
      </header>

      {loading ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-slate-300 bg-slate-50 text-slate-700">
            <svg
              className="h-6 w-6 animate-spin"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                className="opacity-25"
              />
              <path
                d="M4 12a8 8 0 018-8"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                className="opacity-75"
              />
            </svg>
          </div>
          <p className="text-sm font-medium text-slate-700">
            Loading products...
          </p>
        </div>
      ) : error ? (
        <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-center shadow-sm">
          <p className="text-sm font-semibold text-red-700">{error}</p>
          <p className="mt-2 text-sm text-red-600">
            Please refresh the page or try again later.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="px-6 py-4 sm:px-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm text-slate-500">
                    Showing {filteredProducts.length} products, page{" "}
                    {currentPage} of {pageCount}
                  </p>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200 text-left text-sm text-slate-700">
                <thead className="bg-slate-50 text-slate-600">
                  <tr>
                    <th className="px-4 py-3 font-medium">Product</th>
                    <th className="px-4 py-3 font-medium">Category</th>
                    <th className="px-4 py-3 font-medium">Price</th>
                    <th className="px-4 py-3 font-medium">Discount</th>
                    <th className="px-4 py-3 font-medium">GST</th>
                    <th className="px-4 py-3 font-medium">Total</th>
                    <th className="px-4 py-3 font-medium">Rating</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {currentProducts.map((product) => {
                    const { discount, gst, total } = calculatePriceDetails(
                      product.price,
                    );
                    return (
                      <tr key={product.id} className="hover:bg-slate-50">
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-4">
                            <img
                              src={product.image}
                              alt={product.title}
                              className="h-16 w-16 rounded-xl object-cover"
                            />
                            <div className="min-w-0">
                              <p className="truncate font-semibold text-slate-900">
                                {product.title}
                              </p>
                              <p className="mt-1 text-xs text-slate-500 line-clamp-2">
                                {product.description}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 capitalize text-slate-700">
                          {product.category}
                        </td>
                        <td className="px-4 py-4 text-slate-900">
                          ${product.price.toFixed(2)}
                        </td>
                        <td className="px-4 py-4 text-slate-700">
                          ${discount}
                        </td>
                        <td className="px-4 py-4 text-slate-700">${gst}</td>
                        <td className="px-4 py-4 text-slate-900">${total}</td>
                        <td className="px-4 py-4">
                          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                            {product.rating?.rate ?? "0.0"}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-2 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
              className="rounded-2xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Previous
            </button>
            {Array.from({ length: pageCount }, (_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handlePageChange(index + 1)}
                className={`rounded-2xl px-4 py-2 text-sm font-semibold transition ${
                  currentPage === index + 1
                    ? "bg-slate-900 text-white"
                    : "bg-white text-slate-700 hover:bg-slate-50"
                }`}
              >
                {index + 1}
              </button>
            ))}
            <button
              type="button"
              disabled={currentPage === pageCount}
              onClick={() => handlePageChange(currentPage + 1)}
              className="rounded-2xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
            </button>
          </nav>
        </div>
      )}
    </div>
  );
}

export default Users;
