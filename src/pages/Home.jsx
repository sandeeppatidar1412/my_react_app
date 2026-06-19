export default function Home() {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <h2 className="text-3xl font-semibold text-slate-900">Welcome</h2>
      <p className="mt-4 max-w-2xl text-slate-600">
        This demo app uses React Router and Tailwind CSS to display user data
        from DummyJSON.
      </p>
      <div className="mt-8 rounded-2xl bg-slate-50 p-6">
        <h3 className="text-xl font-semibold text-slate-900">Routes</h3>
        <ul className="mt-4 space-y-2 text-slate-700">
          <li></li>
          <li>/users</li>
        </ul>
      </div>
    </section>
  );
}
