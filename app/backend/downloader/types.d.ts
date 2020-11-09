export type FinishCallback = (args: { ytid: string; filepath: string }) => void;

export type ProgressCallback = (args: {
  ytid: string;
  filepath: string;
  total: number;
  downloaded: number;
}) => void;
