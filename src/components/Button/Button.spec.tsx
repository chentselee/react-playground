import { render } from "@testing-library/react";

import Button from "./index";

it("render", () => {
  const { container } = render(<Button />);

  expect(container).toMatchSnapshot();
});
