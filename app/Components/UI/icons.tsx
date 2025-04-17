export const Icons = {
    google: () => (
      <svg className="h-5 w-5" viewBox="0 0 533.5 544.3">
        <path
          fill="#4285F4"
          d="M533.5 278.4c0-17.4-1.4-34.5-4.1-51H272v96.5h146.9c-6.3 33.5-25.3 61.9-54 81l87.2 67.6c51-47 81.4-116.2 81.4-194.1z"
        />
        <path
          fill="#34A853"
          d="M272 544.3c73.2 0 134.6-24.3 179.5-66l-87.2-67.6c-24.2 16.2-55.1 25.7-92.3 25.7-70.8 0-130.7-47.9-152.1-112.2H30.5v70.4C75.4 480.6 166.7 544.3 272 544.3z"
        />
        <path
          fill="#FBBC05"
          d="M119.9 324.2c-10.2-30.6-10.2-63.9 0-94.5V159.3H30.5c-30.6 60.9-30.6 132.2 0 193.1l89.4-68.2z"
        />
        <path
          fill="#EA4335"
          d="M272 107.7c39.8-.6 77.6 13.4 106.6 39.8l79.8-79.8C414.6 24.2 344.5-.1 272 0 166.7 0 75.4 63.7 30.5 159.3l89.4 70.4C141.3 155.6 201.2 107.7 272 107.7z"
        />
      </svg>
    ),
    externalLink: ({ size = 20 }: { size?: number }) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className={`w-${size} h-${size}`}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13.5 4.5H20.25M20.25 4.5v6.75M20.25 4.5L9.75 15.75"
        />
      </svg>
    ),
    close: () => (
      <svg
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    ),
  };
  