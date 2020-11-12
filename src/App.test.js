import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import axios from "axios";

jest.mock("axios");

beforeAll(() => {
  axios.post.mockResolvedValue({
    data: {
      message: "Welcome to our site!",
    },
  });
});

test("renders learn react link", () => {
  render(<App />);
  const alreadyHaveAnAccountLink = screen.getByText(
    "Already have an account? Sign in"
  );
  expect(alreadyHaveAnAccountLink).toHaveAttribute("href", "/login");

  const firstNameInput = screen.getByText("First Name");
  const lastNameInput = screen.getByText("Last Name");
  const emailInput = screen.getByText("Email Address");
  const passwordInput = screen.getByText("Password");
  const marketingAgreementInput = screen.getByText(
    "I want to receive inspiration, marketing promotions and updates via email."
  );
  const signUpButton = screen.getByText("Sign Up");

  const firstName = "Stefan";
  const lastName = "Hyltoft";
  const email = "stefanhyltoft@gmail.com";
  const password = "MySecr3tPassw0rd";
  userEvent.type(firstNameInput, firstName);
  userEvent.type(lastNameInput, lastName);
  userEvent.type(emailInput, email);
  userEvent.type(passwordInput, password);
  userEvent.click(marketingAgreementInput);
  userEvent.click(signUpButton);

  expect(axios.post).toHaveBeenCalledTimes(1);
  expect(axios.post).toHaveBeenCalledWith("/api/signup", {
    firstName,
    lastName,
    email,
    password,
  });

  const welcomeText = screen.getByText(
    "Welcome to our site! Please check your email for activation link."
  );
});
