async function login(event) {
    event.preventDefault(); // Prevent the form from submitting the default way

    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    try {
        const response = await fetch('https://130.162.195.228/mhs714220025/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        if (data.token) {
            // Save the token in local storage or session storage
            localStorage.setItem('token', data.token);

            // Redirect to the dashboard page
            window.location.href = 'dashboard.html';
        } else {
            alert('Login failed: ' + data.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Login failed: ' + error.message);
    }
}

async function fetchClothingData() {
    try {
        const response = await fetch('https://130.162.195.228/mhs714220025/pakaian'); // URL API yang sesuai dengan openapi.yaml
        if (!response.ok) {
            throw new Error('Jaringan bermasalah');
        }
        const data = await response.json();
        const tableBody = document.querySelector('#clothingTable tbody');
        data.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.id}</td>
                <td>${item.namapakaian}</td>
                <td>${item.hargapakaian}</td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Terjadi masalah dengan pengambilan data:', error);
    }
}

// Panggil fungsi untuk mengambil dan menampilkan data pakaian saat halaman dimuat
document.addEventListener('DOMContentLoaded', fetchClothingData);
