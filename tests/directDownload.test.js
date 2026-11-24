const test = require('node:test');
const assert = require('node:assert');

test('Direct-to-Device Memory & Architecture Rules', async (t) => {
  const { ARCHITECTURE_RULES } = require('../configuration/architecture.config.ts');

  await t.test('All 11 Critical Architecture Requirements are defined and ENFORCED', () => {
    assert.strictEqual(ARCHITECTURE_RULES.length, 11);
    ARCHITECTURE_RULES.forEach((rule, idx) => {
      assert.strictEqual(rule.id, idx + 1);
      assert.strictEqual(rule.verificationStatus, 'ENFORCED');
      assert.ok(rule.title.length > 5);
      assert.ok(rule.enforcementMethod.length > 5);
    });
  });
});
