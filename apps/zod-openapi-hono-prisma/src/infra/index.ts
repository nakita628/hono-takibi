import { PrismaClient } from "@prisma/client";

// 環境変数DATABASE_URLが設定されていない場合は、NODE_ENVに応じてデフォルト値を使用
const databaseUrl = process.env.DATABASE_URL || (process.env.NODE_ENV === "test"
  ? "file:../prisma/test.db"
  : "file:../prisma/dev.db");

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: databaseUrl
    }
  }
});

export default prisma;