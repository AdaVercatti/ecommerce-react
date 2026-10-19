import HomePage from "./HomePage";
import { expect, it, describe, vi, beforeEach } from "vitest";
import axios from "axios";
import { MemoryRouter } from "react-router";
import { render, screen, within } from "@testing-library/react";


vi.mock("axios");
describe("Home page components", () => {
  let loadCart;
  beforeEach(() => {
    axios.get.mockImplementation(async(urlPath) => {
      if (urlPath === "/api/products") {
        return {
          data: [
            {
              id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
              image: "images/products/athletic-cotton-socks-6-pairs.jpg",
              name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
              rating: {
                stars: 4.5,
                count: 87,
              },
              priceCents: 1090,
              keywords: ["socks", "sports", "apparel"],
            },
            {
              id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
              image: "images/products/intermediate-composite-basketball.jpg",
              name: "Intermediate Size Basketball",
              rating: {
                stars: 4,
                count: 127,
              },
              priceCents: 2095,
              keywords: ["sports", "basketballs"],
            },
          ],
        };
      }
    });
    loadCart = vi.fn();
  });
  it("displays product correct", async  () => {
    render(
      <MemoryRouter>
        <HomePage cart={[]} loadCart={loadCart}></HomePage>
      </MemoryRouter>,
    );
    const productContainers = await screen.findAllByTestId('product-container')

    expect(productContainers.length).toBe(2)
    expect(within(productContainers[0]).getByText("Black and Gray Athletic Cotton Socks - 6 Pairs")).toBeInTheDocument()
    
  });
});
