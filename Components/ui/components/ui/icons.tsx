import { LucideProps } from "lucide-react";

export const Icons = {
  logo: (props: LucideProps) => (
    <svg
      {...props}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="100%" height="100%" fill="#8B5CF6" rx="4" />
      <path
        d="M16 8C12.6863 8 10 10.6863 10 14C10 17.3137 12.6863 20 16 20C19.3137 20 22 17.3137 22 14C22 10.6863 19.3137 8 16 8ZM16 18C13.7909 18 12 16.2091 12 14C12 11.7909 13.7909 10 16 10C18.2091 10 20 11.7909 20 14C20 16.2091 18.2091 18 16 18Z"
        fill="white"
      />
    </svg>
  ),
  close: (props: LucideProps) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  ),
  externalLink: (props: LucideProps) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13 5h6m0 0v6m0-6L10 16m-4 0h4m-4 0v4m0-4l4-4"
      />
    </svg>
  ),
};
