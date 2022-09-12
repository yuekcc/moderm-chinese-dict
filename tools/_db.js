import Sqlite from 'better-sqlite3';

export const DB = new Sqlite('./data/dict.db');
