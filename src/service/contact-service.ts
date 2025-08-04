import { HTTPException } from "hono/http-exception";
import { prismaClient } from "../application/database";
import { User } from "../generated/prisma";
import {
  ContactResponse,
  CreateContactRequest,
  toContactResponse,
} from "../model/contact-model";
import { ContactValidation } from "../validation/contact-validation";

export class ContactService {
  static async create(
    user: User,
    request: CreateContactRequest
  ): Promise<ContactResponse> {
    request = ContactValidation.CREATE.parse(request);

    console.info("ini", user, request);

    const data = {
      ...request,
      ...{ user_id: user.username },
    };

    const contact = await prismaClient.contact.create({
      data,
    });

    return toContactResponse(contact);
  }

  static async get(user: User, contactId: number): Promise<ContactResponse> {
    contactId = ContactValidation.GET.parse(contactId);

    const contact = await prismaClient.contact.findFirst({
      where: {
        id: contactId,
        user_id: user.username,
      },
    });

    if (!contact) {
      throw new HTTPException(404, {
        message: "Contact is not found",
      });
    }

    return toContactResponse(contact);
  }
}
