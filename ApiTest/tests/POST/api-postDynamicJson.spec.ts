//load playwright module
import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { stringFormat } from "../../../utils/common";

import bookingApiRequestjson from "../../../sampleUtils/dynamicAPIRequest.json";
//write test
test("create post API request using dynamic json request body", async ({
  request,
}) => {
  const title = faker.book.title();
  const content = faker.book.genre();
  const tags1 = faker.book.series();
  const tags2 = faker.book.series();
  const dynamicdate = stringFormat(
    JSON.stringify(bookingApiRequestjson),
    title,
    content,
    tags1,
    tags2
  );

  //create post api request
  const apiResponse = await request.post("/posts", {
    data: JSON.parse(dynamicdate),
  });
  //validate status code
  expect(apiResponse.ok()).toBeTruthy();
  expect(apiResponse.status()).toBe(201);

  const postApiResponceBody = await apiResponse.json();
  console.log("Responce is", postApiResponceBody);

  //validate json api responce
  expect(postApiResponceBody).toHaveProperty("title", title);

  //how to validate nested json object
  expect(postApiResponceBody.body).toHaveProperty("content", content);
  expect(postApiResponceBody.body.tags).toContain(tags1);
});
