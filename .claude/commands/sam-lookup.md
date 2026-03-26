# SAM Lookup

Look up contractor information from SAM.gov by CAGE code or company name.

## Arguments
- `$ARGUMENTS` - Either a 5-character CAGE code or company name to search

## Instructions

1. Determine if the input is a CAGE code (5 alphanumeric characters) or company name
2. Use the appropriate MCP tool:
   - For CAGE code: `mcp__samgov__search_entities` with `query` parameter
   - For company name: `mcp__samgov__search_entities` with `query` parameter
3. Display results in a table format showing:
   - Company Name
   - CAGE Code
   - UEI
   - City, State
   - Registration Status
   - Certifications (8(a), SDVOSB, WOSB, HUBZone)

## Example Usage

```
/sam-lookup 17038
/sam-lookup "Booz Allen"
```

## Output Format

```
## SAM.gov Lookup Results

| Company | CAGE | UEI | Location | Status | Certifications |
|---------|------|-----|----------|--------|----------------|
| BOOZ ALLEN HAMILTON INC | 17038 | ABC123XYZ | McLean, VA | Active | None |

Found 1 result(s).
```

## Error Handling

- If CAGE code format is invalid (not 5 characters), show format requirements
- If no results found, suggest checking spelling or trying a partial name
- If API rate limited, inform user to try again later
