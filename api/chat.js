const chat = async (req, res) => {
  const { name, email, message } = req.body || req.query;

  const apiUrl =
    process.env.API_URL ||
    "https://2702-2001-4450-49b6-1b00-c8b4-6c0c-70dd-6c59.ap.ngrok.io";

  const response = await fetch(
    `${apiUrl}/v1/chat/sendMessage?name=${name}&email=${email}&message=${message}`
  );
  const json = await response.json();

  res.json(json);
};

export default chat;
