const API_URL =
    "http://localhost:8081/api/meetings";


export const analyzeMeeting = async (
    meetingTitle,
    meetingText
) => {

    const token =
        localStorage.getItem("jwtToken");

    const response =
        await fetch(
            `${API_URL}/analyze`,
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json",

                    "Authorization":
                        `Bearer ${token}`
                },

                body: JSON.stringify({
                    title: meetingTitle,
                    notes: meetingText
                })
            }
        );

    if (!response.ok) {

        throw new Error(
            `Meeting analysis failed: ${response.status}`
        );
    }

    return await response.json();
};