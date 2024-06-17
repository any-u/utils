import { describe, expect, it } from "vitest"
import { parseJson } from "./json"

describe("parseJson", () => {
  it('should parse a valid JSON string', () => {
    const jsonString = '{"name": "John", "age": 30}';
    const parsedObject = parseJson(jsonString);
    expect(parsedObject).toEqual({ name: 'John', age: 30 });
  });

  it('should return an empty object for an empty string', () => {
    const jsonString = '';
    const parsedObject = parseJson(jsonString);
    expect(parsedObject).toEqual({});
  });

  it('should return an empty object for an invalid JSON string', () => {
    const jsonString = 'invalid json';
    const parsedObject = parseJson(jsonString);
    expect(parsedObject).toEqual({});
  });

  it('should return an empty object for a null value', () => {
    const parsedObject = parseJson(null);
    expect(parsedObject).toEqual({});
  });

  it('should return an empty object for an undefined value', () => {
    const parsedObject = parseJson(undefined);
    expect(parsedObject).toEqual({});
  });

  it('should return an empty object for a non-string value', () => {
    const parsedObject = parseJson(123);
    expect(parsedObject).toEqual({});
  });

  it('should handle JSON parse errors without throwing an exception', () => {
    const jsonString = '{name: "John"}'; // Invalid JSON
    const parsedObject = parseJson(jsonString);
    expect(parsedObject).toEqual({});
  });
})
