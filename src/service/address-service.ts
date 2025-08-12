import { User } from "../generated/prisma";
import {
  AddressResponse,
  CreateAddressRequest,
  GetAddressRequest,
  toAddressResponse,
} from "../model/address-model";
import { AddressValidation } from "../validation/address-validation";
import { ContactService } from "./contact-service";
import { prismaClient } from "../application/database";
import { HTTPException } from "hono/http-exception";

export class AddressService {
  static async create(
    user: User,
    request: CreateAddressRequest,
  ): Promise<AddressResponse> {
    request = AddressValidation.CREATE.parse(request);
    await ContactService.contactMustExists(user, request.contact_id);

    const address = await prismaClient.address.create({
      data: request,
    });

    return toAddressResponse(address);
  }

  static async get(
    user: User,
    request: GetAddressRequest,
  ): Promise<AddressResponse> {
    request = AddressValidation.GET.parse(request);
    await ContactService.contactMustExists(user, request.contact_id);

    const address = await prismaClient.address.findFirst({
      where: {
        contact_id: request.contact_id,
        id: request.id,
      },
    });

    if (!address) {
      throw new HTTPException(404, {
        message: "Address is not found",
      });
    }

    return toAddressResponse(address);
  }
}
