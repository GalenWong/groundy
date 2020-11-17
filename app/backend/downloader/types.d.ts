export type FinishCallback = (args: { ytid: string; filename: string }) => void;

export type ProgressCallback = (args: {
  ytid: string;
  filename: string;
  total: number;
  downloaded: number;
}) => void;
