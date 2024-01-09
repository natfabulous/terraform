import { RemixBrowser } from "@remix-run/react";
import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { ReactCalculator } from "simple-react-calculator";
// import { useCalculator } from "react-mac-calculator/dist/hooks";

const hydrate = () => {
  startTransition(() => {
    hydrateRoot(
      document,
      <StrictMode>
        <RemixBrowser />
      </StrictMode>
    );
  });
};

const hydrateCalculator = () => {
  const calculatorDiv = document.getElementsByClassName("calculatorDiv")[0];
  hydrateRoot(calculatorDiv, <ReactCalculator />);
};
if (window.requestIdleCallback) {
  window.requestIdleCallback(hydrate);
  window.requestIdleCallback(hydrateCalculator);
} else {
  // Safari doesn't support requestIdleCallback
  // https://caniuse.com/requestidlecallback
  window.setTimeout(hydrate, 1);
  window.setTimeout(hydrateCalculator, 1);
}
