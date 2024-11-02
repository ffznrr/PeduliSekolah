const url = process.env.NEXTAUTH_URL;

export const getUser = async (token: string) => {
  try {
    const response = await fetch(`${url}/api/profile`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};
