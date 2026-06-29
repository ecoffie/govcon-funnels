#!/bin/bash
# SEO Health Check for GovCon Giants
# Run: bash scripts/seo-health-check.sh
# Checks all SEO pages return 200, sitemap is valid, JSON-LD is present

SITE="https://govcongiants.com"
PASS=0
FAIL=0
WARN=0

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo "=================================="
echo "  GovCon Giants SEO Health Check"
echo "  $(date '+%Y-%m-%d %H:%M')"
echo "=================================="
echo ""

# --- 1. Check all URLs return 200 ---
echo "1. URL Status Checks"
echo "--------------------"

URLS=(
  "/"
  "/guides"
  "/guides/government-contracting-for-beginners"
  "/guides/sam-gov-registration"
  "/guides/cage-code"
  "/guides/capability-statement"
  "/guides/sba-certifications"
  "/guides/8a-certification"
  "/guides/vosb-certification"
  "/guides/hubzone-certification"
  "/guides/wosb-certification"
  "/guides/finding-government-contracts"
  "/guides/proposal-writing"
  "/guides/subcontracting-and-teaming"
  "/guides/federal-market-research"
  "/guides/gsa-schedule"
  "/guides/ai-government-contracting"
  "/government-contract-help"
  "/glossary"
  "/tools"
  "/consulting"
  "/free-course"
)

# Paths that intentionally redirect (3xx is correct, not a failure) — e.g.
# /free-course 308s to the homepage funnel by design.
REDIRECT_OK=(
  "/free-course"
)

for path in "${URLS[@]}"; do
  status=$(curl -s -o /dev/null -w "%{http_code}" "${SITE}${path}")
  if [ "$status" = "200" ]; then
    echo -e "  ${GREEN}✓${NC} ${path} (${status})"
    ((PASS++))
  elif [[ "$status" =~ ^3[0-9][0-9]$ ]] && [[ " ${REDIRECT_OK[*]} " == *" ${path} "* ]]; then
    echo -e "  ${GREEN}✓${NC} ${path} (${status} redirect — expected)"
    ((PASS++))
  else
    echo -e "  ${RED}✗${NC} ${path} (${status})"
    ((FAIL++))
  fi
done

echo ""

# --- 2. Sitemap Check ---
echo "2. Sitemap Validation"
echo "---------------------"

sitemap_status=$(curl -s -o /dev/null -w "%{http_code}" "${SITE}/sitemap.xml")
if [ "$sitemap_status" = "200" ]; then
  echo -e "  ${GREEN}✓${NC} /sitemap.xml accessible (${sitemap_status})"
  ((PASS++))

  # Count URLs in sitemap
  sitemap_content=$(curl -s "${SITE}/sitemap.xml")
  url_count=$(echo "$sitemap_content" | grep -c "<loc>")
  echo "  URLs in sitemap: ${url_count}"

  # Check for key new URLs in sitemap
  NEW_SLUGS=("cage-code" "vosb-certification" "hubzone-certification" "8a-certification" "wosb-certification" "gsa-schedule" "ai-government-contracting" "government-contract-help" "glossary")

  for slug in "${NEW_SLUGS[@]}"; do
    if echo "$sitemap_content" | grep -q "$slug"; then
      echo -e "  ${GREEN}✓${NC} ${slug} in sitemap"
      ((PASS++))
    else
      echo -e "  ${RED}✗${NC} ${slug} MISSING from sitemap"
      ((FAIL++))
    fi
  done
else
  echo -e "  ${RED}✗${NC} /sitemap.xml not accessible (${sitemap_status})"
  ((FAIL++))
fi

echo ""

# --- 3. robots.txt Check ---
echo "3. Robots.txt"
echo "-------------"

robots_status=$(curl -s -o /dev/null -w "%{http_code}" "${SITE}/robots.txt")
if [ "$robots_status" = "200" ]; then
  robots_content=$(curl -s "${SITE}/robots.txt")
  if echo "$robots_content" | grep -qi "sitemap"; then
    echo -e "  ${GREEN}✓${NC} robots.txt accessible with sitemap reference"
    ((PASS++))
  else
    echo -e "  ${YELLOW}!${NC} robots.txt accessible but no sitemap reference"
    ((WARN++))
  fi
else
  echo -e "  ${RED}✗${NC} robots.txt not accessible (${robots_status})"
  ((FAIL++))
fi

echo ""

# --- 4. JSON-LD Spot Checks ---
echo "4. JSON-LD Schema Checks"
echo "------------------------"

check_jsonld() {
  local path=$1
  local expected_type=$2
  local page_content=$(curl -s "${SITE}${path}")

  if echo "$page_content" | grep -q "application/ld+json"; then
    if echo "$page_content" | grep -q "\"@type\":\"${expected_type}\"" || echo "$page_content" | grep -q "\"@type\": \"${expected_type}\""; then
      echo -e "  ${GREEN}✓${NC} ${path} has ${expected_type} schema"
      ((PASS++))
    else
      echo -e "  ${YELLOW}!${NC} ${path} has JSON-LD but ${expected_type} type not found"
      ((WARN++))
    fi
  else
    echo -e "  ${RED}✗${NC} ${path} missing JSON-LD"
    ((FAIL++))
  fi
}

check_jsonld "/guides/cage-code" "Article"
check_jsonld "/guides/cage-code" "FAQPage"
check_jsonld "/government-contract-help" "Service"
check_jsonld "/glossary" "DefinedTermSet"

echo ""

# --- 5. Response Time Check ---
echo "5. Response Time (key pages)"
echo "----------------------------"

check_speed() {
  local path=$1
  local time=$(curl -s -o /dev/null -w "%{time_total}" "${SITE}${path}")
  local ms=$(echo "$time * 1000" | bc 2>/dev/null || echo "$time")

  if (( $(echo "$time < 2.0" | bc -l 2>/dev/null || echo 1) )); then
    echo -e "  ${GREEN}✓${NC} ${path} (${ms}ms)"
    ((PASS++))
  else
    echo -e "  ${YELLOW}!${NC} ${path} (${ms}ms — slow)"
    ((WARN++))
  fi
}

check_speed "/"
check_speed "/guides/cage-code"
check_speed "/glossary"
check_speed "/government-contract-help"

echo ""

# --- Summary ---
echo "=================================="
echo "  RESULTS"
echo "=================================="
echo -e "  ${GREEN}Passed:${NC}  ${PASS}"
echo -e "  ${RED}Failed:${NC}  ${FAIL}"
echo -e "  ${YELLOW}Warnings:${NC} ${WARN}"
echo ""

if [ "$FAIL" -gt 0 ]; then
  echo -e "  ${RED}STATUS: ISSUES FOUND — check failures above${NC}"
  exit 1
else
  echo -e "  ${GREEN}STATUS: ALL CLEAR${NC}"
  exit 0
fi
