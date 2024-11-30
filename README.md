## Documentation for `AnimalData` Class

### Overview
The `AnimalData` class is responsible for rendering data related to different animal categories (e.g., Dog, Cat, Fish) into a dynamic and interactive interface. This class allows fetching data from multiple sources, rendering it as a list of animals, and providing functionality for adding, editing, and deleting individual animal entries.

### Key Features
1. **Dynamic Rendering:** Data is fetched from multiple JSON files and dynamically rendered in HTML.
2. **Interactive Operations:** Users can add new animals, edit existing ones, or delete them.
3. **Responsive Design:** The rendered content is structured in a way that it can be styled and adjusted as per the layout and design.

### Class Structure

#### 1. **`getData(route)`**
   - **Purpose:** Fetches data from a specified JSON route.
   - **Parameters:**
     - `route` (string): The URL or file path of the JSON file containing the animal data.
   - **Returns:** Returns a Promise that resolves to the JSON object containing the data.
   - **Error Handling:** If the fetch request fails, it logs an error message to the console.
   
#### 2. **`render(index)`**
   - **Purpose:** Renders a section containing a list of animals based on the fetched data.
   - **Parameters:**
     - `index` (number): The index representing the animal category (used for generating section titles).
   - **Flow:**
     - A title (`h1`) is created for the section (`Table 1`, `Table 2`, etc.).
     - Each animal item is rendered in a `div` format using the `renderSingleItem` method.
     - A button is provided to add new animals to the list.
     - The rendered section is appended to a container (`#list`).

#### 3. **`renderSingleItem(container, item)`**
   - **Purpose:** Renders a single animal item as a div containing the animal's details.
   - **Parameters:**
     - `container` (HTMLElement): The parent container where the animal item will be appended.
     - `item` (object): The individual animal data (contains fields such as `name`, `size`, `location`, `image`).
   - **Flow:**
     - For each field in the animal data (`name`, `size`, `location`, and `image`), it generates a corresponding `div` element and appends it.
     - Action buttons (Edit and Delete) are added to each animal item.
     - The generated item is appended to the specified container.

#### 4. **`addPoints(title, desc)`**
   - **Purpose:** Creates a `div` containing a point (`title: description`) pair.
   - **Parameters:**
     - `title` (string): The title of the point (e.g., `name`, `size`).
     - `desc` (string): The description or value of the point (e.g., the value of the animal's name).
   - **Returns:** A `div` element that contains an `h3` with the title and a `p` with the description.

#### 5. **`addImage(src)`**
   - **Purpose:** Creates an image element and sets its source (`src`).
   - **Parameters:**
     - `src` (string): The URL or path to the image source.
   - **Returns:** An `img` element with the provided `src`, and default size attributes.

#### 6. **`createActionButtons(singleDiv, container, item)`**
   - **Purpose:** Creates and attaches action buttons (Edit, Delete) to each animal item.
   - **Parameters:**
     - `singleDiv` (HTMLElement): The individual animal item container.
     - `container` (HTMLElement): The parent container for the animal list.
     - `item` (object): The animal item data for the Edit functionality.
   - **Flow:**
     - A delete button is created to remove the animal from the list when clicked.
     - An edit button is created to replace the item with a form to modify its details.

#### 7. **`editAnimal(singleDiv, item)`**
   - **Purpose:** Replaces an existing animal item with a form for editing the animal's details.
   - **Parameters:**
     - `singleDiv` (HTMLElement): The animal item to be replaced.
     - `item` (object): The animal item data that needs to be edited.

#### 8. **`addAnimal(container)`**
   - **Purpose:** Adds a new animal to the list by creating a form for the user to input animal details.
   - **Parameters:**
     - `container` (HTMLElement): The container where the form will be appended.
   - **Flow:**
     - A form with input fields for `name`, `size`, `location`, and `image` is created.
     - A callback function is executed when the form is submitted to render the new animal in the list.

#### 9. **`createForm(item, onSubmit)`**
   - **Purpose:** Creates a form with input fields to add or edit an animal.
   - **Parameters:**
     - `item` (object): The animal item data for pre-filling the form fields (used in both adding and editing).
     - `onSubmit` (function, optional): A callback function to execute upon form submission.
   - **Flow:**
     - The form consists of input fields for `name`, `size`, `location`, and `image`.
     - Validation checks are applied to ensure that none of the fields are empty.
     - A Save button triggers the submission and updates the item with the new values.
     - A Cancel button removes the form without saving any changes.

### Example Usage

```javascript
const data = ['./JSON_DATA/dog.json', './JSON_DATA/cat.json', './JSON_DATA/fish.json'];

data.forEach(async (item, index) => {
    const dataList = await getData(item);
    const animal = new AnimalData(dataList);
    animal.render(index);
});
```

- **Explanation:**
  - The `data` array contains the paths to three JSON files (dog, cat, fish).
  - For each file, the data is fetched, parsed into JSON, and passed to an instance of the `AnimalData` class.
  - The `render` method is called to display the data in a formatted list.

### Error Handling

- **Failed Data Fetching:** If fetching data fails due to network issues or incorrect file paths, an error message is logged to the console.
- **Validation Errors:** During the creation or editing of animal items, if any of the input fields are left empty, an alert will notify the user that the field cannot be empty.

### Conclusion

The `AnimalData` class is a comprehensive solution for dynamically rendering animal data, with capabilities to add, edit, and delete animal entries. It provides a user-friendly interface and ensures data integrity through form validation.
