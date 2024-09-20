import { Link, Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <div className="p-2 flex gap-6 text-lg">
        <Link
          to="/"
          activeProps={{
            className: "font-bold",
          }}
          activeOptions={{ exact: true }}
        >
          Home
        </Link>{" "}
        <Link
          to="/about"
          activeProps={{
            className: "font-bold",
          }}
        >
          About
        </Link>
        <Link
          to="/postcase"
          activeProps={{
            className: "font-bold",
          }}
          activeOptions={{ exact: true }}
        >
          Post Case
        </Link>
        <Link
          to="/postcase/$patientId/$caseId"
          activeProps={{
            className: "font-bold",
          }}
          params={{
            patientId: "123",
            caseId: "456",
          }}
        >
          Edit A Case
        </Link>
        <Link
          to="/postcase/emrintake"
          activeProps={{
            className: "font-bold",
          }}
        >
          EMR Intake
        </Link>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
}
