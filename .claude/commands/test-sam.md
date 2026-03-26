# Test SAM API

Run integration tests for the SAM API library.

## Arguments
- `$ARGUMENTS` - Test suite to run: `entity`, `awards`, `cache`, or `all` (default: all)

## Instructions

Based on the argument, run the appropriate test command:

### Test Suites

| Argument | Command | Description |
|----------|---------|-------------|
| `entity` | `npm run test:sam:entity` | Test entity lookup (CAGE, UEI, company) |
| `awards` | `npm run test:sam:awards` | Test contract awards search |
| `cache` | `npm run test:sam:cache` | Test Supabase caching |
| `all` | `npm run test:sam` | Run all SAM tests |

### Additional Test Commands

| Command | Description |
|---------|-------------|
| `npm run test:unit` | All unit tests (mocked) |
| `npm run test:integration` | All integration tests (real API) |
| `npm run test:api` | API route tests |
| `npm run test:e2e` | Playwright E2E tests |
| `npm run test:all` | Complete test suite |

## Example Usage

```
/test-sam entity
/test-sam cache
/test-sam all
```

## Requirements

For integration tests to run, these environment variables must be set:
- `SAM_API_KEY` - SAM.gov API key
- `SUPABASE_SERVICE_ROLE_KEY` - For caching tests

Tests will skip automatically if credentials are missing.

## Expected Output

```
✓ Entity API - Unit Tests (5 tests)
  ✓ validates CAGE code format
  ✓ transforms raw API response
  ✓ handles missing fields gracefully

✓ Entity API - Integration Tests (4 tests)
  ✓ searches by CAGE code
  ✓ searches by company name
  ✓ returns null for non-existent CAGE
  ✓ respects rate limiting

Test Suites: 2 passed, 2 total
Tests: 9 passed, 9 total
```
