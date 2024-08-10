document.addEventListener('DOMContentLoaded', () => {
    const fileInputs = document.querySelectorAll('.form-input-file');
    
    fileInputs.forEach(input => {
        const fileListDisplay = input.closest('td').querySelector('.file-name-display');

        input.addEventListener('change', () => {
            // Initialize an empty list for the new files
            const fileLists = [];

            // Collect new files
            Array.from(input.files).forEach(file => {
                fileLists.push(file);
            });

            // Update the display with the new files
            updateFileListDisplay(fileListDisplay, fileLists);
            input.value = ''; // Reset input value to allow re-selecting the same file
        });
    });

    function updateFileListDisplay(fileListDisplay, fileLists) {
        fileListDisplay.innerHTML = ''; // Clear the existing file list

        fileLists.forEach((file, index) => {
            const fileItem = document.createElement('div');
            fileItem.className = 'file-name-item';

            const fileNameText = document.createElement('span');
            fileNameText.className = 'file-name-text';
            fileNameText.textContent = file.name;

            const removeButton = document.createElement('button');
            removeButton.className = 'file-remove-btn';
            removeButton.innerHTML = `
                <span class="icon closeIcon">
                    <i class="fa-solid fa-xmark"></i>    
                </span>
            `;
            removeButton.addEventListener('click', () => {
                fileLists.splice(index, 1);
                updateFileListDisplay(fileListDisplay, fileLists);
            });

            fileItem.appendChild(fileNameText);
            fileItem.appendChild(removeButton);
            fileListDisplay.appendChild(fileItem);
        });
    }
});    