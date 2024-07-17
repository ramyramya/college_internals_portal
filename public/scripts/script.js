// script.js

document.addEventListener('DOMContentLoaded', function() {
    // Function to hide all login modals
    function hideAllModals() {
        document.querySelectorAll('.login-modal').forEach(function(modal) {
            modal.style.display = 'none';
        });
    }

    // Open admin login modal when admin button is clicked
    document.getElementById('adminBtn').addEventListener('click', function() {
        hideAllModals(); // Hide all modals first
        document.getElementById('adminModal').style.display = 'block';
    });

    // Open HOD login modal when HOD button is clicked
    document.getElementById('hodBtn').addEventListener('click', function() {
        hideAllModals(); // Hide all modals first
        document.getElementById('hodModal').style.display = 'block';
    });

    // Open faculty login modal when faculty button is clicked
    document.getElementById('facultyBtn').addEventListener('click', function() {
        hideAllModals(); // Hide all modals first
        document.getElementById('facultyModal').style.display = 'block';
    });

    // Close login modal when close button is clicked
    document.querySelectorAll('.close').forEach(function(closeBtn) {
        closeBtn.addEventListener('click', function() {
            this.closest('.login-modal').style.display = 'none';
        });
    });
});
