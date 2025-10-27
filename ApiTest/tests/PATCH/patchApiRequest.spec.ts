//load playwright module
import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { stringFormat } from "../../../utils/common";

import bookingApiRequestjson from "../../../sampleUtils/dynamicAPIRequest.json";
import pathcRequestsBody from "../../../sampleUtils/PatchApiRequestBody.json";
//write test
test("create PATCH API request using playwright", async ({ request }) => {
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

  const bId = postApiResponceBody.userId;
  //validate json api responce
  expect(postApiResponceBody).toHaveProperty("title", title);

  //how to validate nested json object
  expect(postApiResponceBody.body).toHaveProperty("content", content);
  expect(postApiResponceBody.body.tags).toContain(tags1);

  //Get API Call
  console.log("=====================GET RESPONSE=============================");

  const getApiResId = await request.get(`/posts/${bId}`);
  console.log(await getApiResId.json());
  //Validate status
  expect(apiResponse.ok()).toBeTruthy();
  expect(apiResponse.status()).toBe(201);

  //Generate token not required for now but might be useful in future if we are loging into application
  /**
   * Watch video from 1.12.00 for put in detail
   * For Autentication we need post api
   * test-data folder create json file
   * -add token genearted request body [username and password as json]
   * - Now you will get token
   * required(location of json) and assign it to tokenRequestBody
   * const tokenResponce=await request.post(`/auth`,{
   * data:tokenRequestBody})
   * const tokenApiResponce=await tokenRequestBody.json()
   * const tokenNumber=tokenApiResponce.token;
   */
  // for our current put we don't need header
  /*
  await request.put(`/posts/${bId}`, {
    headers: {
      "Content-Type": "application/json",
      Cookie: `token=${tokenNumber}`,
    },
  });
  */
  console.log("=======PATCH API RESPONSE============");
  const patchRespons = await request.put(`/posts/${bId}`, {
    data: pathcRequestsBody,
  });
  const patchResponsebody = await patchRespons.json();
  console.log(patchResponsebody);

  //validate status code
  expect(patchRespons.status()).toBe(200);
});
