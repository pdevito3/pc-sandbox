import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/postcase/emrintake")({
  component: PostCaseEmrComponent,
});

function PostCaseEmrComponent() {
  const navigate = useNavigate();
  const handleIdentifierSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    navigate({
      to: "/postcase/addfromemr/$identifier",
      params: { identifier: formData.get("identifier") as string },
    });
  };

  return (
    <div className="p-2">
      <h3>Enter an EMR identifier </h3>
      <form onSubmit={handleIdentifierSubmit} className="mb-4">
        <input
          type="text"
          name="identifier"
          placeholder="Enter EMR identifier"
          className="mr-2 p-2 border rounded"
          required
        />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded">
          Seed Post Case Data
        </button>
      </form>
    </div>
  );
}
