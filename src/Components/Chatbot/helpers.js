export const generateUrl = ({
  origin,
  pathName = '', // Initialize to empty string by default
  pathParams = {},
  params = {}
}) => {
  // Combine origin and pathName for the full path template
  const fullPathTemplate = `${origin}${pathName ? `/${pathName}` : ''}`;

  // Replace placeholders in the path
  let populatedPath = fullPathTemplate;
  for (const [key, value] of Object.entries(pathParams)) {
    if (value !== undefined) {
      // Check for undefined value
      populatedPath = populatedPath.replace(`:${key}`, value);
    }
  }

  const queryString = Object.entries(params)
    .filter(([, value]) => value !== undefined) // Filter out entries with undefined values
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return value.map((v) => `${key}=${encodeURIComponent(v)}`).join('&');
      }

      return `${key}=${encodeURIComponent(value)}`;
    })
    .join('&');

  // Ensure the populatedPath doesn't end with specific patterns
  populatedPath = trimTrailingPatterns(populatedPath, ['/', '&', '?', '/?']);

  let finalUrl = `${populatedPath}${queryString ? `?${queryString}` : ''}`;
  finalUrl = trimTrailingPatterns(finalUrl, ['/', '&', '?', '/?']);

  return finalUrl;
};

// Utility to trim trailing characters and patterns
export const trimTrailingPatterns = (str, patterns = []) => {
  for (const pattern of patterns) {
    if (typeof pattern === 'string' && str.endsWith(pattern)) {
      str = str.slice(0, -pattern.length);
    } else if (pattern instanceof RegExp && pattern.test(str)) {
      str = str.replace(pattern, '');
    }
  }
  return str;
};
