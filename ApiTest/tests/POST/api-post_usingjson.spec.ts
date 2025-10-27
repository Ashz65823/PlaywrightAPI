//load playwright module
import { test, expect } from "@playwright/test";

import bookingApiRequestjson from "../../../sampleUtils/postRequestbody.json";
//write test
test("create post API request using static json file", async ({ request }) => {
  //create post api request
  const apiResponse = await request.post("/posts", {
    data: bookingApiRequestjson,
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
