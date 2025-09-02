import { describe, it, expect, afterEach, beforeEach } from "bun:test";
import { AddressTest, ContactTest, UserTest } from "./test-utils";
import app from "../src";

describe("POST /api/contacts/:id/addresses", () => {
  beforeEach(async () => {
    await AddressTest.deleteAll();
    await ContactTest.deleteAll();
    await UserTest.delete();

    await UserTest.create();
    await ContactTest.create();
  });
  afterEach(async () => {
    await AddressTest.deleteAll();
    await ContactTest.deleteAll();
    await UserTest.delete();
  });

  it("should rejected if request is not valid", async () => {
    const contact = await ContactTest.get();
    const response = await app.request(
      "/api/contacts/" + contact.id + "/addresses",
      {
        method: "post",
        headers: {
          Authorization: "test",
        },
        body: JSON.stringify({
          country: "",
          postal_code: "",
        }),
      },
    );

    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.errors).toBeDefined();
  });

  it("should rejected if request is not found", async () => {
    const contact = await ContactTest.get();
    const response = await app.request(
      "/api/contacts/" + (contact.id + 1) + "/addresses",
      {
        method: "post",
        headers: {
          Authorization: "test",
        },
        body: JSON.stringify({
          country: "Indonesia",
          postal_code: "6789",
        }),
      },
    );

    const body = await response.json();

    expect(response.status).toBe(404);
    expect(body.errors).toBeDefined();
  });

  it("should success if request is valid", async () => {
    const contact = await ContactTest.get();
    const response = await app.request(
      "/api/contacts/" + contact.id + "/addresses",
      {
        method: "post",
        headers: {
          Authorization: "test",
        },
        body: JSON.stringify({
          street: "jalan",
          city: "kota",
          province: "provinsi",
          country: "Indonesia",
          postal_code: "6789",
        }),
      },
    );

    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.data).toBeDefined();
    expect(body.data.id).toBeDefined();
    expect(body.data.street).toBe("jalan");
    expect(body.data.city).toBe("kota");
    expect(body.data.province).toBe("provinsi");
    expect(body.data.country).toBe("Indonesia");
    expect(body.data.postal_code).toBe("6789");
  });
});

describe("POST /api/contacts/:contact_id/addresses/:address_id", () => {
  beforeEach(async () => {
    await AddressTest.deleteAll();
    await ContactTest.deleteAll();
    await UserTest.delete();

    await UserTest.create();
    await ContactTest.create();
    await AddressTest.create();
  });
  afterEach(async () => {
    await AddressTest.deleteAll();
    await ContactTest.deleteAll();
    await UserTest.delete();
  });

  it("should rejected if address is not found", async () => {
    const contact = await ContactTest.get();
    const address = await AddressTest.get();

    const response = await app.request(
      "/api/contacts/" + contact.id + "/addresses/" + (address.id + 1),
      {
        method: "get",
        headers: {
          Authorization: "test",
        },
      },
    );

    const body = await response.json();

    expect(response.status).toBe(404);
    expect(body.errors).toBeDefined();
  });

  it("should success if address is exists", async () => {
    const contact = await ContactTest.get();
    const address = await AddressTest.get();

    const response = await app.request(
      "/api/contacts/" + contact.id + "/addresses/" + address.id,
      {
        method: "get",
        headers: {
          Authorization: "test",
        },
      },
    );

    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.data).toBeDefined();
    expect(body.data.id).toBeDefined();
    expect(body.data.street).toBe(address.street);
    expect(body.data.city).toBe(address.city);
    expect(body.data.province).toBe(address.province);
    expect(body.data.country).toBe(address.country);
    expect(body.data.postal_code).toBe(address.postal_code);
  });
});

