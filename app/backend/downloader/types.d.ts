/**
 * @typeParam ProgressCallback - a callback that inputs a song's ytid and local filename and return void
 */
export type FinishCallback = (args: { ytid: string; filename: string }) => void;

/**
 * @typeParam ProgressCallback - a callback that inputs download info of a song and return void
 */
export type ProgressCallback = (args: {
  ytid: string;
  filename: string;
  total: number;
  downloaded: number;
}) => void;
