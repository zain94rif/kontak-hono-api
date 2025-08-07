import { describe, it, expect, afterEach, beforeEach } from "bun:test";
import { ContactTest, UserTest } from "./test-utils";
import app from "../src";

describe("POST /api/contacts", () => {
  beforeEach(async () => {
    await ContactTest.deleteAll();
    await UserTest.create();
  });
  afterEach(async () => {
    await ContactTest.deleteAll();
    await UserTest.delete();
  });

  it("should rejected if contact is invalid", async () => {
    const response = await app.request("/api/contacts", {
      method: "post",
      headers: {
        Authorization: "test",
      },
      body: JSON.stringify({
        first_name: "",
      }),
    });

    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.errors).toBeDefined();
  });

  it("should rejected if token is not valid", async () => {
    const response = await app.request("/api/contacts", {
      method: "post",
      headers: {
        Authorization: "salah",
      },
      body: JSON.stringify({
        first_name: "",
      }),
    });

    const body = await response.json();

    expect(response.status).toBe(401);
    expect(body.errors).toBeDefined();
  });

  it("should success if contact is valid", async () => {
    const response = await app.request("/api/contacts", {
      method: "post",
      headers: {
        Authorization: "test",
      },
      body: JSON.stringify({
        first_name: "eko",
      }),
    });

    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.data).toBeDefined();
    expect(body.data.first_name).toBe("eko");
    expect(body.data.last_name).toBeNull();
    expect(body.data.email).toBeNull();
    expect(body.data.phone).toBeNull();
  });

  it("should success if contact is valid (full data)", async () => {
    const response = await app.request("/api/contacts", {
      method: "post",
      headers: {
        Authorization: "test",
      },
      body: JSON.stringify({
        first_name: "eko",
        last_name: "setiawan",
        email: "eko@mail.com",
        phone: "081234",
      }),
    });

    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.data).toBeDefined();
    expect(body.data.first_name).toBe("eko");
    expect(body.data.last_name).toBe("setiawan");
    expect(body.data.email).toBe("eko@mail.com");
    expect(body.data.phone).toBe("081234");
  });
});

describe("GET /api/contacts/:id", () => {
  beforeEach(async () => {
    await ContactTest.deleteAll();
    await UserTest.create();
    await ContactTest.create();
  });
  afterEach(async () => {
    await ContactTest.deleteAll();
    await UserTest.delete();
  });

  it("should get 404 if contact is not found", async () => {
    const contact = await ContactTest.get();

    const response = await app.request("/api/contacts/" + (contact.id + 1), {
      method: "get",
      headers: {
        Authorization: "test",
      },
    });

    const body = await response.json();

    expect(response.status).toBe(404);
    expect(body.errors).toBeDefined();
  });

  it("should success if contact is exists", async () => {
    const contact = await ContactTest.get();

    const response = await app.request("/api/contacts/" + contact.id, {
      method: "get",
      headers: {
        Authorization: "test",
      },
    });

    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.data).toBeDefined();
    expect(body.data.first_name).toBe(contact.first_name);
    expect(body.data.last_name).toBe(contact.last_name);
    expect(body.data.email).toBe(contact.email);
    expect(body.data.phone).toBe(contact.phone);
    expect(body.data.id).toBe(contact.id);
  });
});

describe("PUT /api/contacts/:id", () => {
  beforeEach(async () => {
    await ContactTest.deleteAll();
    await UserTest.create();
    await ContactTest.create();
  });
  afterEach(async () => {
    await ContactTest.deleteAll();
    await UserTest.delete();
  });

  it("should rejected update contact if request is invalid", async () => {
    const contact = await ContactTest.get();

    const response = await app.request("/api/contacts/" + contact.id, {
      method: "put",
      headers: {
        Authorization: "test",
      },
      body: JSON.stringify({
        first_name: "",
      }),
    });

    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.errors).toBeDefined();
  });

  it("should rejected update contact if request is not found", async () => {
    const contact = await ContactTest.get();

    const response = await app.request("/api/contacts/" + (contact.id + 1), {
      method: "put",
      headers: {
        Authorization: "test",
      },
      body: JSON.stringify({
        first_name: "eko",
      }),
    });

    const body = await response.json();

    expect(response.status).toBe(404);
    expect(body.errors).toBeDefined();
  });

  it("should success update contact if request is valid", async () => {
    const contact = await ContactTest.get();

    const response = await app.request("/api/contacts/" + contact.id, {
      method: "put",
      headers: {
        Authorization: "test",
      },
      body: JSON.stringify({
        first_name: "eko",
        last_name: "setiawan",
        email: "eko@mail.com",
        phone: "081234",
      }),
    });

    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.data).toBeDefined();
    expect(body.data.first_name).toBe("eko");
    expect(body.data.last_name).toBe("setiawan");
    expect(body.data.email).toBe("eko@mail.com");
    expect(body.data.phone).toBe("081234");
  });
});

