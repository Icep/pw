import { faker } from '@faker-js/faker';

export const teaName = `Breakfast Tea`;
export const newTea = faker.random.word();
export const teaPrice = faker.finance.amount();

export const allTeas = `{ teas { id, name} }`;
export const getTea = (teaName) => `{ teas(name: "${teaName}") {id, name}}`;
export const getTeaId = (teaName) => `{ teas(name: "${teaName}") {id}}`;
export const addTea = (newTea, teaPrice) =>
  `mutation { addTea(
    teaInput: {
        name: "${newTea}",
        description: "Citrus flavour",
        price: ${teaPrice},
        producerId: "60b8bc31956abb0009efb4d0"}) {name price}
    }`;
export const deleteTea = (teaID) => `mutation {deleteTea( id: "${teaID}")}`
