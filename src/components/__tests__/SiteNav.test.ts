// @vitest-environment jsdom

import React from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import SiteNav from '@/components/SiteNav';
import { MINDY_DAY_SHORT_DATE } from '@/lib/mindy-day';

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

afterEach(cleanup);

describe('SiteNav', () => {
  it('shows the current Mindy Day date in the mobile menu', () => {
    render(React.createElement(SiteNav));

    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[buttons.length - 1]);

    expect(screen.getByText(`Mindy Day — ${MINDY_DAY_SHORT_DATE}`)).toBeTruthy();
    expect(screen.queryByText('Mindy Day — July 25')).toBeNull();
  });
});
