// Vitest setup file
import { vi } from 'vitest';

// Mock fetch for unit tests
global.fetch = vi.fn();

// Mock environment variables for testing
process.env.SAM_API_KEY = 'test-api-key';
process.env.SAM_ENTITY_API_KEY = 'test-entity-key';
process.env.SAM_CONTRACT_AWARDS_API_KEY = 'test-awards-key';

// Reset mocks between tests
beforeEach(() => {
  vi.clearAllMocks();
});
