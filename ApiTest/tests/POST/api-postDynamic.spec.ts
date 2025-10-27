//load playwright module
import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

//write test
test("create post API request using dynamic request body", async ({
  request,
}) => {
  const title = faker.book.title();
  const content = faker.book.genre();
  const tags1 = faker.book.series();
  const tags2 = faker.book.series();

  //create post api request
  const apiResponse = await request.post("/posts", {
    data: {
      title: title,
      body: {
        content: content,
        tags: [tags1, tags2],
      },
      userId: 3,
    },
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
