// Function to fetch and parse the JSON configuration file
async function fetchAppSettings() {
    try {
        const response = await fetch("/appsettings.json");
        if (!response.ok) {
            alert(
                "Error fetching app settings. Please check the console for more details."
            );

            throw new Error("Failed to fetch app settings");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        alert(
            "Error fetching app settings. Please check the console for more details."
        );
        console.error("Error fetching app settings:", error);
        return null;
    }
}

export { fetchAppSettings };
