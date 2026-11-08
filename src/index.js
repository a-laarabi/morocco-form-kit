/**
 * MoroccoFormKit: dependency-free form utilities for Morocco.
 *
 * All validation is format-only. It does not establish number allocation,
 * phone ownership, deliverability, or that a postal code exists.
 */

/** Replace Arabic-Indic and Eastern Arabic-Indic numerals with Western digits. */
export function toWesternDigits(value) {
  if (typeof value !== 'string') return '';
  return value.replace(/[\u0660-\u0669\u06f0-\u06f9]/g, (char) => {
    const code = char.charCodeAt(0);
    return String(code >= 0x06f0 ? code - 0x06f0 : code - 0x0660);
  });
}

/**
 * Normalize a Moroccan mobile number to E.164 (+2126... or +2127...).
 * Accepts common formatting separators and local/international notation.
 * @param {string} input
 * @returns {string|null}
 */
export function normalizeMoroccanMobile(input) {
  if (typeof input !== 'string') return null;
  const compact = toWesternDigits(input).trim().replace(/[\s().-]/g, '');
  let national;

  if (/^0[67]\d{8}$/.test(compact)) {
    national = compact.slice(1);
  } else if (/^\+212[67]\d{8}$/.test(compact)) {
    national = compact.slice(4);
  } else if (/^00212[67]\d{8}$/.test(compact)) {
    national = compact.slice(5);
  } else if (/^212[67]\d{8}$/.test(compact)) {
    national = compact.slice(3);
  } else {
    return null;
  }

  return `+212${national}`;
}

/** Format validation only; does not confirm ownership or an active line. */
export function isValidMoroccanMobile(input) {
  return normalizeMoroccanMobile(input) !== null;
}

/**
 * Format validation for a five-digit Moroccan postal code.
 * Does NOT verify that the code is actually assigned to a location.
 */
export function isValidMoroccanPostalCode(input) {
  if (typeof input !== 'string') return false;
  return /^\d{5}$/.test(toWesternDigits(input).trim());
}

export const messages = Object.freeze({
  fr: Object.freeze({
    title: 'Formulaire de démonstration',
    mobileLabel: 'Téléphone mobile',
    postalLabel: 'Code postal',
    submit: 'Vérifier',
    required: 'Ce champ est obligatoire.',
    invalidMobile: 'Saisissez un numéro mobile marocain valide (06 ou 07).',
    invalidPostalCode: 'Saisissez un code postal à 5 chiffres.',
    success: 'Les formats saisis sont valides. Aucune donnée n’a été envoyée.'
  }),
  ar: Object.freeze({
    title: 'نموذج تجريبي',
    mobileLabel: 'رقم الهاتف المحمول',
    postalLabel: 'الرمز البريدي',
    submit: 'تحقق',
    required: 'هذا الحقل مطلوب.',
    invalidMobile: 'يرجى إدخال رقم هاتف محمول مغربي صحيح يبدأ بـ 06 أو 07.',
    invalidPostalCode: 'يرجى إدخال رمز بريدي مكوّن من 5 أرقام.',
    success: 'تنسيق البيانات صحيح. لم يتم إرسال أي بيانات.'
  }),
  darija: Object.freeze({
    title: 'فورمولير للتجربة',
    mobileLabel: 'نمرة التليفون',
    postalLabel: 'الكود البريدي',
    submit: 'تأكد',
    required: 'خاصك تعمر هاد الخانة.',
    invalidMobile: 'دخل نمرة مغربية صحيحة كتبدا بـ 06 ولا 07.',
    invalidPostalCode: 'دخل الكود البريدي فيه 5 ديال الأرقام.',
    success: 'الفورما ديال المعلومات صحيحة. ما تصيفط حتى شي معطى.'
  })
});

/**
 * Read a localized user-facing string. Falls back to French for unknown locale.
 * @param {keyof typeof messages.fr} key
 * @param {'fr'|'ar'|'darija'} [locale='fr']
 * @returns {string}
 */
export function getMessage(key, locale = 'fr') {
  const translations = Object.hasOwn(messages, locale) ? messages[locale] : messages.fr;
  return translations[key] ?? messages.fr[key] ?? String(key);
}
