import { test } from 'node:test';
import assert from 'node:assert';
import { GetPdfQuerySchema } from './pdf.schema';

test('GetPdfQuerySchema validates valid years', () => {
  const result1 = GetPdfQuerySchema.safeParse({ year: '2026' });
  assert.strictEqual(result1.success, true);
  if (result1.success) {
    assert.strictEqual(result1.data.year, 2026);
  }

  const result2 = GetPdfQuerySchema.safeParse({ year: '2022' });
  assert.strictEqual(result2.success, true);
  if (result2.success) {
    assert.strictEqual(result2.data.year, 2022);
  }

  const result3 = GetPdfQuerySchema.safeParse({ year: '2018' });
  assert.strictEqual(result3.success, true);
  if (result3.success) {
    assert.strictEqual(result3.data.year, 2018);
  }
});

test('GetPdfQuerySchema defaults to 2026 when year is omitted', () => {
  const result = GetPdfQuerySchema.safeParse({});
  assert.strictEqual(result.success, true);
  if (result.success) {
    assert.strictEqual(result.data.year, 2026);
  }
});

test('GetPdfQuerySchema fails on invalid years', () => {
  const result = GetPdfQuerySchema.safeParse({ year: '2030' });
  assert.strictEqual(result.success, false);
});
