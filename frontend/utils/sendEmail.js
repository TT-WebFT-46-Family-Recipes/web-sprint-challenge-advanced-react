export const sendEmail = async (body) => {
  let response = await fetch("http://localhost:9000/api/result", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  response = await response.json();
  return response.message;
};
