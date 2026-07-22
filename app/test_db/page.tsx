import { db } from '@vercel/postgres';

export default async function TestDBPage() {
  let rows;
  let error: Error | null = null;

  try {
    const client = await db.connect();
    const result = await client.sql`SELECT * FROM connection_test`;
    rows = result.rows;
  } catch (e) {
    console.error(e);
    error = e instanceof Error ? e : new Error(String(e));
  }

  if (error) {
    return (
      <main className="min-h-screen bg-red-50 flex items-center justify-center p-10">
        <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-red-500">
          <h1 className="text-xl font-bold text-red-600">Connection Failed</h1>
          <p className="text-gray-500 mt-2">Check your .env.local file and terminal logs.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAF9F6] flex flex-col items-center justify-center p-10">
      <div className="bg-white p-8 rounded-4xl shadow-xl border-t-4 border-[#5F7161] text-center">
        <h1 className="text-2xl font-serif font-bold text-[#5F7161] mb-4">
          Database Connection Test
        </h1>

        <div className="bg-green-50 text-green-700 p-4 rounded-xl font-medium">
          ✅ Successfully connected to Neon!
        </div>

        <div className="mt-6 text-gray-600 italic">
          &ldquo;{rows![0].message}&rdquo;
        </div>
      </div>
    </main>
  );
}
