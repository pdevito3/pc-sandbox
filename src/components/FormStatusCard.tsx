import { twMerge } from "tailwind-merge";

type FormStatus = "valid" | "invalid" | "untouched";

interface FormStatusItem {
  title: string;
  status: FormStatus;
}

interface FormStatusCardProps {
  items: FormStatusItem[];
}

export function FormStatusCard({ items }: FormStatusCardProps) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-64 dark:bg-slate-800">
      <h3 className="text-lg font-semibold mb-4">Form Status</h3>
      <ul className="space-y-3">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            <span
              className={twMerge(
                "w-48",
                item.status === "invalid" ? "text-rose-500" : "text-slate-700"
              )}
            >
              {item.title}
            </span>
            {item.status === "invalid" && (
              <svg
                className="w-5 h-5 text-rose-500 ml-4"
                xmlns="http://www.w3.org/2000/svg"
                width={200}
                height={200}
                viewBox="0 0 16 16"
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M8 14.5a6.5 6.5 0 1 0 0-13a6.5 6.5 0 0 0 0 13ZM8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16Zm1-5a1 1 0 1 1-2 0a1 1 0 0 1 2 0Zm-.25-6.25a.75.75 0 0 0-1.5 0v3.5a.75.75 0 0 0 1.5 0v-3.5Z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
