import { Hono } from "hono";
import { ApplicationVariables } from "../model/app-model";
import { authMiddleware } from "../middleware/auth-middleware";
import { User } from "../generated/prisma";
import { CreateContactRequest } from "../model/contact-model";
import { ContactService } from "../service/contact-service";

export const contactController = new Hono<{
  Variables: ApplicationVariables;
}>();
contactController.use(authMiddleware);

contactController.post("/api/contacts", async (c) => {
  const user = c.get("user") as User;
  const request = (await c.req.json()) as CreateContactRequest;
  const response = await ContactService.create(user, request);

  return c.json({
    data: response,
  });
});

contactController.get("/api/contacts/:id", async (c) => {
  const user = c.get("user") as User;
  const contactId = Number(c.req.param("id"));
  const response = await ContactService.get(user, contactId);

  return c.json({
    data: response,
  });
});
