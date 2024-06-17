import { describe, expect, it } from "vitest";
import { getUrlParam } from "./url";

describe('getUrlParam', () => {
  it("should return the value of an existing parameter", () => {
    const url = 'https://example.com/?param1=value1&param2=value2'
    expect(getUrlParam('param1', url)).toBe('value1')
    expect(getUrlParam('param2', url)).toBe('value2')
  })

  it('should return an empty string for a non-existing parameter', () => {
    const url = 'https://example.com/?param1=value1&param2=value2'
    expect(getUrlParam('param3', url)).toBe('')
  })

  it('should return an empty string if no parameters are present', () => {
    const url = 'https://example.com/'
    expect(getUrlParam('param1', url)).toBe('')
  })

  it('should handle parameters in the URL hash correctly', () => {
    const url = 'https://example.com/?param1=value1#section2'
    expect(getUrlParam('param1', url)).toBe('value1')
    expect(getUrlParam('param2', url)).toBe('')
  })

  it('should return the value of a parameter with special characters', () => {
    const url = 'https://example.com/?param1=value%201&param2=value%202'
    expect(getUrlParam('param1', url)).toBe('value%201')
    expect(getUrlParam('param2', url)).toBe('value%202')
  })

  it('should return the value of a parameter from the current URL if no URL is provided', () => {
    const mockWindow = {
      location: {
        href: 'https://example.com/?param1=value1'
      }
    };
    (global as any).window = mockWindow;
    (global as any).location = mockWindow.location;
    // Mock the location.href value
    const originalLocation = window.location
    delete (window as any).location
    window.location = { href: 'https://example.com/?param1=value1' } as any

    expect(getUrlParam('param1')).toBe('value1')
    expect(getUrlParam('param2')).toBe('')

    // Restore the original location object
    window.location = originalLocation
  })
})