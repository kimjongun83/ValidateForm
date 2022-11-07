export const parseObjectToFormData = (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
    return formData;
};
export const objectToQueryString = (obj, prefix) => {
  return Object.keys(obj).map(objKey => {
      if (obj.hasOwnProperty(objKey)) {
          const key = prefix ? `${prefix}[${objKey}]` : objKey;
          const value = obj[objKey];

          return typeof value === "object" ?
              this.objectToQueryString(value, key) :
              `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
      }
      return null;
  }).join("&");
}
export const handleErrors = (response) => {
  if ([200, 201].includes(response.status)) {
    return response
  }
  if (response.status === 401) {
    location.href = '/login'
  }

  throw response
}
export const useLoading = (status) => {
  const loading = status;
  async function withLoading(callback) {
    loading = true;
    try {
      const response = await callback()
      loading = false;
      return response
    } catch (error) {
      loading = false;
      throw error
    }
  }
  return [ loading, withLoading ]
}
export default useLoading