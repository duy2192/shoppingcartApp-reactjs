import { store } from 'app/store';
import { login } from '../services/authSlice';
import { describe, expect, it } from 'vitest';

describe('auth test', () => {
  it('should login success: auth/login/success', async () => {
    const result = await store.dispatch(
      login({
        identifier: 'duyanh',
        password: '123',
      })
    );
    expect(result.type).toBe('auth/login/fulfilled');
  });
  it('should login fail: auth/login/rejected', async () => {
    const result = await store.dispatch(
      login({
        identifier: 'test',
        password: 'test',
      })
    );
    expect(result.type).toBe('auth/login/rejected');
  });
});
