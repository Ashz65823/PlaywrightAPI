//load playwright module
import { test, expect } from "@playwright/test";

import bookingApiRequestjson from "../../../sampleUtils/postRequestbody.json";
//write test
test("create GET API request on playwright", async ({ request }) => {
  //create post api request
  const apiResponse = await request.post("/posts", {
    data: bookingApiRequestjson,
  });
  //validate status code

  expect(apiResponse.status()).toBe(201);

  const postApiResponceBody = await apiResponse.json();
  console.log("Responce is", postApiResponceBody);

  const bId = postApiResponceBody.userId;
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

  //Get API Call
  console.log("=====================GET RESPONSE=============================");
  const getApiResId = await request.get(`/posts/${bId}`);
  console.log(await getApiResId.json());
  expect(apiResponse.ok()).toBeTruthy();
  expect(apiResponse.status()).toBe(201);
});
