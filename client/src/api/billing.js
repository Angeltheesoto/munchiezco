import axios from "axios";
var server_url = process.env.REACT_APP_SERVER_URL;

export const createCheckout = async (userCredentials) => {
  let res = await axios.post(
    `${server_url}billing/create-checkout-session`,
    userCredentials
  );

  if (res) {
    console.log("response", res);
    const { url, sessionId } = res.data;
    return { url, sessionId };
  } else {
    return `Could not create checkout session: ${res}`;
  }
};

export const sessionDataCall = async (userCredentials) => {
  try {
    const res = await axios.get(
      `${server_url}billing/session/status/${userCredentials.sessionId}`
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching session data:", error);
  }
};

export const updateMongoDBCall = async (userCredentials) => {
  try {
    const res = await axios.post(
      `${server_url}billing/session/update/${userCredentials.sessionId}`,
      userCredentials
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching session data:", error);
  }
};
