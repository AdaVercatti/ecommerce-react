import { describe, it, expect, vi, beforeEach } from "vitest";
import PaymentSummary from "./PaymentSummary";
import axios from "axios";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

vi.mock("axios");

describe("PaymentSummary", () => {
  let loadCart;
  let navigate;
  let paymentSummary;

  beforeEach(() => {
    paymentSummary = {
      totalItems: 7,
      productCostCents: 13173,
      shippingCostCents: 499,
      totalCostBeforeTaxCents: 13672,
      taxCents: 1367,
      totalCostCents: 15039,
    };

    loadCart = vi.fn();
    navigate = vi.fn();

    vi.clearAllMocks();
  });

  it("displays payment summary", () => {
    render(
      <MemoryRouter>
        <PaymentSummary
          paymentSummary={paymentSummary}
          navigate={navigate}
          loadCart={loadCart}
        />
      </MemoryRouter>
    );

    expect(screen.getByText("$131.73")).toBeInTheDocument();
    expect(screen.getByText("$4.99")).toBeInTheDocument();
    expect(screen.getByText("$136.72")).toBeInTheDocument();
    expect(screen.getByText("$13.67")).toBeInTheDocument();
    expect(screen.getByText("$150.39")).toBeInTheDocument();
  });

  it("checks place order button", async () => {
    axios.post.mockResolvedValue({ data: {} });
    loadCart.mockResolvedValue();

    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <PaymentSummary
          paymentSummary={paymentSummary}
          navigate={navigate}
          loadCart={loadCart}
        />
      </MemoryRouter>
    );

    const placeYourOrderButton = screen.getByTestId(
      "place-your-order-button"
    );

    await user.click(placeYourOrderButton);

    expect(axios.post).toHaveBeenCalledWith("/api/orders");
    expect(loadCart).toHaveBeenCalledTimes(1);
    expect(navigate).toHaveBeenCalledWith("/orders");
  });
});