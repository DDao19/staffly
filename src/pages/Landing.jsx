export default function Landing() {
  return (
    <div className="min-h-screen bg-linear-to-br from-(--primary-light) to-white">
      <section className="py-54 ">
        <div className="max-w-7xl px-5 mx-auto flex flex-col items-center justify-center text-center space-y-4">
          <h1 className="text-5xl font-bold animate-fade-up">
            Employee Management Made Simple
          </h1>
          <div className="max-w-2xl">
            <p className="text-lg text-(--text-secondary) animate-fade-up">
              A simple employee management system built with React that lets you
              manage employee information through a clean and modern interface.
            </p>
          </div>
        </div>
      </section>

      <section className="py-34">
        <div className="max-w-7xl px-5 mx-auto flex flex-col items-center justify-center text-center">
          <h2 className="text-3xl font-bold">Trusted Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            <div className="p-6 min-h-40 bg-(--surface) border border-(--border) rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold">Manage employee records</h3>
              <p className="mt-2 text-(--text-secondary)">
                Create, update, and organize employee information in one place.
              </p>
            </div>
            <div className="p-6 min-h-40 bg-(--surface) border border-(--border) rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold">
                Track salaries and roles
              </h3>
              <p className="mt-2 text-(--text-secondary)">
                Keep employee roles and salary information organized and easily
                accessible.
              </p>
            </div>
            <div className="p-6 min-h-40 bg-(--surface) border border-(--border) rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold">
                Edit employee information
              </h3>
              <p className="mt-2 text-(--text-secondary)">
                Quickly update employee details whenever changes need to be
                made.
              </p>
            </div>
            <div className="p-6 min-h-40 bg-(--surface) border border-(--border) rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold">Secure authentication</h3>
              <p className="mt-2 text-(--text-secondary)">
                Protect employee data with secure user accounts and
                authenticated access.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
