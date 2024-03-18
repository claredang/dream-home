import { render, fireEvent } from "@testing-library/react";
import Explore from "./Explore"; // Assuming Explore component is in the same directory

describe("Explore component", () => {
  test("renders explore links correctly", () => {
    const { getByText, queryAllByLabelText } = render(<Explore />);

    // Check if the landing page title is work
    expect(getByText("How It Works")).toBeInTheDocument();

    // Check if page contain navigation button
    // expect(queryAllByLabelText("Do Quiz Test")).toBeChecked();
    expect(getByText("Link 1")).toBeInTheDocument();
    expect(getByText("Explore")).toBeInTheDocument;
    expect(getByText("Link 2")).toBeInTheDocument();
    // Add more expectations for each link title if there are more links

    // Check if the component renders the description of each link
    expect(getByText("Description 1")).toBeInTheDocument();
    expect(getByText("Description 2")).toBeInTheDocument();
    // Add more expectations for each link description if there are more links
  });

  test("toggles visibility correctly", () => {
    const { getByText, queryByText } = render(<Explore />);

    // Initially, the description of the first link should not be visible
    expect(queryByText("Description 1")).not.toBeInTheDocument();

    // Click on the button to toggle visibility of the description
    fireEvent.click(getByText("Link 1"));

    // Now, the description of the first link should be visible
    expect(getByText("Description 1")).toBeInTheDocument();

    // Click on the button again to hide the description
    fireEvent.click(getByText("Link 1"));

    // Now, the description of the first link should not be visible again
    expect(queryByText("Description 1")).not.toBeInTheDocument();
  });
});
