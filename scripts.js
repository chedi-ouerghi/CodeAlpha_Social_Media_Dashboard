        document.addEventListener("DOMContentLoaded", function () {
            const sidebar = document.getElementById("sidebar");

            function openSidebar() {
                sidebar.classList.add("sidebar-responsive");
            }

            function closeSidebar() {
                sidebar.classList.remove("sidebar-responsive");
            }

            document.querySelector(".menu-icon").addEventListener("click", openSidebar);
            document.querySelector(".sidebar-title .material-symbols-outlined").addEventListener("click", closeSidebar);

            window.openSidebar = openSidebar;
            window.closeSidebar = closeSidebar;

            const loggedInUser = localStorage.getItem('username');
            if (loggedInUser) {
                document.getElementById('login-form').style.display = 'none';
                document.getElementById('feed-container').style.display = 'block';
                document.getElementById('username-display').innerText = loggedInUser;
                document.getElementById('welcome-message').innerText = `Welcome, ${loggedInUser}!`;
            }
        });

      function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (username === 'chedi' && password === 'chedi123') {
        localStorage.setItem('username', username);
        
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('feed-container').style.display = 'block';
        
        document.getElementById('username-display').innerText = username;
        document.getElementById('welcome-message').innerText = `Welcome, ${username}!`;
        
        document.getElementById('error-message').style.display = 'none';
    } else {
        document.getElementById('error-message').style.display = 'block';
    }
}
