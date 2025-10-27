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
  let actualTitle = postApiResponceBody.title;

  //validate json api responce
  expect(postApiResponceBody).toHaveProperty("title", title);

  //how to validate nested json object
  expect(postApiResponceBody.body).toHaveProperty("content", content);
  expect(postApiResponceBody.body.tags).toContain(tags1);

  //Get API Call
  console.log("=====================GET RESPONSE=============================");
  const getApiResId = await request.get(`/posts/`, {
    params: { title: actualTitle }, //this will return data when we pass correct title

    //params: { title: "title" }, //-> will return empty array because this is not having the give title
  });
  console.log("The Title is ", actualTitle);
  console.log(await getApiResId.json());
  expect(apiResponse.ok()).toBeTruthy();
  expect(apiResponse.status()).toBe(201);
});
