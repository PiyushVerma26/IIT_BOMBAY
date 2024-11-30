const data = ['./JSON_DATA/dog.json', './JSON_DATA/cat.json', './JSON_DATA/fish.json'];

async function getData(route) {
    try {
        const result = await fetch(route);
        if (!result.ok) {
            throw new Error(`Failed to fetch: ${result.statusText}`);
        }
        return await result.json();
    } catch (error) {
        console.error('Error:', error);
    }
}

data.forEach(async (item, index) => {
    const dataList = await getData(item);
    const animal = new AnimalData(dataList);
    animal.render(index);
});

class AnimalData {
    constructor(list = []) {
        this.data = list;
    }

    render(index) {
        const listContainer = document.querySelector('#list');
        const section = document.createElement('div');
        section.classList.add('list_section');
        const h1 = document.createElement('h1');
        const textNode = document.createTextNode(`Table ${index + 1}: ${this.data.title}`);
        h1.appendChild(textNode);
        section.appendChild(h1);

        const div = document.createElement('div');
        div.classList.add('each_section');

        this.data.list.forEach((item) => this.renderSingleItem(div, item));

        const addBtn = document.createElement('button');
        addBtn.textContent = `Add ${this.data.title}`;
        addBtn.classList.add('btn', 'add-btn');
        addBtn.addEventListener('click', () => this.addAnimal(div));

        section.appendChild(addBtn);
        section.appendChild(div);
        listContainer.appendChild(section);
    }

    renderSingleItem(container, item) {
        const singleDiv = document.createElement('div');
        singleDiv.classList.add('box');

        for (let key in item) {
            if (key !== 'image') {
                const pointData = this.addPoints(key, item[key]);
                singleDiv.appendChild(pointData);
            } else if (key === 'image') {
                const image = this.addImage(item[key]);
                singleDiv.appendChild(image);
            }
        }

        const divBtn = this.createActionButtons(singleDiv, container, item);
        singleDiv.appendChild(divBtn);

        container.appendChild(singleDiv);
    }

    addPoints(title, desc) {
        const div = document.createElement('div');
        div.classList.add('point');

        const h3 = document.createElement('h3');
        const p = document.createElement('p');

        h3.textContent = `${title}: `;
        p.textContent = desc;

        div.appendChild(h3);
        div.appendChild(p);
        return div;
    }

    addImage(src) {
        const img = document.createElement('img');
        img.classList.add('images');
        img.setAttribute('src', src);
        img.setAttribute('alt', 'Placeholder Image');
        img.setAttribute('width', '150');
        img.setAttribute('height', '150');

        return img;
    }

    createActionButtons(singleDiv, container, item) {
        const divBtn = document.createElement('div');
        divBtn.classList.add('divBtn');

        const btnDel = document.createElement('button');
        btnDel.textContent = 'Delete';
        btnDel.classList.add('btn');
        btnDel.addEventListener('click', (event) => {
            event.stopPropagation();
            container.removeChild(singleDiv);
        });

        // Edit Button
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.classList.add('btn');
        editBtn.addEventListener('click', (event) => {
            event.stopPropagation();
            this.editAnimal(singleDiv, item);
        });

        divBtn.appendChild(btnDel);
        divBtn.appendChild(editBtn);

        return divBtn;
    }

    editAnimal(singleDiv, item) {
        const form = this.createForm(item, (updatedItem) => {
            this.updateItem(singleDiv, updatedItem); 
        });
        singleDiv.replaceWith(form);  
    }

    updateItem(singleDiv, updatedItem) {
        const container = singleDiv.parentNode;
        this.renderSingleItem(container, updatedItem);
    }

    addAnimal(container) {
        const newAnimal = { name: '', size: '', location: '', image: 'placeholder.jpg' };

        const form = this.createForm(newAnimal, (newItem) => {
            this.renderSingleItem(container, newItem);  
            form.remove();   
        });

        container.appendChild(form);   
    }

    createForm(item, onSubmit = null) {
        const form = document.createElement('div');
        form.classList.add('box', 'form-box');

        const fields = ['name', 'size', 'location', 'image'];
        fields.forEach((field) => {
            const inputDiv = document.createElement('div');
            inputDiv.classList.add('form-field');

            const label = document.createElement('label');
            label.textContent = `${field}: `;

            const input = document.createElement('input');
            input.setAttribute('type', field === 'size' ? 'number' : 'text');
            input.setAttribute('name', field);
            input.setAttribute('value', item[field] || '');
            inputDiv.appendChild(label);
            inputDiv.appendChild(input);

            form.appendChild(inputDiv);
        });

        const saveBtn = document.createElement('button');
        saveBtn.textContent = 'Save';
        saveBtn.classList.add('btn');
        saveBtn.addEventListener('click', (event) => {
            event.preventDefault();

            let isValid = true;
            fields.forEach((field) => {
                const input = form.querySelector(`[name="${field}"]`);
                const value = input.value.trim();

                if (!value) {
                    isValid = false;
                    alert(`The field "${field}" cannot be empty.`);
                } else {
                    item[field] = value;  
                }
            });

            if (isValid) {
                if (onSubmit) onSubmit(item);  
            }
        });

        // Cancel Button
        const cancelBtn = document.createElement('button');
        cancelBtn.textContent = 'Cancel';
        cancelBtn.classList.add('btn');
        cancelBtn.addEventListener('click', (event) => {
            event.preventDefault();
            form.remove();  
        });

        form.appendChild(saveBtn);
        form.appendChild(cancelBtn);

        return form;
    }
}
