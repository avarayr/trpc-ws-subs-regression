import { api } from "~/utils/api";
import { useState } from "react";

export default function Home() {
  const [randomNumber, setRandomNumber] = useState<number | null>(null);
  api.randomNumber.useSubscription(undefined, {
    onData(data) {
      setRandomNumber(data as number);
    },
  });
  return (
    <>
      <h1>Number is {randomNumber}</h1>
      <h2>
        Server (WAF/NGINX/Your crappy internet?) will close the connection in
        3s, subscription won't resume if regression is present
      </h2>
    </>
  );
}