describe("PUT /api/contacts/:contact_id/addresses/:address_id", () => {
  beforeEach(async () => {
    await AddressTest.deleteAll();
    await ContactTest.deleteAll();
    await UserTest.delete();

    await UserTest.create();
    await ContactTest.create();
    await AddressTest.create();
  });
  afterEach(async () => {
    await AddressTest.deleteAll();
    await ContactTest.deleteAll();
    await UserTest.delete();
  });

  it("should rejected if request is invalid", async () => {
    const contact = await ContactTest.get();
    const address = await AddressTest.get();

    const response = await app.request(
      "/api/contacts/" + contact.id + "/addresses/" + address.id,
      {
        method: "put",
        headers: {
          Authorization: "test",
        },
        body: JSON.stringify({
          street: "",
          city: "",
          province: "",
          country: "",
          postal_code: "",
        }),
      },
    );

    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.errors).toBeDefined();
  });

  it("should rejected if address is not found", async () => {
    const contact = await ContactTest.get();
    const address = await AddressTest.get();

    const response = await app.request(
      "/api/contacts/" + contact.id + "/addresses/" + (address.id + 1),
      {
        method: "put",
        headers: {
          Authorization: "test",
        },
        body: JSON.stringify({
          street: "jalan",
          city: "kota",
          province: "provinsi",
          country: "Indonesia",
          postal_code: "6789",
        }),
      },
    );

    const body = await response.json();

    expect(response.status).toBe(404);
    expect(body.errors).toBeDefined();
  });

  it("should success if request is valid", async () => {
    const contact = await ContactTest.get();
    const address = await AddressTest.get();

    const response = await app.request(
      "/api/contacts/" + contact.id + "/addresses/" + address.id,
      {
        method: "put",
        headers: {
          Authorization: "test",
        },
        body: JSON.stringify({
          street: "jalan",
          city: "kota",
          province: "provinsi",
          country: "Indonesia",
          postal_code: "6789",
        }),
      },
    );

    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.data).toBeDefined();
    expect(body.data.id).toBeDefined();
    expect(body.data.street).toBe(address.street);
    expect(body.data.city).toBe(address.city);
    expect(body.data.province).toBe(address.province);
    expect(body.data.country).toBe(address.country);
    expect(body.data.postal_code).toBe(address.postal_code);
  });
});

describe("DELETE /api/contacts/:contact_id/addresses/:address_id", () => {
  beforeEach(async () => {
    await AddressTest.deleteAll();
    await ContactTest.deleteAll();
    await UserTest.delete();

    await UserTest.create();
    await ContactTest.create();
    await AddressTest.create();
  });
  afterEach(async () => {
    await AddressTest.deleteAll();
    await ContactTest.deleteAll();
    await UserTest.delete();
  });

  it("should rejected if address is not exists", async () => {
    const contact = await ContactTest.get();
    const address = await AddressTest.get();

    const response = await app.request(
      "/api/contacts/" + contact.id + "/addresses/" + (address.id + 1),
      {
        method: "delete",
        headers: {
          Authorization: "test",
        },
      },
    );

    const body = await response.json();

    expect(response.status).toBe(404);
    expect(body.errors).toBeDefined();
  });

  it("should success if address is exists", async () => {
    const contact = await ContactTest.get();
    const address = await AddressTest.get();

    const response = await app.request(
      "/api/contacts/" + contact.id + "/addresses/" + address.id,
      {
        method: "delete",
        headers: {
          Authorization: "test",
        },
      },
    );

    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.data).toBeDefined();
    expect(body.data).toBeTrue();
  });
});

describe("LIST /api/contacts/:contact_id/addresses", () => {
  beforeEach(async () => {
    await AddressTest.deleteAll();
    await ContactTest.deleteAll();
    await UserTest.delete();

    await UserTest.create();
    await ContactTest.create();
    await AddressTest.create();
  });
  afterEach(async () => {
    await AddressTest.deleteAll();
    await ContactTest.deleteAll();
    await UserTest.delete();
  });

  it("should rejected if contact is is not found", async () => {
    const contact = await ContactTest.get();
    const response = await app.request(
      "/api/contacts/" + (contact.id + 1) + "/addresses",
      {
        method: "get",
        headers: {
          Authorization: "test",
        },
      },
    );

    const body = await response.json();

    expect(response.status).toBe(404);
    expect(body.errors).toBeDefined();
  });

  it("should success if contact id is exists", async () => {
    const contact = await ContactTest.get();
    const address = await AddressTest.get();
    const response = await app.request(
      "/api/contacts/" + contact.id + "/addresses",
      {
        method: "get",
        headers: {
          Authorization: "test",
        },
      },
    );

    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.data).toBeDefined();
    expect(body.data.length).toBe(1);
    expect(body.data[0].id).toBe(address.id);
    expect(body.data[0].street).toBe(address.street);
    expect(body.data[0].city).toBe(address.city);
    expect(body.data[0].province).toBe(address.province);
    expect(body.data[0].country).toBe(address.country);
    expect(body.data[0].postal_code).toBe(address.postal_code);
  });
});
