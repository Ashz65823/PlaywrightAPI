//load playwright module
import { test, expect } from "@playwright/test";

//write test
test("create post API request using static request body", async ({
  request,
}) => {
  //create post api request
  const apiResponse = await request.post("/posts", {
    data: {
      title: "Learning API Automation",
      body: {
        content: "Nested JSON example",
        tags: ["postman", "testing"],
      },
      userId: 1,
    },
  });
  //validate status code

  expect(apiResponse.status()).toBe(201);

  const postApiResponceBody = await apiResponse.json();
  console.log("Responce is", postApiResponceBody);

  //validate json api responce
  expect(postApiResponceBody).toHaveProperty(
    "title",
    "Learning API Automation"
  );

  //how to validate nested json object
  expect(postApiResponceBody.body).toHaveProperty(
    "content",
    "Nested JSON example"
  );
  expect(postApiResponceBody.body.tags).toContain("postman");
});
