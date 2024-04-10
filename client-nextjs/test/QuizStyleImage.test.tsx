import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { getQuizStyleGallery } from "../app/services/QuizStyleImage.service";

describe("Test API response", () => {
  let mock: MockAdapter; // Explicitly declare the type of `mock`

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.restore(); // Reset mock adapter after each test
  });

  it("should return more than 20 images", async () => {
    const expectedCount = 20; // Number of items expected in each response

    // Mock the API call
    mock.onGet(`${process.env.NEXT_PUBLIC_SERVER}/api/style`).reply(200, {
      count: 30, // Total count of images (greater than 20)
      results: Array.from({ length: 30 }, (_, i) => ({
        // Generate mock image data
        _id: i + 1,
        url: `https://example.com/image${i + 1}.png`,
        style: `Style ${i + 1}`,
      })),
    });

    // Call the function that fetches data from the API
    const response = await getQuizStyleGallery({ pageParam: 0 });

    // Assertions
    expect(response).toBeDefined();
    expect(response.length).toBeGreaterThan(expectedCount); // Check if response has more than 20 items
  });
});
