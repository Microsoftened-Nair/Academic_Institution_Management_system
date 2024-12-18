document.addEventListener('DOMContentLoaded', () => {
    const orgChart = document.getElementById('org-chart');
    const addStaffForm = document.getElementById('add-staff-form');
    const staffParentSelect = document.getElementById('staff-parent');
    let staffData;

    function loadStaffHierarchy() {
        fetch('./data/hierarchy.json')
            .then(response => response.json())
            .then(data => {
                staffData = data.institution;
                displayStaffHierarchy(staffData);
                populateParentDropdown(staffData);
            })
            .catch(error => console.error('Error fetching hierarchy data:', error));
    }

    function displayStaffHierarchy(node) {
        orgChart.innerHTML = '';
        orgChart.appendChild(createHierarchyElement(node));
    }

    function createHierarchyElement(node) {
        const li = document.createElement('li');
        const div = document.createElement('div');
        div.className = 'staff-card';
        div.setAttribute('data-role', node.position);

        // const img = document.createElement('img');
        // img.src = `https://source.unsplash.com/100x100/?portrait,${node.position.toLowerCase().replace(/\s+/g, '')}`;
        // img.alt = node.name;

        const name = document.createElement('h3');
        name.textContent = node.name;

        const position = document.createElement('p');
        position.textContent = node.position;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.onclick = () => removeStaff(node.name);

        // div.appendChild(img);
        div.appendChild(name);
        div.appendChild(position);
        div.appendChild(removeButton);

        li.appendChild(div);

        if (node.children && node.children.length > 0) {
            const ul = document.createElement('ul');
            node.children.forEach(child => {
                ul.appendChild(createHierarchyElement(child));
            });
            li.appendChild(ul);
        }

        return li;
    }

    function populateParentDropdown(node, prefix = '') {
        const option = document.createElement('option');
        option.value = node.name;
        option.textContent = prefix + node.name + ' (' + node.position + ')';
        staffParentSelect.appendChild(option);

        if (node.children) {
            node.children.forEach(child => {
                populateParentDropdown(child, prefix + '-- ');
            });
        }
    }

    function addStaff(name, position, parentName) {
        const newStaff = { name, position, children: [] };
        
        if (!parentName) {
            staffData.children.push(newStaff);
        } else {
            const addToParent = (node) => {
                if (node.name === parentName) {
                    if (!node.children) node.children = [];
                    node.children.push(newStaff);
                    return true;
                }
                if (node.children) {
                    for (let child of node.children) {
                        if (addToParent(child)) return true;
                    }
                }
                return false;
            };

            if (!addToParent(staffData)) {
                alert('Parent not found. Adding to top level.');
                staffData.children.push(newStaff);
            }
        }

        displayStaffHierarchy(staffData);
        resetParentDropdown();
        populateParentDropdown(staffData);
    }

    function removeStaff(name) {
        const remove = (node) => {
            if (node.children) {
                const index = node.children.findIndex(child => child.name === name);
                if (index !== -1) {
                    node.children.splice(index, 1);
                    return true;
                }
                for (let child of node.children) {
                    if (remove(child)) return true;
                }
            }
            return false;
        };

        if (remove(staffData)) {
            displayStaffHierarchy(staffData);
            resetParentDropdown();
            populateParentDropdown(staffData);
        } else {
            alert('Staff member not found.');
        }
    }

    function resetParentDropdown() {
        staffParentSelect.innerHTML = '<option value="">No Parent (Top Level)</option>';
    }

    addStaffForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('staff-name').value;
        const position = document.getElementById('staff-position').value;
        const parentName = staffParentSelect.value;
        addStaff(name, position, parentName);
        addStaffForm.reset();
        staffParentSelect.value = '';
    });

    loadStaffHierarchy();
});

