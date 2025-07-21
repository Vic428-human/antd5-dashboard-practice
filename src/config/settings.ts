export const initialSettings = [
  {
    title: "header",
    options: [
      { label: "Show", active: true }, // 已選中
      { label: "Hide", active: false },
    ] as const,
  },
  {
    title: "footer",
    options: [
      { label: "Show", active: false },
      { label: "Hide", active: true }, // 已選中
    ] as const,
  },
];
