import { HTTPException } from "hono/http-exception";
import { prismaClient } from "../application/database";
import { Contact, User } from "../generated/prisma";
import {
  ContactResponse,
  CreateContactRequest,
  toContactResponse,
  UpdateContactRequest,
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

    const contact = await this.contactMustExists(user, contactId);

    return toContactResponse(contact);
  }

  static async contactMustExists(
    user: User,
    contactId: number
  ): Promise<Contact> {
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

    return contact;
  }

  static async update(
    user: User,
    request: UpdateContactRequest
  ): Promise<ContactResponse> {
    request = ContactValidation.UPDATE.parse(request);
    await this.contactMustExists(user, request.id);

    const contact = await prismaClient.contact.update({
      where: {
        user_id: user.username,
        id: request.id,
      },
      data: request,
    });

    return toContactResponse(contact);
  }

  static async delete(user: User, contactId: number): Promise<boolean> {
    contactId = ContactValidation.DELETE.parse(contactId);
    await this.contactMustExists(user, contactId);

    await prismaClient.contact.delete({
      where: {
        user_id: user.username,
        id: contactId,
      },
    });

    return true;
  }
}
