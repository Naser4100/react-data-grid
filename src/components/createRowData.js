import faker from "faker";

function createFakeRow(index) {
  return {
    id: index,
    county: faker.address.county(),
    email: faker.internet.email(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    street: faker.address.streetName(),
    date: faker.date.past().toLocaleDateString(),
    jobTitle: faker.name.jobTitle(),
    jobType: faker.name.jobType()
  };
}

export default function createRowData(count) {
  return [...Array(count).keys()].map(i => createFakeRow(i));
}