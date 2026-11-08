import test from 'node:test';
import assert from 'node:assert/strict';
import {
  toWesternDigits,
  normalizeMoroccanMobile,
  isValidMoroccanMobile,
  isValidMoroccanPostalCode,
  getMessage
} from '../src/index.js';

test('converts Arabic-Indic and Eastern Arabic-Indic digits', () => {
  assert.equal(toWesternDigits('٠٦١٢۳۴۵۶۷۸'), '0612345678');
  assert.equal(toWesternDigits('0600000000'), '0600000000');
});

test('normalizes local and international Moroccan mobile number formats', () => {
  assert.equal(normalizeMoroccanMobile('06 12 34 56 78'), '+212612345678');
  assert.equal(normalizeMoroccanMobile('0712-345-678'), '+212712345678');
  assert.equal(normalizeMoroccanMobile('+212 6 12 34 56 78'), '+212612345678');
  assert.equal(normalizeMoroccanMobile('00212 712345678'), '+212712345678');
  assert.equal(normalizeMoroccanMobile('212612345678'), '+212612345678');
  assert.equal(normalizeMoroccanMobile('٠٦١٢٣٤٥٦٧٨'), '+212612345678');
});

test('rejects invalid mobile formats without making network claims', () => {
  for (const invalid of ['0512345678', '061234567', '06123456789', '+213612345678', 'hello', '', '+2120612345678', '06/12345678']) {
    assert.equal(normalizeMoroccanMobile(invalid), null);
    assert.equal(isValidMoroccanMobile(invalid), false);
  }
  assert.equal(isValidMoroccanMobile('0612345678'), true);
});

test('validates five-digit postal code format, including Arabic numerals', () => {
  assert.equal(isValidMoroccanPostalCode('40000'), true);
  assert.equal(isValidMoroccanPostalCode('٤٠٠٠٠'), true);
  assert.equal(isValidMoroccanPostalCode(' 40000 '), true);
  assert.equal(isValidMoroccanPostalCode('4000'), false);
  assert.equal(isValidMoroccanPostalCode('40 000'), false);
  assert.equal(isValidMoroccanPostalCode('ABCDE'), false);
});

test('provides localized messages and a French fallback', () => {
  assert.match(getMessage('invalidMobile', 'ar'), /06/);
  assert.match(getMessage('required', 'darija'), /خاصك/);
  assert.equal(getMessage('required', 'not-a-locale'), getMessage('required', 'fr'));
  assert.equal(getMessage('unknownKey', 'fr'), 'unknownKey');
});
