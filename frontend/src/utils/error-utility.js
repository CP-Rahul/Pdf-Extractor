export function errorHandler(error) {
    alert("Error: "+error.response.data.error.explanation + ",StatusCode: "+error.response.data.error.statusCode);
}