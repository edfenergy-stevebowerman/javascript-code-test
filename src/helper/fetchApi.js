export const fetchApi = async (url, options) => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    if (options.headers['Content-Type'] === 'application/json')
      return await response.json();
    if (options.headers['Content-Type'] === 'application/xml') return response;
  } catch (error) {
    console.log('fetch API error: ', error.message);
  }
};
