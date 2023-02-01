import * as teaRequest from '../requests/tea-requests';
import { test, expect } from '@playwright/test';

test.describe('Test suite to check recod deletion', () => {
  const newTeaName = 'New tea to delete';
  let teaId;

  test('should add tea and delete tea', async ({ request }) => {
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

    const responseGetId = await request.post('/', {
      data: {
        query: teaRequest.getTeaId(newTeaName),
      },
    });
    expect(responseGetId.ok()).toBeTruthy();
    const text = JSON.parse(await responseGetId.text());
    teaId = text.data.teas;

    const responseDelete = await request.post('/', {
      data: {
        query: teaRequest.deleteTea(teaId[0].id),
      },
    });
    expect(responseDelete.ok()).toBeTruthy();
    expect(await responseDelete.text()).toContain('"deleteTea":true');
  });
  
  test('should not delete with wrong ID', async ({ request }) => {
    const teaID = `456`;
    const response = await request.post('/', {
      data: {
        query: teaRequest.deleteTea(teaID),
      },
    });
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    expect(await response.text()).toContain(
      'Cast to ObjectId failed for value'
    );
  });

  test.skip('should delete all teas with specified name', async ({
    request,
  }) => {
    const teaName = `Ahmad`;
    const response = await request.post('/', {
      data: {
        query: teaRequest.getTeaId(teaName),
      },
    });
    const text = JSON.parse(await response.text());
    console.log(
      'id text ' + JSON.stringify(text) + 'typeof text ' + typeof text
    );
    let value = text.data.teas;
    console.log('value ' + JSON.stringify(value));
    value.forEach(async (element) => {      
      console.log('element ' + JSON.stringify(element.id));
      const responseDelete = await request.post('/', {
        data: {
          query: teaRequest.deleteTea(element.id),
        },
      });
      console.log("response delete " + await responseDelete.text())
      console.log(`text => ${await responseDelete.text()}`);
      expect(await response.text()).toContain('"deleteTea":true');
    });
    expect(response.ok()).toBeTruthy();
  });
});
