import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';

// Initialize the Angular test environment
setupZoneTestEnv();

Object.defineProperty(window, 'CSS', { value: null });
Object.defineProperty(document, 'doctype', { value: '<!DOCTYPE html>' });
Object.defineProperty(window, 'getComputedStyle', {
  value: () => ({
    display: 'none',
    appearance: ['-webkit-appearance'],
  }),
});
