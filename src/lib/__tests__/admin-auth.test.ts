import { afterEach, describe, expect, it } from "vitest";
import { extractPassword, getAdminPassword, isAuthorized } from "../admin-auth";

const originalPurchasesPassword = process.env.PURCHASES_ADMIN_PASSWORD;
const originalAdminPassword = process.env.ADMIN_PASSWORD;

function resetAdminEnv() {
  delete process.env.PURCHASES_ADMIN_PASSWORD;
  delete process.env.ADMIN_PASSWORD;
}

afterEach(() => {
  if (originalPurchasesPassword === undefined) {
    delete process.env.PURCHASES_ADMIN_PASSWORD;
  } else {
    process.env.PURCHASES_ADMIN_PASSWORD = originalPurchasesPassword;
  }

  if (originalAdminPassword === undefined) {
    delete process.env.ADMIN_PASSWORD;
  } else {
    process.env.ADMIN_PASSWORD = originalAdminPassword;
  }
});

describe("admin auth", () => {
  it("fails closed when no admin password is configured", () => {
    resetAdminEnv();

    expect(getAdminPassword()).toBeNull();
    expect(isAuthorized("galata-assassin-2026")).toBe(false);
  });

  it("authorizes the purchases-specific password when configured", () => {
    resetAdminEnv();
    process.env.PURCHASES_ADMIN_PASSWORD = "purchase-secret";

    expect(getAdminPassword()).toBe("purchase-secret");
    expect(isAuthorized("purchase-secret")).toBe(true);
    expect(isAuthorized("wrong-secret")).toBe(false);
  });

  it("falls back to ADMIN_PASSWORD when the purchases password is unset", () => {
    resetAdminEnv();
    process.env.ADMIN_PASSWORD = "ecosystem-secret";

    expect(getAdminPassword()).toBe("ecosystem-secret");
    expect(isAuthorized("ecosystem-secret")).toBe(true);
  });

  it("extracts API credentials from headers only", () => {
    expect(
      extractPassword({
        headers: new Headers({ "x-admin-password": "header-secret" }),
      }),
    ).toBe("header-secret");

    expect(
      extractPassword({
        headers: new Headers({ authorization: "Bearer bearer-secret" }),
      }),
    ).toBe("bearer-secret");

    expect(
      extractPassword({
        headers: new Headers(),
      }),
    ).toBeNull();
  });
});
