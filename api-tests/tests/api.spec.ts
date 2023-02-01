import * as teaRequest from '../requests/tea-requests';
import { test, expect } from '@playwright/test';

test.describe('Test suite', () => {
  test('should to get list of teas', async ({ request }) => {
    const response = await request.post('/', {
      data: {
        query: teaRequest.allTeas,
      },
    });
    expect(response.ok()).toBeTruthy();
    const text = JSON.parse(await response.text());
    const teasList = text.data.teas;
    expect(teasList.length).toBeGreaterThan(0);
  });

  test('should to get Breakfast Tea', async ({ request }) => {
    const teaName = `Breakfast Tea`;
    const response = await request.post('/', {
      data: {
        query: teaRequest.getTea(teaName),
      },
    });
    expect(response.ok()).toBeTruthy();
    const text = JSON.parse(await response.text());
    const teasList = text.data.teas;
    expect(teasList[0].name).toContain('Breakfast Tea');
  });
  
  test('should add new tea to the list', async ({ request }) => {
    const newTeaName = teaRequest.newTea;
    const response = await request.post('/', {
      data: {
        query: teaRequest.addTea(newTeaName, 12),
      },
    });
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    expect(await response.text()).toContain(
      `{\"data\":{\"addTea\":{\"name\":\"${newTeaName}\",\"price\":12}}}`
    );
    expect(await response.text()).not.toContain('"code":500');
  });
});
