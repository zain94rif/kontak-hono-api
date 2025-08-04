import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { ZodError } from "zod";
import { userController } from "./controller/user-controller";
import { contactController } from "./controller/contact-controller";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.route("/", userController);
app.route("/", contactController);

app.onError(async (err, c) => {
  // console.log(err);
  if (err instanceof HTTPException) {
    c.status(err.status);
    return c.json({ errors: err.message });
  } else if (err instanceof ZodError) {
    c.status(400);
    return c.json({ errors: err.message });
  } else {
    c.status(500);
    return c.json({ errors: err.message });
  }
});

export default app;
