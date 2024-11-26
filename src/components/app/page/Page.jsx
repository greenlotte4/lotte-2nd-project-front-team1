import React, { useState, useEffect } from "react";
import PageAside from "./PageAside";

export default function Page() {
    const [text, setText] = useState("");

    const handleChange = (e) => {
        setText(e.target.value);
    };

    
    useEffect(() => {
      
        // Sidebar toggle functionality
        const sidebar = document.querySelector(".sidebar");
        const toggleSidebarBtn = document.getElementById("toggle-sidebar");
        const mainContent = document.querySelector(".main-content");

        if (toggleSidebarBtn && sidebar && mainContent) {
            toggleSidebarBtn.textContent = "<<";
            toggleSidebarBtn.style.backgroundColor = "#f4f4f4";

            toggleSidebarBtn.addEventListener("click", () => {
                sidebar.classList.toggle("hidden");

                if (sidebar.classList.contains("hidden")) {
                    toggleSidebarBtn.textContent = ">>"; // closed state
                    toggleSidebarBtn.style.backgroundColor = "white";
                    toggleSidebarBtn.style.left = "10px";
                    mainContent.style.marginLeft = "0";
                } else {
                    toggleSidebarBtn.textContent = "<<"; // open state
                    toggleSidebarBtn.style.backgroundColor = "#f4f4f4";
                    toggleSidebarBtn.style.left = "130px";
                    mainContent.style.marginLeft = "-320px";
                }
            });
        }

        // Change cursor when mouse enters/leaves main content
        mainContent?.addEventListener('mouseenter', () => {
            mainContent.style.cursor = 'text';
        });

        mainContent?.addEventListener('mouseleave', () => {
            mainContent.style.cursor = 'default';
        });

        // Editable area resize on input
        const editableTitle = document.querySelector("#editable-title");
        if (editableTitle) {
            editableTitle.style.height = "60px"; // Set initial height

            editableTitle.addEventListener('input', function () {
                this.style.height = "60px"; // Reset height
                this.style.height = `${this.scrollHeight}px`; // Adjust based on content
            });
        }

        const inputField = document.querySelector('.sub-title');
        if (inputField && editableTitle) {
            inputField.addEventListener('input', function () {
                editableTitle.value = inputField.value;
                editableTitle.style.height = 'auto'; // Reset height
                editableTitle.style.height = "60px";
            });

            editableTitle.addEventListener('input', function () {
                inputField.value = editableTitle.value;
            });
        }

        // Placeholder for editable-area
        const container = document.body;
        function updatePlaceholder(currentDiv) {
            document.querySelectorAll('.editable-area').forEach((div) => {
                if (div === currentDiv) {
                    if (div.innerText.trim() === '') {
                        div.classList.add('placeholder');
                    } else {
                        div.classList.remove('placeholder');
                    }
                } else {
                    div.classList.remove('placeholder');
                }
            });
        }

        // Initial placeholder check
        document.querySelectorAll('.editable-area').forEach((div) => {
            div.classList.remove('placeholder');
        });

        container.addEventListener('focus', function (event) {
            const target = event.target;
            if (target.classList.contains('editable-area')) {
                updatePlaceholder(target);
            }
        }, true);

        container.addEventListener('blur', function (event) {
            const target = event.target;
            if (target.classList.contains('editable-area')) {
                if (target.innerText.trim() === '') {
                    target.classList.add('placeholder');
                }
            }
        }, true);

        container.addEventListener('input', function (event) {
            const target = event.target;
            if (target.classList.contains('editable-area')) {
                updatePlaceholder(target);
            }
        });

        // Create editable areas dynamically
        const mainContainer = document.getElementById('main-container');
        const editableContainer = document.getElementById('editable-container');

        mainContainer?.addEventListener('click', function (event) {
            const clickedElement = event.target;
            if (clickedElement.tagName === 'INPUT' || clickedElement.tagName === 'TEXTAREA') return;

            if (clickedElement.classList.contains('editable-area')) {
                clickedElement.focus();
                return;
            }

            const editableAreas = editableContainer.querySelectorAll('.editable-area');
            const lastEditableArea = editableAreas[editableAreas.length - 1];

            if (lastEditableArea && lastEditableArea.innerText.trim() !== '') {
                createEditableArea(editableContainer);
            } else if (!lastEditableArea) {
                createEditableArea(editableContainer);
            } else {
                lastEditableArea.focus();
            }
        });

        // Create a new editable area
        function createEditableArea(parent, nextSibling = null) {
            const newDiv = document.createElement('div');
            newDiv.classList.add('notranslate', 'editable-area');
            newDiv.setAttribute('contenteditable', 'true');
            newDiv.setAttribute('spellcheck', 'true');
            newDiv.setAttribute('data-placeholder', '글을 입력하세요');
            newDiv.setAttribute('data-content-editable-leaf', 'true');
            parent.insertBefore(newDiv, nextSibling);
            newDiv.focus();
        }

       // Handle Enter and Backspace key events for editable areas
editableContainer.addEventListener('keydown', function (event) {
    const target = event.target;

    if (target.classList.contains('editable-area') && event.key === 'Enter') {
        event.preventDefault();
        createEditableArea(target.parentNode, target.nextSibling);
    }

    if (target.classList.contains('editable-area') && event.key === 'Backspace') {
        if (target.innerText.trim() === '') {
            event.preventDefault();
            const previousDiv = target.previousElementSibling;
            target.remove();

            // After removing the div, move the focus to the previous div (if it exists)
            if (previousDiv && previousDiv.classList.contains('editable-area')) {
                previousDiv.focus();
                // Move the cursor to the end of the previous div
                const range = document.createRange();
                const selection = window.getSelection();
                range.selectNodeContents(previousDiv);
                range.collapse(false); // Collapse to the end of the div
                selection.removeAllRanges();
                selection.addRange(range);
            } else {
                // If there is no previous div, focus on the container itself
                editableContainer.focus();
            }
        }
    }
});
        // Skeleton loader display
        const skeleton = document.getElementById("loading-skeleton");
        const mainPage = document.querySelector(".main-page");

        if (skeleton && mainPage) {
            skeleton.style.display = "flex";
            mainPage.style.display = "none";

            setTimeout(() => {
                skeleton.style.display = "none";
                mainPage.style.display = "block";
            }, 2000); // 2-second delay to simulate loading
        }
    }, []);

    return (
        <div id="container">
            <PageAside />
            <main className="main-content" id="main-container">
                <div id="loading-skeleton" className="skeleton">
                    <div className="skeleton-title"></div>
                    <div className="skeleton-text"></div>
                    <div className="skeleton-box"></div>
                </div>
                <input type="text" value={text} className="sub-title" onChange={handleChange} placeholder="새 페이지" />
                <div className="main-page">
                    <textarea id="editable-title" className="editable" placeholder="새 페이지"></textarea>
                    <div
                        id="editable-container"
                        style={{ width: 'auto', maxWidth: '700px', height: 'auto' }}
                    >
                    </div>
                </div>
            </main>
        </div>
    );
}
