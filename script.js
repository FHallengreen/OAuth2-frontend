const backendUrl = "http://localhost:8080";

async function checkAuthenticationStatus() {
    try {
        const response = await fetch(`${backendUrl}/auth-status`, { credentials: 'include' });

        if (response.status === 200) {
            const jsonResponse = await response.json(); // Parse the JSON response
            console.log('Authentication status response JSON:', jsonResponse); // Log the JSON response

            if (jsonResponse.isAuthenticated) {
                document.getElementById("logout").style.display = "block";
            } else {
                document.getElementById("logout").style.display = "none";
            }
        } else {
            console.error('Error checking authentication status. Unexpected response status:', response.status);
        }
    } catch (error) {
        console.error('Error checking authentication status:', error);
    }
}

// Call the checkAuthenticationStatus function when the page loads
checkAuthenticationStatus();

/* 
async function isAuthenticated() {
    const response = await fetch(`${backendUrl}/auth-status`, { credentials: 'include' });
    const data = await response.json();
    return data.isAuthenticated;
  }


if (await isAuthenticated()) {
    // User is authenticated, allow access to protected resources
  } else {
    // User is not authenticated, redirect to login page
    window.location.href = `${backendUrl}/login`;
  }
 */



// Add this event listener to the end of your script.js file
document.getElementById("logout").addEventListener("click", async function () {
    try {
        const response = await fetch(`${backendUrl}/logout`, { method: 'POST', credentials: 'include' });
         console.log('Logout response:', response); // Log the response
        if (response.status === 200 || response.status === 204) {
            checkAuthenticationStatus();
        }
    } catch (error) {
        console.error('Error during logout:', error);
    }
});


function openLoginPopup(provider) {
    const popup = window.open(
        `${backendUrl}/oauth2/authorization/${provider}`,
        "Login",
        "width=600,height=600"
    );

    const timer = setInterval(() => {
        if (popup.closed) {
            clearInterval(timer);
            checkAuthenticationStatus();
        }
    }, 1000);
}

document.getElementById("github").addEventListener("click", function () {
    openLoginPopup("github");
});

document.getElementById("google").addEventListener("click", function () {
    openLoginPopup("google");
});

document.getElementById("microsoft").addEventListener("click", function () {
    openLoginPopup("azure");
});
