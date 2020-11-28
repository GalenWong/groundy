import Database from '../database/index';

export default async (ytid: string): Promise<void> => {
  const db = Database.getExistingInstance();
  await db.deleteSong(ytid);
};
