export default function extractJson(raw: any[]): any {
  if (!raw?.[0]) return null;

  // Lấy object dòng đầu tiên
  const row = raw[0];
  // Lấy key đầu tiên của row (thường là 'JSON_F52E2B61...')
  const firstKey = Object.keys(row)[0];
  const jsonStr = row[firstKey];

  return jsonStr ? JSON.parse(jsonStr) : null;
}
