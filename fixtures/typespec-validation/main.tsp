import "@typespec/http";
import "@typespec/openapi";

using Http;
using OpenAPI;

@info(#{
  title: "TypeSpec Validation Test API",
  version: "1.0.0",
})
namespace TypeSpecValidation;

// ── string patterns ─────────────────────────────────────────

model CreateUser {
  // x-size-message (minLength === maxLength → .length())
  @minLength(6)
  @maxLength(6)
  @extension("x-size-message", "Code must be exactly 6 characters")
  code?: string;

  // x-minimum-message / x-maximum-message (separate min/max)
  @minLength(2)
  @maxLength(50)
  @extension("x-minimum-message", "Name must be at least 2 characters")
  @extension("x-maximum-message", "Name must be at most 50 characters")
  name: string;

  // x-error-message on format (email)
  @format("email")
  @extension("x-error-message", "Invalid email address")
  email: string;

  // x-error-message on format (uuid)
  @format("uuid")
  @extension("x-error-message", "Invalid UUID format")
  requestId?: string;

  // x-error-message on format (uri)
  @format("uri")
  @extension("x-error-message", "Invalid URL")
  website?: string;

  // x-pattern-message on regex
  @pattern("^(?=.*[A-Z])(?=.*[0-9]).{8,}$")
  @extension("x-pattern-message", "Password must have uppercase + number, min 8 chars")
  password?: string;

  // x-error-message on base string
  @extension("x-error-message", "Nickname must be a string")
  nickname?: string;

  // x-error-message with arrow function (no args) — Zod v4
  @extension("x-error-message", "()=>\"dynamic validation error\"")
  dynamicField?: string;

  // ── enum patterns ───────────────────────────────────────

  // string enum + x-error-message
  @extension("x-error-message", "Role must be admin, user, or guest")
  role: "admin" | "user" | "guest";

  // single string enum (→ z.literal) + x-error-message
  @extension("x-error-message", "Status must be active")
  status: "active";

  // ── number / integer patterns ───────────────────────────

  // integer + x-minimum-message / x-maximum-message
  @minValue(0)
  @maxValue(150)
  @extension("x-minimum-message", "Age must be >= 0")
  @extension("x-maximum-message", "Age must be <= 150")
  age?: int32;

  // number + x-error-message on base type
  @extension("x-error-message", "Score must be a number")
  score: float64;

  // integer + x-error-message with arrow function (iss arg) — Zod v4
  @minValue(1)
  @maxValue(100)
  @extension("x-error-message", "(iss) => iss.input === undefined ? \"Level is required\" : \"Level must be an integer\"")
  @extension("x-minimum-message", "Level must be >= 1")
  @extension("x-maximum-message", "Level must be <= 100")
  level: int32;

  // number + multipleOf
  @extension("x-error-message", "Rating must be a multiple of 0.5")
  rating?: float64;

  // ── boolean pattern ─────────────────────────────────────

  @extension("x-error-message", "Must be a boolean")
  agreed?: boolean;

  // ── array patterns ──────────────────────────────────────

  // array + x-minimum-message / x-maximum-message (separate)
  @minItems(1)
  @maxItems(10)
  @extension("x-minimum-message", "At least 1 tag required")
  @extension("x-maximum-message", "At most 10 tags allowed")
  tags: string[];

  // array + x-size-message (minItems === maxItems → .length())
  @minItems(2)
  @maxItems(2)
  @extension("x-size-message", "Must have exactly 2 coordinates")
  coordinates?: float64[];

  // array + x-error-message on constructor
  @extension("x-error-message", "Must be an array")
  favoriteNumbers?: int32[];

  // ── null pattern ────────────────────────────────────────

  @extension("x-error-message", "Must be null")
  deletedAt?: null;
}

model User {
  id?: int32;
  name?: string;
  email?: string;
}

// ── const (z.literal) patterns ──────────────────────────────

model CreateProduct {
  type: "product";
  priority: 1;
  enabled?: true;
}

model Product {
  id?: int32;
  type?: string;
}

// ── object constraint patterns ──────────────────────────────
// Note: TypeSpec does not have native @minProperties/@maxProperties decorators.
// These are added via x-* extensions in the OpenAPI YAML directly.

model Settings {
  theme?: string;
  locale?: string;
}

// ── object mismatch test ────────────────────────────────────

model Address {
  @minLength(1)
  @extension("x-minimum-message", "Street is required")
  street: string;

  @minLength(1)
  @extension("x-minimum-message", "City is required")
  city: string;

  @pattern("^[0-9]{3}-[0-9]{4}$")
  @extension("x-pattern-message", "Zip code must be format: 000-0000")
  zip: string;
}

model CreateOrder {
  @minLength(1)
  @maxLength(100)
  @extension("x-minimum-message", "Product name is required")
  @extension("x-maximum-message", "Product name must be at most 100 characters")
  productName: string;

  @minValue(1)
  @extension("x-minimum-message", "Quantity must be >= 1")
  quantity: int32;

  address: Address;
}

model Order {
  id?: int32;
  productName?: string;
  quantity?: int32;
}

// ── routes ──────────────────────────────────────────────────

@route("/users")
interface Users {
  @post create(@body body: CreateUser): {
    @statusCode statusCode: 201;
    @body body: User;
  };
}

@route("/products")
interface Products {
  @post create(@body body: CreateProduct): {
    @statusCode statusCode: 201;
    @body body: Product;
  };
}

@route("/settings")
interface SettingsApi {
  @put update(@body body: Settings): Settings;
}

@route("/orders")
interface Orders {
  @post create(@body body: CreateOrder): {
    @statusCode statusCode: 201;
    @body body: Order;
  };
}
