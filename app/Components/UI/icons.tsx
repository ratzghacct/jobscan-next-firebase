export const Icons = {
  logo: (props: any) => (
    <svg {...props} fill="currentColor" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" />
    </svg>
  ),
  externalLink: (props: any) => (
    <svg {...props} fill="currentColor" viewBox="0 0 24 24">
      <path d="M14 3h7v7h-2V6.41L10.41 15 9 13.59 17.59 5H14V3z"/>
    </svg>
  ),
  close: (props: any) => (
    <svg {...props} fill="currentColor" viewBox="0 0 24 24">
      <path d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}