describe("DELETE /api/contacts/:id", () => {
  beforeEach(async () => {
    await ContactTest.deleteAll();
    await UserTest.create();
    await ContactTest.create();
  });
  afterEach(async () => {
    await ContactTest.deleteAll();
    await UserTest.delete();
  });

  it("should rejected if contact id is not found", async () => {
    const contact = await ContactTest.get();

    const response = await app.request("/api/contacts/" + (contact.id + 1), {
      method: "delete",
      headers: {
        Authorization: "test",
      },
    });

    const body = await response.json();

    expect(response.status).toBe(404);
    expect(body.errors).toBeDefined();
  });

  it("should success if contact is exists", async () => {
    const contact = await ContactTest.get();

    const response = await app.request("/api/contacts/" + contact.id, {
      method: "delete",
      headers: {
        Authorization: "test",
      },
    });

    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.data).toBeTrue();
  });
});

describe("GET /api/contacts", () => {
  beforeEach(async () => {
    await ContactTest.deleteAll();
    await UserTest.create();
    await ContactTest.createMany(25);
  });
  afterEach(async () => {
    await ContactTest.deleteAll();
    await UserTest.delete();
  });

  it("should be able to search contact", async () => {
    const response = await app.request("/api/contacts", {
      method: "get",
      headers: {
        Authorization: "test",
      },
    });

    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.data.length).toBe(10);
    expect(body.paging.current_page).toBe(1);
    expect(body.paging.size).toBe(10);
    expect(body.paging.total_page).toBe(3);
  });

  it("should be able to search contact using name", async () => {
    let response = await app.request("/api/contacts?name=ko", {
      method: "get",
      headers: {
        Authorization: "test",
      },
    });

    let body = await response.json();

    expect(response.status).toBe(200);
    expect(body.data.length).toBe(10);
    expect(body.paging.current_page).toBe(1);
    expect(body.paging.size).toBe(10);
    expect(body.paging.total_page).toBe(3);

    response = await app.request("/api/contacts?name=awan", {
      method: "get",
      headers: {
        Authorization: "test",
      },
    });

    body = await response.json();

    expect(response.status).toBe(200);
    expect(body.data.length).toBe(10);
    expect(body.paging.current_page).toBe(1);
    expect(body.paging.size).toBe(10);
    expect(body.paging.total_page).toBe(3);
  });

  it("should be able to search contact using email", async () => {
    const response = await app.request("/api/contacts?email=test", {
      method: "get",
      headers: {
        Authorization: "test",
      },
    });

    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.data.length).toBe(10);
    expect(body.paging.current_page).toBe(1);
    expect(body.paging.size).toBe(10);
    expect(body.paging.total_page).toBe(3);
  });

  it("should be able to search contact using phone", async () => {
    const response = await app.request("/api/contacts?phone=81", {
      method: "get",
      headers: {
        Authorization: "test",
      },
    });

    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.data.length).toBe(10);
    expect(body.paging.current_page).toBe(1);
    expect(body.paging.size).toBe(10);
    expect(body.paging.total_page).toBe(3);
  });

  it("should be able to search without result", async () => {
    let response = await app.request("/api/contacts?name=budi", {
      method: "get",
      headers: {
        Authorization: "test",
      },
    });

    let body = await response.json();

    expect(response.status).toBe(200);
    expect(body.data.length).toBe(0);
    expect(body.paging.current_page).toBe(1);
    expect(body.paging.size).toBe(10);
    expect(body.paging.total_page).toBe(0);

    response = await app.request("/api/contacts?email=gada", {
      method: "get",
      headers: {
        Authorization: "test",
      },
    });

    body = await response.json();

    expect(response.status).toBe(200);
    expect(body.data.length).toBe(0);
    expect(body.paging.current_page).toBe(1);
    expect(body.paging.size).toBe(10);
    expect(body.paging.total_page).toBe(0);

    response = await app.request("/api/contacts?phone=67", {
      method: "get",
      headers: {
        Authorization: "test",
      },
    });

    body = await response.json();

    expect(response.status).toBe(200);
    expect(body.data.length).toBe(0);
    expect(body.paging.current_page).toBe(1);
    expect(body.paging.size).toBe(10);
    expect(body.paging.total_page).toBe(0);
  });

  it("should be able to search with paging", async () => {
    let response = await app.request("/api/contacts?size=5", {
      method: "get",
      headers: {
        Authorization: "test",
      },
    });

    let body = await response.json();

    expect(response.status).toBe(200);
    expect(body.data.length).toBe(5);
    expect(body.paging.current_page).toBe(1);
    expect(body.paging.size).toBe(5);
    expect(body.paging.total_page).toBe(5);

    response = await app.request("/api/contacts?size=5&page=2", {
      method: "get",
      headers: {
        Authorization: "test",
      },
    });

    body = await response.json();

    expect(response.status).toBe(200);
    expect(body.data.length).toBe(5);
    expect(body.paging.current_page).toBe(2);
    expect(body.paging.size).toBe(5);
    expect(body.paging.total_page).toBe(5);

    response = await app.request("/api/contacts?size=5&page=100", {
      method: "get",
      headers: {
        Authorization: "test",
      },
    });

    body = await response.json();

    expect(response.status).toBe(200);
    expect(body.data.length).toBe(0);
    expect(body.paging.current_page).toBe(100);
    expect(body.paging.size).toBe(5);
    expect(body.paging.total_page).toBe(5);
  });
});
